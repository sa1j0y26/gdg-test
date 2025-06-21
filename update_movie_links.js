require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const cheerio = require('cheerio');

const prisma = new PrismaClient();

// ページのURLから動画の直リンクを取得する関数
async function getDirectVideoUrl(pageUrl) {
  try {
    // URLの二重スラッシュなどを正規化
    const normalizedUrl = pageUrl.replace(/([^:])\/\//g, '$1/');
    const response = await axios.get(normalizedUrl, { timeout: 15000 });
    const $ = cheerio.load(response.data);

    const sourceSrc = $('source[type="video/mp4"]').attr('src');
    if (!sourceSrc) {
      console.warn(`- 動画ソースが見つかりません: ${normalizedUrl}`);
      return null;
    }

    // 相対URLを絶対URLに変換
    const directUrl = new URL(sourceSrc, normalizedUrl);
    return directUrl.href;
  } catch (error) {
    console.error(`- URL取得エラー: ${pageUrl} - ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('signsテーブルの全movie_linkを直リンクに更新します...');
  const allSigns = await prisma.signs.findMany({
    select: { id: true, name: true, movie_link: true },
  });
  console.log(`対象件数: ${allSigns.length}件`);

  const updates = [];
  let failedCount = 0;
  let skippedCount = 0;

  console.log('\n--- ステップ1: 全ての動画直リンクを取得中 ---');
  for (const [index, sign] of allSigns.entries()) {
    process.stdout.write(`> ${index + 1}/${allSigns.length}件目 (ID:${sign.id}) ... `);

    if (!sign.movie_link || sign.movie_link.endsWith('.mp4')) {
      process.stdout.write('スキップ (更新不要)\n');
      skippedCount++;
      continue;
    }

    const directUrl = await getDirectVideoUrl(sign.movie_link);

    if (directUrl) {
      updates.push({
        where: { id: sign.id },
        data: { movie_link: directUrl },
      });
      process.stdout.write('取得成功\n');
    } else {
      process.stdout.write('取得失敗\n');
      failedCount++;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n--- ステップ2: データベースを一括更新中 ---`);
  if (updates.length > 0) {
    const BATCH_SIZE = 50;
    const updatePromises = updates.map(update => prisma.signs.update(update));

    for (let i = 0; i < updatePromises.length; i += BATCH_SIZE) {
      const batch = updatePromises.slice(i, i + BATCH_SIZE);
      console.log(`> ${i + 1}〜${i + batch.length}件目を更新中...`);
      await prisma.$transaction(batch);
      console.log(`  => 完了`);
    }
  } else {
    console.log('> 更新対象のデータはありませんでした。');
  }

  console.log('\n--- 最終結果 ---');
  console.log(`✔️ 正常に更新: ${updates.length}件`);
  console.log(`❌ 取得失敗: ${failedCount}件`);
  console.log(`- スキップ: ${skippedCount}件`);
  console.log('----------------');
}

main()
  .catch((e) => {
    console.error('\n❌ スクリプトの実行中に致命的なエラーが発生しました。');

    // Prismaのエラーコードやメッセージ内容に応じて、分かりやすい原因と解決策を表示
    if (e.code === 'P1001' || (e.message && e.message.includes("Can't reach database server"))) {
      console.error('   原因: データベースに接続できませんでした。');
      console.error('\n   考えられる解決策:');
      console.error('     1. `.env` ファイルの `DATABASE_URL` が正しいか確認してください。');
      console.error('        (Supabaseの場合、コネクションプーラー用ではなく、直接接続用のURLが必要です)');
      console.error('     2. URLの末尾に `?sslmode=require` が付いているか確認してください。');
      console.error('     3. 短時間でのアクセス過多により、ご利用のIPアドレスが一時的にブロックされている可能性があります。数分〜1時間ほど待ってから再試行してください。');

    } else if (e.message && e.message.includes("Server has closed the connection")) {
      console.error('   原因: データベースサーバーから接続が切断されました。');
      console.error('\n   考えられる解決策:');
      console.error('     - 長時間、一件ずつの更新を繰り返したため、サーバー側でタイムアウトした可能性があります。');
      console.error('     - スクリプトを「バッチ処理（一度にまとめて更新する方式）」に変更すると解決することがあります。');

    } else {
      console.error('\n   詳細なエラー情報:');
      console.error(e);
    }
    
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
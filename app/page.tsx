"use client";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/sign/${encodeURIComponent(name)}`);
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Not found");
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto", padding: 20 }}>
      <h1>手話動画検索</h1>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="単語を入力"
        style={{ width: "70%", marginRight: 8 }}
      />
      <button onClick={handleSearch} disabled={loading || !name}>
        {loading ? "検索中..." : "検索"}
      </button>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 32 }}>
          <h2>{result.name}</h2>
          <p>動画リンク: <a href={result.movie_link} target="_blank" rel="noopener noreferrer">{result.movie_link}</a></p>
          <iframe
            src={result.movie_link}
            width="480"
            height="320"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="sign movie"
            style={{ border: 0, marginTop: 16 }}
          />
        </div>
      )}
    </main>
  );
}

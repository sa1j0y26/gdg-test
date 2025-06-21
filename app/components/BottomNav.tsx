"use client";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { BookOpen, Languages, Camera, History, Star } from "lucide-react";
import styles from "./BottomNav.module.css";

const navItems = [
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/translate", label: "Translate", icon: Languages },
  { href: "/camera", label: "Camera", icon: Camera, isCentral: true },
  { href: "/history", label: "History", icon: History },
  { href: "/favorites", label: "Favorites", icon: Star },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        if (item.isCentral) {
          return (
            <Link key={item.href} href={item.href} passHref>
              <button className={styles.navBtn} aria-label={item.label}>
                <div className={styles.navIconCamera}>
                  <Icon size={24} />
                </div>
              </button>
            </Link>
          );
        }

        return (
          <Link key={item.href} href={item.href} passHref>
            <button className={styles.navBtn} aria-label={item.label}>
              {isActive ? (
                <div className={styles.navIconActive}>
                  <Icon size={22} />
                </div>
              ) : (
                <Icon size={24} />
              )}
            </button>
          </Link>
        );
      })}
    </nav>
  );
} 
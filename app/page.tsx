import { ThemeChanger } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ color: "var(--primary)" }}>Bot Kiralama</h1>
        <p style={{ color: "var(--secondary)" }}>
          Hayalinizdeki deniz keyfi için en iyi botları keşfedin.
        </p>
        <button
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--foreground)",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "6px",
            marginTop: "1rem",
          }}
        >
          Şimdi Kirala
        </button>
      </div>
    </div>
  );
}

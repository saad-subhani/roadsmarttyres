import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background: "#0a0a0b",
      color: "#fff",
      textAlign: "center",
      padding: "24px",
      fontFamily: "var(--font-inter), Inter, sans-serif",
    }}>
      <div>
        <p style={{ color: "#ff1a1a", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "12px" }}>
          404 Error
        </p>
        <h1 style={{ fontSize: "clamp(2.2rem, 8vw, 4rem)", marginBottom: "12px" }}>
          Page Not Found
        </h1>
        <p style={{ maxWidth: "520px", margin: "0 auto 20px", color: "#dcdcdc", lineHeight: 1.7 }}>
          The page you are looking for doesn’t exist or may have been moved.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ff1a1a",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "6px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}

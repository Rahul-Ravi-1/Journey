export default function Panel({ title, right, children, className = "" }) {
    return (
      <section
        role="region"
        aria-label={title}
        className={`panel ${className}`}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 16,
          padding: 16,
        }}
      >
        <div
          className="panel-header"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 12,
              letterSpacing: 0.5,
            }}
          >
            {title}
          </h2>
          <div>{right}</div>
        </div>
        <div className="panel-body">{children}</div>
      </section>
    );
  }
  
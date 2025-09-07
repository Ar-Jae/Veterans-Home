import React, { useState } from "react";

export default function Tabs({ tabs, children }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              background: active === i ? "#2563eb" : "#f4f7fb",
              color: active === i ? "#fff" : "#2563eb",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{children[active]}</div>
    </div>
  );
}

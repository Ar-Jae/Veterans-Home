import React, { useState } from "react";

export default function HoverCard({ trigger, children }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {trigger}
      {show && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 10,
          background: "#fff",
          boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          borderRadius: 8,
          padding: 12,
          minWidth: 180,
          marginTop: 8
        }}>
          {children}
        </div>
      )}
    </span>
  );
}

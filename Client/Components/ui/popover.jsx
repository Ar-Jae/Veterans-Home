import React, { useState, useRef } from "react";

export default function Popover({ trigger, children }) {
  const [show, setShow] = useState(false);
  const ref = useRef();
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        ref={ref}
        onClick={() => setShow((v) => !v)}
        style={{ cursor: "pointer" }}
      >
        {trigger}
      </span>
      {show && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          zIndex: 20,
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

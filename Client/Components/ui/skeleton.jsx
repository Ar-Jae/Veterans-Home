import React from "react";

export default function Skeleton({ className = "", style = {}, ...props }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ minHeight: 16, ...style }}
      {...props}
    />
  );
}

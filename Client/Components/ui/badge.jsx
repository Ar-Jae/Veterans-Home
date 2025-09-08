import React from "react";

export default function Badge({ children, className = "", ...props }) {
  return (
    <span
      className={"inline-block px-2 py-1 rounded-full bg-gray-200 text-gray-800 text-xs font-semibold " + className}
      {...props}
    >
      {children}
    </span>
  );
}

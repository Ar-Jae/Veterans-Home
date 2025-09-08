import React from "react";

export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={"px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow " + className}
      {...props}
    >
      {children}
    </button>
  );
}

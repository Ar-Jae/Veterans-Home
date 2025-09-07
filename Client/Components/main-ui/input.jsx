import React from "react";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={"px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 " + className}
      {...props}
    />
  );
}

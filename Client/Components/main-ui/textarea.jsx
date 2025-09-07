import React from "react";

export default function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={"px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 " + className}
      {...props}
    />
  );
}

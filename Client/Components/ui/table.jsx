import React from "react";

export function Table({ children, className = "" }) {
  return <table className={`min-w-full border border-slate-200 rounded-lg ${className}`}>{children}</table>;
}

export function TableHeader({ children, className = "" }) {
  return <thead className={`bg-slate-50 ${className}`}>{children}</thead>;
}

export function TableBody({ children, className = "" }) {
  return <tbody className={className}>{children}</tbody>;
}

export function TableRow({ children, className = "" }) {
  return <tr className={`border-b border-slate-200 ${className}`}>{children}</tr>;
}

export function TableHead({ children, className = "" }) {
  return <th className={`px-4 py-2 text-left font-semibold text-slate-700 ${className}`}>{children}</th>;
}

export function TableCell({ children, className = "" }) {
  return <td className={`px-4 py-2 ${className}`}>{children}</td>;
}

export default Table;

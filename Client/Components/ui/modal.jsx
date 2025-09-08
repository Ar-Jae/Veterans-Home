import React from 'react';

export default function Modal({ open, onClose, title, children, size = 'md', footer }) {
  if (!open) return null;

  const sizeClass = size === 'lg' ? 'max-w-4xl' : size === 'sm' ? 'max-w-md' : 'max-w-2xl';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className={`bg-white rounded-lg shadow-lg ${sizeClass} max-h-[90vh] overflow-y-auto p-6 z-10`} role="dialog" aria-modal="true">
        {title && <div className="text-xl font-semibold mb-4">{title}</div>}
        <div>
          {children}
        </div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}

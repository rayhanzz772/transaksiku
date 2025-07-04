// src/components/ErrorBoundary.jsx
import React from 'react';

export default function ErrorBoundary({ error }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-100">
      <h1 className="text-3xl font-bold mb-4">Terjadi Kesalahan!</h1>
      <p className="mb-4">{error?.message || 'Unknown error'}</p>
      <a href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Kembali ke Beranda
      </a>
    </div>
  );
}

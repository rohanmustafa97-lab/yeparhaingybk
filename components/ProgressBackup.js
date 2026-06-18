'use client';

import { useRef, useState } from 'react';
import { getDefaultState, loadProgress } from '@/lib/storage';

function isValidProgress(data) {
  return data && typeof data === 'object' && Array.isArray(data.completedLessons);
}

export default function ProgressBackup({ onImport }) {
  const fileRef = useRef(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleExport = () => {
    const data = loadProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'oop-progress.json';
    link.click();
    URL.revokeObjectURL(url);
    setMessage('Progress exported successfully.');
    setError('');
  };

  const handleImport = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!isValidProgress(parsed)) {
          throw new Error('Invalid progress file format');
        }
        const merged = { ...getDefaultState(), ...parsed };
        onImport(merged);
        setMessage('Progress imported successfully.');
        setError('');
      } catch {
        setError('Could not import file. Please use a valid oop-progress.json export.');
        setMessage('');
      } finally {
        if (fileRef.current) fileRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="mb-2 text-lg font-semibold text-foreground">Backup Progress</h3>
      <p className="mb-4 text-sm text-muted">
        Export your XP, lessons, and achievements to a JSON file, or import a previous backup.
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={handleExport} className="btn-primary text-sm">
          Export JSON
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="btn-secondary text-sm"
        >
          Import JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={handleImport}
          aria-label="Import progress JSON file"
        />
      </div>
      {message && <p className="mt-3 text-sm text-green-400" role="status">{message}</p>}
      {error && <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>}
    </div>
  );
}

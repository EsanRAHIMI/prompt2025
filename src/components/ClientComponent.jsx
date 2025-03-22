// src/components/ClientComponent.jsx
'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with ssr disabled for components with client-side functionality
const SpaceTravelApp = dynamic(
  () => import('./SpaceTravelApp'),
  { ssr: false }
);

export default function ClientComponent() {
  return <SpaceTravelApp />;
}
'use client';

import { Suspense } from 'react';
import RegistrationForm from './RegistrationForm';

// Componente wrapper para adicionar Suspense boundary ao RegistrationForm
export default function RegistrationFormWrapper() {
  return (
    <Suspense fallback={
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-14 bg-gray-200 rounded"></div>
        </div>
      </div>
    }>
      <RegistrationForm />
    </Suspense>
  );
}


import React from 'react';
import ProgressCircle from '@/components/ProgressCircle';

export default function PositionCard({ title, description, status }) {
  return (
    <div className="bg-white rounded-lg shadow-custom p-4 flex justify-between items-center">
      <div>
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex flex-row space-x-6">
        {status === 'rejected' ? (
          <p className="text-red-500 font-semibold">No fue seleccionado</p>
        ) : (
          <ProgressCircle status={status} />
        )}
      </div>
    </div>
  );
}

// src/components/ProgressBar.tsx

import React from "react";

interface ProgressBarProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  max: number;
  valueText?: string;
  percent?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  icon,
  label,
  value,
  max,
  valueText,
  percent = false,
}) => {
  const percentage = Math.min(100, Math.round((value / max) * 100));

  return (
    <div>
      <p className="flex items-center gap-2 text-sm font-semibold text-black">
        {icon} {label}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1 mt-1">
        <div
          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-blue-700">
        {valueText ?? (percent ? `${percentage}%` : `${value}/${max}`)}
      </p>
    </div>
  );
};

export default ProgressBar;

// src/components/ProgressCircle.js
import React from 'react';

const ProgressCircle = ({ status }) => {
  const getCircleClipPath = (status) => {
    switch (status) {
      case "subió su CV":
        return "polygon(50% 0%, 50% 50%, 100% 50%, 100% 0%)"; // 25% complete
      case "postuló":
        return "polygon(50% 0%, 50% 50%, 100% 50%, 100% 100%, 0% 100%, 0% 50%)"; // 50% complete
      case "pasó":
        return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"; // 100% complete
      default:
        return "none";
    }
  };

  const getCircleBorderColor = (status) => {
    switch (status) {
      case "subió su CV":
        return "border-gray-400";
      case "postuló":
        return "border-blue-500";
      case "pasó":
        return "border-green-500";
      default:
        return "border-gray-200";
    }
  };

  return (
    <div className="relative w-10 h-10">
      <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
      <div
        className={`absolute top-0 left-0 w-full h-full rounded-full border-4 ${getCircleBorderColor(status)}`}
        style={{ clipPath: getCircleClipPath(status) }}
      ></div>
    </div>
  );
};

export default ProgressCircle;

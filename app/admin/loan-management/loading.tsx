import React from "react";

function loading() {
  return (
    <div className="flex items-center space-x-2">
      <svg className="animate-spin h-5 w-5 text-green-500" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
        />
      </svg>
      <span>Loading...</span>
    </div>
  );
}

export default loading;

// src/components/DetectionResult.js
import React from "react";

const DetectionResult = ({ result, isLoading }) => {
  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!result) {
    return (
      <div className="text-center text-gray-500">
        No result yet. Please submit a message or URL.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700">Detection Result</h3>
      <p className="mt-2 text-lg">
        <strong>Status:</strong> {result.status}
      </p>
      <p className="mt-2">
        <strong>Justification:</strong> {result.justification}
      </p>
    </div>
  );
};

export default DetectionResult;

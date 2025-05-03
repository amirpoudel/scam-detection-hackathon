"use client";
import dynamic from "next/dynamic";
import React from "react";
const Speech = dynamic(() => import("react-speech"), { ssr: false });

const VoiceFeedback = ({ result }) => {
  if (!result) return null;

  const text = `Scam Status: ${result.status}. Justification: ${result.justification}`;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-4">
      <h4 className="text-xl font-semibold text-gray-700">
        Listen to the Feedback
      </h4>
      <Speech text={text} voice="Google UK English Male" rate="1" />
    </div>
  );
};

export default VoiceFeedback;

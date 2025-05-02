"use client";
import React, { useState } from "react";
// import { sendMessageRequest } from "../services/api";

const InputForm = ({ setDetectionResult, setLoading }) => {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("en"); // Default to English

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const response = await sendMessageRequest(input, language);
    // setDetectionResult(response);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
        Check for Scam
      </h2>
      <textarea
        placeholder="Enter message or paste URL here..."
        value={input}
        onChange={handleInputChange}
        rows="4"
        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 placeholder:text-black text-black"
      />
      <div className="flex justify-between items-center">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default InputForm;

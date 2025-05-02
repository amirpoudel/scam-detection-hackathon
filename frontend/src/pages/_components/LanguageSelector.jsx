"use client";
// src/components/LanguageSelector.js
import React, { useState } from "react";

const LanguageSelector = ({ setLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mb-4">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        Choose Language:
      </label>
      <select
        onChange={handleLanguageChange}
        value={selectedLanguage}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-black text-black"
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
};

export default LanguageSelector;

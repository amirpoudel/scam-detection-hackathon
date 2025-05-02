// "use client";
// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
// import DetectionResult from "./_components/DetectionResult";
// import InputForm from "./_components/InputForm";
// import LanguageSelector from "./_components/LanguageSelector";
// import VoiceFeedback from "./_components/VoiceFeedback";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function Home() {
//   return (
//     <div
//       className={`${geistSans.className} ${geistMono.className} bg-white text-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
//     >
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <DetectionResult />
//         <InputForm />
//         <LanguageSelector />
//         <VoiceFeedback />
//       </main>
//     </div>
//   );
// }

// src/App.js
import React, { useState } from "react";
import LanguageSelector from "./_components/LanguageSelector";
import InputForm from "./_components/InputForm";
import DetectionResult from "./_components/DetectionResult";
import VoiceFeedback from "./_components/VoiceFeedback";

const App = () => {
  const [detectionResult, setDetectionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-gray-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
          Multilingual Scam Detection Agent
        </h1>

        {/* Language Selector */}
        <LanguageSelector setLanguage={setLanguage} />

        {/* Input Form */}
        <InputForm
          setDetectionResult={setDetectionResult}
          setLoading={setLoading}
        />

        {/* Detection Result */}
        <DetectionResult result={detectionResult} isLoading={loading} />

        {/* Voice Feedback */}
        <VoiceFeedback result={detectionResult} />
      </div>
    </div>
  );
};

export default App;

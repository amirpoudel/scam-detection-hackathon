// // import "./App.css";
// import "./index.js";
// import React from "react";
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         <p className="text-red-500 text-xl">hello</p>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React, { useState } from "react";
import InputForm from "./component/InputForm.jsx";
import DetectionResult from "./component/DetectionResult";
import VoiceFeedback from "./component/VoiceFeedback";
import LanguageSelector from "./component/LanguageSelector";
import "./styles/App.css";

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

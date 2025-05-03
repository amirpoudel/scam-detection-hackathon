// // "use client";
// // import Image from "next/image";
// // import { Geist, Geist_Mono } from "next/font/google";
// // import DetectionResult from "./_components/DetectionResult";
// // import InputForm from "./_components/InputForm";
// // import LanguageSelector from "./_components/LanguageSelector";
// // import VoiceFeedback from "./_components/VoiceFeedback";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });

// // const geistMono = Geist_Mono({
// //   variable: "--font-geist-mono",
// //   subsets: ["latin"],
// // });

// // export default function Home() {
// //   return (
// //     <div
// //       className={`${geistSans.className} ${geistMono.className} bg-white text-black grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
// //     >
// //       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
// //         <DetectionResult />
// //         <InputForm />
// //         <LanguageSelector />
// //         <VoiceFeedback />
// //       </main>
// //     </div>
// //   );
// // }

// // src/App.js
// // import React, { useState } from "react";
// // import LanguageSelector from "./_components/LanguageSelector";
// // import InputForm from "./_components/InputForm";
// // import DetectionResult from "./_components/DetectionResult";
// // import VoiceFeedback from "./_components/VoiceFeedback";

// // const App = () => {
// //   const [detectionResult, setDetectionResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [language, setLanguage] = useState("en");

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
// //       <div className="w-full max-w-3xl bg-gray-50 p-6 rounded-lg shadow-lg">
// //         <h1 className="text-3xl font-semibold text-center text-gray-700 mb-8">
// //           Multilingual Scam Detection Agent
// //         </h1>

// //         {/* Language Selector */}
// //         <LanguageSelector setLanguage={setLanguage} />

// //         {/* Input Form */}
// //         <InputForm
// //           setDetectionResult={setDetectionResult}
// //           setLoading={setLoading}
// //         />

// //         {/* Detection Result */}
// //         <DetectionResult result={detectionResult} isLoading={loading} />

// //         {/* Voice Feedback */}
// //         <VoiceFeedback result={detectionResult} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default App;

import { useState, useRef } from "react";
import Head from "next/head";
import axios from "axios";
import LanguageSelector from "./_components/LanguageSelector";
import AudioInput from "./_components/AudioInput";
import TextInput from "./_components/TextInput";
import InputSelector from "./_components/InputSelector";
import ResultDisplay from "./_components/ResultDisplay";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import HowItWorks from "./_components/HowItWorks";
import UrlInput from "./_components/UrlInput";

export default function Home() {
  const [inputType, setInputType] = useState("text");
  const [inputText, setInputText] = useState("");
  const [url, setUrl] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const fileInputRef = useRef(null);
  console.log("inputType", inputType);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      let response;
      if (inputType === "text") {
        response = await axios.post("/api/analyze-text", {
          text: inputText,
          language: selectedLanguage,
        });
      } else if (inputType === "url") {
        response = await axios.post("/api/analyze-url", {
          url: url,
          language: selectedLanguage,
        });
      } else if (inputType === "audio") {
        const formData = new FormData();
        formData.append("audio", audioFile);
        formData.append("language", selectedLanguage);
        response = await axios.post("/api/analyze-audio", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing content:", error);
      setResult({
        status: "error",
        message: "Failed to analyze content. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = () => {
    if (loading) return true;
    if (inputType === "text" && !inputText) return true;
    if (inputType === "url" && !url) return true;
    if (inputType === "audio" && !audioFile) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Multilingual Scam Detection</title>
        <meta
          name="description"
          content="Detect scams in WhatsApp messages and websites"
        />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-[#1A1A1A] rounded-lg shadow-md p-6 mb-8">
          <InputSelector inputType={inputType} setInputType={setInputType} />

          <form onSubmit={handleSubmit}>
            {inputType === "text" && (
              <TextInput inputText={inputText} setInputText={setInputText} />
            )}
            {inputType === "url" && <UrlInput url={url} setUrl={setUrl} />}
            {inputType === "audio" && (
              <AudioInput
                audioFile={audioFile}
                setAudioFile={setAudioFile}
                fileInputRef={fileInputRef}
              />
            )}

            <LanguageSelector
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />

            <button
              type="submit"
              disabled={isSubmitDisabled()}
              className={`w-full !bg-green-600 text-white py-2 px-4 rounded-md !hover:bg-green-700 focus:outline-none focus:ring-2 !focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? "Analyzing..." : "Check for Scams"}
            </button>
          </form>
        </div>

        {result && (
          <ResultDisplay
            result={result}
            audioPlaying={audioPlaying}
            setAudioPlaying={setAudioPlaying}
          />
        )}

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

// import { useState, useRef } from "react";
// import Head from "next/head";
// import axios from "axios";
// import Header from "./_components/Header";
// import InputSelector from "./_components/InputSelector";
// import TextInput from "./_components/TextInput";
// import UrlInput from "./_components/UrlInput";
// import LanguageSelector from "./_components/LanguageSelector";
// import ResultDisplay from "./_components/ResultDisplay";
// import HowItWorks from "./_components/HowItWorks";
// import Footer from "./_components/Footer";
// import AudioInput from "./_components/AudioInput";

// export default function Home() {
//   const [inputType, setInputType] = useState("text");
//   const [inputText, setInputText] = useState("");
//   const [url, setUrl] = useState("");
//   const [audioFile, setAudioFile] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [audioPlaying, setAudioPlaying] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("en");
//   const fileInputRef = useRef(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);

//     try {
//       let response;
//       if (inputType === "text") {
//         response = await axios.post("/api/analyze-text", {
//           text: inputText,
//           language: selectedLanguage,
//         });
//       } else if (inputType === "url") {
//         response = await axios.post("/api/analyze-url", {
//           url: url,
//           language: selectedLanguage,
//         });
//       } else if (inputType === "audio" && audioFile) {
//         const formData = new FormData();
//         // Handle both File and Blob objects
//         if (audioFile instanceof File || audioFile instanceof Blob) {
//           formData.append("audio", audioFile, "voice-message.wav");
//         } else {
//           // Handle other cases if needed
//           throw new Error("Invalid audio file format");
//         }
//         formData.append("language", selectedLanguage);
//         response = await axios.post("/api/analyze-audio", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });
//       }

//       setResult(response.data);
//     } catch (error) {
//       console.error("Error analyzing content:", error);
//       setResult({
//         status: "error",
//         message: "Failed to analyze content. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isSubmitDisabled = () => {
//     if (loading) return true;
//     if (inputType === "text" && !inputText) return true;
//     if (inputType === "url" && !url) return true;
//     if (inputType === "audio" && !audioFile) return true;
//     return false;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Head>
//         <title>Multilingual Scam Detection</title>
//         <meta
//           name="description"
//           content="Detect scams in WhatsApp messages and websites"
//         />
//       </Head>

//       <Header />

//       <main className="container mx-auto px-4 py-8">
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <InputSelector inputType={inputType} setInputType={setInputType} />

//           <form onSubmit={handleSubmit}>
//             {inputType === "text" && (
//               <TextInput inputText={inputText} setInputText={setInputText} />
//             )}
//             {inputType === "url" && <UrlInput url={url} setUrl={setUrl} />}
//             {inputType === "audio" && (
//               <AudioInput
//                 audioFile={audioFile}
//                 setAudioFile={setAudioFile}
//                 fileInputRef={fileInputRef}
//               />
//             )}

//             <LanguageSelector
//               selectedLanguage={selectedLanguage}
//               setSelectedLanguage={setSelectedLanguage}
//             />

//             <button
//               type="submit"
//               disabled={isSubmitDisabled()}
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? "Analyzing..." : "Check for Scams"}
//             </button>
//           </form>
//         </div>

//         {result && (
//           <ResultDisplay
//             result={result}
//             audioPlaying={audioPlaying}
//             setAudioPlaying={setAudioPlaying}
//           />
//         )}

//         <HowItWorks />
//       </main>

//       <Footer />
//     </div>
//   );
// }

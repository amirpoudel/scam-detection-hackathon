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
import { post } from "./_fetchWrapper";

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      let response;
      if (inputType === "text") {
        response = await post("/scam/detect/text", {
          text: inputText,
          language: selectedLanguage,
        });
      } else if (inputType === "url") {
        response = await post("/link", {
          url: url,
          language: selectedLanguage,
        });
      } else if (inputType === "audio") {
        const formData = new FormData();
        formData.append("audio", audioFile);
        formData.append("language", selectedLanguage);

        response = await post("/audio", formData, {
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
    <div className="min-h-screen bg-black ">
      <Head>
        <title>Multilingual Scam Detection</title>
        <meta
          name="description"
          content="Detect scams in WhatsApp messages and websites"
        />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8 lg:w-[70dvw] md:w-[90dvw] sm:w-full">
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

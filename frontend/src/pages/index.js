import { useState, useRef } from "react";
import Head from "next/head";
import AudioInput from "./_components/AudioInput";
import TextInput from "./_components/TextInput";
import InputSelector from "./_components/InputSelector";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import HowItWorks from "./_components/HowItWorks";
import UrlInput from "./_components/UrlInput";
import { post } from "../_fetchWrapper";
import ResultCard from "./_components/ResultDisplay";

export default function Home() {
  const [inputType, setInputType] = useState("text");
  const [inputText, setInputText] = useState("");
  const [url, setUrl] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      let response;
      if (inputType === "text") {
        response = await post("scam/detect/text", {
          text: inputText,
        });
        console.log("response", JSON.parse(response.message));
      } else if (inputType === "url") {
        response = await post("scam/detect/link", {
          link: url,
        });
      } else if (inputType === "audio") {
        const formData = new FormData();
        formData.append("audio", audioFile);

        response = await post("scam/detect/audio", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setResult(JSON.parse(response.message));
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
  const handleSubmitQuickResponse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("audio", audioFile);

      const response = await post("scam/detect/audio/quick", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response", response);
      setResult(JSON.parse(response.message));
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        ></link>
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

            {inputType === "audio" ? (
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitDisabled()}
                  className={`w-full !bg-green-600 text-white py-2 px-4 rounded-md !hover:bg-green-700 focus:outline-none focus:ring-2 !focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? "Analyzing..." : "Check for Scams"}
                </button>
                <button
                  type="button"
                  disabled={isSubmitDisabled()}
                  onClick={(e) => handleSubmitQuickResponse(e)}
                  className={`w-full !bg-green-600 text-white py-2 px-4 rounded-md !hover:bg-green-700 focus:outline-none focus:ring-2 !focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? "Analyzing..." : "Quick Response"}
                </button>
              </div>
            ) : (
              <button
                type="submit"
                disabled={isSubmitDisabled()}
                className={`w-full !bg-green-600 text-white py-2 px-4 rounded-md !hover:bg-green-700 focus:outline-none focus:ring-2 !focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? "Analyzing..." : "Check for Full Response Scams"}
              </button>
            )}
          </form>
        </div>

        {result && <ResultCard result={result || {}} />}
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

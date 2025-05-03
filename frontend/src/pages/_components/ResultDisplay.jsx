import { useRef, useState } from "react";
import StatusBadge from "./StatusBadge";

export default function ResultDisplay({
  result,
  audioPlaying,
  setAudioPlaying,
}) {
  const audioRef = useRef(null);

  const handleAudioPlay = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Analysis Result</h2>

      <div className="mb-4">
        <StatusBadge status={result.status} />
      </div>

      {result.transcribedText && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-slate-200 mb-1">
            Transcribed Text:
          </h3>
          <p className="text-gray-800 bg-gray-50 p-3 rounded-md">
            {result.transcribedText}
          </p>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-sm font-medium text-slate-200 mb-1">Details:</h3>
        <p className="text-gray-800">{result.details}</p>
      </div>

      {result.audioResponse && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-slate-200 mb-2">
            Audio Feedback:
          </h3>
          <div className="flex items-center">
            <button
              onClick={handleAudioPlay}
              className="!bg-green-600 text-white p-2 rounded-full !hover:bg-green-700 focus:outline-none"
            >
              {audioPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
            <span className="ml-2 text-sm text-slate-200">
              Click to play audio feedback
            </span>
          </div>
          <audio
            ref={audioRef}
            src={result.audioResponse}
            onEnded={() => setAudioPlaying(false)}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}

import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const PhishingExplanationAudio = ({ explanation }) => {
  const { speak } = useSpeechSynthesis();

  return (
    <div>
      <button
        onClick={() => speak({ text: explanation })}
        className="!bg-green-500 !hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Play Explanation Audio
      </button>
    </div>
  );
};

export default PhishingExplanationAudio;

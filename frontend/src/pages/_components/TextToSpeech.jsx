import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const PhishingExplanationAudio = ({ explanation }) => {
  const { speak } = useSpeechSynthesis();

  //   const explanation =

  return (
    <div>
      <button
        onClick={() => speak({ text: explanation })}
        className="!bg-green-500 !hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Play Explanation Audio
      </button>
    </div>
  );
};

export default PhishingExplanationAudio;

import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const PhishingExplanationAudio = ({ explanation }) => {
  const { speak } = useSpeechSynthesis();

  return (
    <div>
      <button
        onClick={() => speak({ text: explanation })}
<<<<<<< HEAD
        className="!bg-green-500 !hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
=======
        className="!bg-[#4D55CC] !hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
>>>>>>> 996fce525c6646a03bfa555082cb96b2ee1958f7
      >
        Play Explanation Audio
      </button>
    </div>
  );
};

export default PhishingExplanationAudio;

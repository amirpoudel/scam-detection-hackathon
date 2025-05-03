// import { useRef } from "react";

// export default function AudioInput({ audioFile, setAudioFile, fileInputRef }) {
//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAudioFile(file);
//     }
//   };

//   return (
//     <div className="mb-4">
//       <label className="block text-sm font-medium text-slate-200 mb-2">
//         WhatsApp Voice Message
//       </label>
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         accept="audio/*"
//         className="hidden"
//       />
//       <div
//         onClick={triggerFileInput}
//         className="w-full px-3 py-8 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 text-center"
//       >
//         {audioFile ? (
//           <p className="text-blue-600">{audioFile.name}</p>
//         ) : (
//           <p className="text-slate-200">Click to upload voice message</p>
//         )}
//       </div>
//       {audioFile && (
//         <button
//           type="button"
//           onClick={() => setAudioFile(null)}
//           className="mt-2 text-sm text-red-600"
//         >
//           Remove file
//         </button>
//       )}
//     </div>
//   );
// }

"use client";

import { useRef } from "react";
import VoiceRecorder from "./VoiceRecorder";

export default function AudioInput({ audioFile, setAudioFile, fileInputRef }) {
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleRecordingComplete = (blob) => {
    setAudioFile(blob);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-200 mb-2">
        WhatsApp Voice Message
      </label>

      <div className="mb-4">
        <VoiceRecorder onRecordingComplete={handleRecordingComplete} />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*"
        className="hidden"
      />
      <div
        onClick={triggerFileInput}
        className="w-full px-3 py-8 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 text-center"
      >
        {audioFile ? (
          <p className="text-green-600">
            {audioFile.name || "Voice recording"}
          </p>
        ) : (
          <p className="text-gray-500">
            Or click to upload existing voice message
          </p>
        )}
      </div>
      {audioFile && (
        <button
          type="button"
          onClick={() => setAudioFile(null)}
          className="mt-2 text-sm !text-white !bg-red-500 rounded-md px-4 py-2"
        >
          Remove audio
        </button>
      )}
    </div>
  );
}

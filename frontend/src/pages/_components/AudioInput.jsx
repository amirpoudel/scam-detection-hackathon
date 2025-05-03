import { Mic, Trash } from "lucide-react";

export default function AudioInput({ audioFile, setAudioFile, fileInputRef }) {
  const triggerFileInput = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="audio/*"
        className="hidden"
      />
      {audioFile && (
        <div className="w-full flex justify-end items-center">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setAudioFile(null);
            }}
            className="text-sm text-slate-100 !bg-red-500 rounded-md !hover:bg-red-600 flex justify-center items-center mb-2"
          >
            <Trash className="h-4 w-4 " />
          </button>
        </div>
      )}
      <div
        onClick={triggerFileInput}
        className="w-full px-3 py-8 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 text-center"
      >
        <div className="text-center py-8 space-y-4">
          <div className="p-3 bg-slate-800 inline-block rounded-full">
            <Mic className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-slate-300">
            Upload a voice note to analyze for scam patterns
          </p>
          {audioFile?.name ? (
            <p className="text-blue-600">{audioFile.name}</p>
          ) : (
            <button
              variant="outline"
              className="border-dashed border-slate-700 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-slate-300 rounded-md"
            >
              Upload Voice File
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

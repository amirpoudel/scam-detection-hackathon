export default function InputSelector({ inputType, setInputType }) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-center space-x-4 mb-6">
      <button
        onClick={() => setInputType("text")}
        className={`px-4 py-2 rounded-md ${
          inputType === "text" ? "!bg-green-600 text-white" : "!bg-gray-600"
        }`}
      >
        Text Message
      </button>
      <button
        onClick={() => setInputType("url")}
        className={`px-4 py-2 rounded-md ${
          inputType === "url" ? "!bg-green-600 text-white" : "!bg-gray-600"
        }`}
      >
        Website URL
      </button>
      <button
        onClick={() => setInputType("audio")}
        className={`px-4 py-2 rounded-md ${
          inputType === "audio" ? "!bg-green-600 text-white" : "!bg-gray-600"
        }`}
      >
        Voice Message
      </button>
    </div>
  );
}

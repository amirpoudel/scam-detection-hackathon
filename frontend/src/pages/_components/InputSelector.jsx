import { Globe, MessageSquare, Mic } from "lucide-react";

export default function InputSelector({ inputType, setInputType }) {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between space-x-4 mb-6 bg-slate-200 rounded-md p-1">
      <button
        onClick={() => setInputType("url")}
        className={`px-4 py-2 rounded-md !flex !gap-2 items-center ${
          inputType === "url"
            ? "!bg-white !text-slate-800 "
            : "!bg-slate-200 !text-slate-600"
        }`}
      >
        <Globe className="h-4 w-4 !text-slate-100" />
        Website URL
      </button>
      <button
        onClick={() => setInputType("text")}
        className={`px-4 py-2 rounded-md !flex !gap-2 items-center ${
          inputType === "text"
            ? "!bg-white !text-slate-800"
            : "!bg-slate-200 !text-slate-600"
        }`}
      >
        <MessageSquare className="h-4 w-4" />
        Text Message
      </button>
      <button
        onClick={() => setInputType("audio")}
        className={`px-4 py-2 rounded-md !flex !gap-2 items-center ${
          inputType === "audio"
            ? "!bg-white !text-slate-800"
            : "!bg-slate-200 !text-slate-600"
        }`}
      >
        <Mic className="h-4 w-4" />
        Voice Message
      </button>
    </div>
  );
}

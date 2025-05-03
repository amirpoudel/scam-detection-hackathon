import { MessageCircleMore, Link2, Mic } from "lucide-react";

export default function InputSelector({ inputType, setInputType }) {
  return (
    <div className="flex flex-col max-w-[250px] w-full space-x-4 mb-6 text-black/75">
      <div className="text-base font-semibold text-black">
        What would you like to scan?
      </div>
      <hr className="mt-1 mb-3" />
      <div className="w-full flex flex-col gap-2">
        <div
          onClick={() => setInputType("url")}
          className={`w-full px-4 py-3 rounded-md flex gap-2 items-center cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-200 ${
            inputType === "url" ? "!bg-gray-200" : ""
          }`}
        >
          <Link2 />
          <span>Website URL</span>
        </div>
        <div
          onClick={() => setInputType("text")}
          className={`px-4 py-3 rounded-md w-full flex gap-2 items-center cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-200 ${
            inputType === "text" ? "!bg-gray-200 " : ""
          }`}
        >
          <MessageCircleMore />
          <span>Text Message</span>
        </div>
        <div
          onClick={() => setInputType("audio")}
          className={`px-4 py-3 rounded-md flex gap-2 items-center cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-200 ${
            inputType === "audio" ? "!bg-gray-200" : ""
          }`}
        >
          <Mic />
          <span>Voice Message</span>
        </div>
      </div>
    </div>
  );
}

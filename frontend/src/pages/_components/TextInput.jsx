export default function TextInput({ inputText, setInputText }) {
  return (
    <div className="mb-4">
      <textarea
        id="message"
        rows="4"
        className="!w-full h-32 rounded-md bg-slate-800/50 border border-slate-700 p-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none flex justify-center items-center"
        placeholder="Paste suspicious WhatsApp message here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
    </div>
  );
}

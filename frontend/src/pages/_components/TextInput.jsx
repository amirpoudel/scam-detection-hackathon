export default function TextInput({ inputText, setInputText }) {
  return (
    <div className="mb-4">
      <label
        htmlFor="message"
        className="block text-sm font-medium text-slate-200 mb-2"
      >
        WhatsApp Message
      </label>
      <textarea
        id="message"
        rows="4"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none placeholder:text-slate-200 text-slate-200"
        placeholder="Paste suspicious WhatsApp message here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
    </div>
  );
}

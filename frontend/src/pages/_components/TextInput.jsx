export default function TextInput({ inputText, setInputText }) {
  return (
    <div className="mb-4">
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-800 "
      >
        Message
      </label>
      <textarea
        id="message"
        rows="4"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none placeholder:text-gray-500 text-black"
        placeholder="Paste suspicious WhatsApp message here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
    </div>
  );
}

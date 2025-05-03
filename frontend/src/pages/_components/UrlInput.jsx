export default function UrlInput({ url, setUrl }) {
  return (
    <div className="mb-4">
      <label htmlFor="url" className="block text-sm font-medium text-black ">
        URL
      </label>
      <input
        type="url"
        id="url"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none placeholder:text-gray-500 text-black"
        placeholder="Enter suspicious website URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  );
}

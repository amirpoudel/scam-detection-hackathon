export default function UrlInput({ url, setUrl }) {
  return (
    <div className="mb-4">
      <input
        type="url"
        id="url"
        className="pl-10 bg-slate-800/50 border-slate-700 placeholder:text-slate-500 w-full px-2 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        placeholder="Enter suspicious website URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <div className="mt-8 bg-[#1A1A1A] rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 !text-slate-200">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-2">1. Submit Content</h3>
          <p className=" text-slate-200">
            Paste a WhatsApp message, upload a voice note, or enter a website
            URL.
          </p>
        </div>
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-2">2. AI Analysis</h3>
          <p className="text-slate-200">
            Our system checks for scam patterns in multiple languages.
          </p>
        </div>
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-2">3. Get Results</h3>
          <p className="text-slate-200">
            Receive immediate feedback with risk level and explanation.
          </p>
        </div>
      </div>
    </div>
  );
}

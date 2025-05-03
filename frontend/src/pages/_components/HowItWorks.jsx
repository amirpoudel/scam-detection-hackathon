export default function HowItWorks() {
  return (
    <div className="mt-8  rounded-lg  p-6">
      <h2 className="text-xl font-semibold mb-4 text-black/80">
        How does it work?
      </h2>
      <div className="grid gap-4 p-3">
        <div className="p-4 border border-gray-200 rounded-sm ">
          <h3 className="font-medium text-lg mb-2 text-black/75">
            1. Submit Content
          </h3>
          <p className=" text-gray-600">
            Paste a message, upload a voice note, or enter a website
            URL.
          </p>
        </div>
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-2 text-black/75">
            2. AI Analysis
          </h3>
          <p className="text-gray-600">
            Our system checks for scam patterns in multiple languages.
          </p>
        </div>
        <div className="p-4 border border-gray-200 rounded-md">
          <h3 className="font-medium text-lg mb-2 text-black/75">
            3. Get Results
          </h3>
          <p className="text-gray-600">
            Receive immediate feedback with risk level and explanation.
          </p>
        </div>
      </div>
    </div>
  );
}

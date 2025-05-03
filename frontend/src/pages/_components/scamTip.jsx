import { AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ScamTipCard() {
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Never share passwords or verification codes, even if the request seems urgent or official.",
    "Legitimate organizations won't ask for payment via gift cards or wire transfers.",
    "Be skeptical of unexpected emails or messages claiming problems with your accounts.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded shadow-md max-w-md mx-auto">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="text-amber-500" size={24} />
        <h3 className="font-bold text-amber-800">Scam Alert Tip</h3>
      </div>
      <p className="mt-2 text-amber-700">{tips[tipIndex]}</p>
    </div>
  );
}

import { useState } from "react";
import PhishingExplanationAudio from "./TextToSpeech";

const ResultCard = ({ result }) => {
  const [showDetails, setShowDetails] = useState(false);
  const getStatus = () => {
    if (result?.phishingLikelihood || result?.isSafe) {
      return result?.isSafe
        ? "safe"
        : result?.phishingLikelihood === "High"
        ? "scam"
        : "suspicious";
    }

    return result?.status || "";
  };

  const getExplanation = () => {
    return result?.explanation || result?.reason || "";
  };

  const getRecommendation = () => {
    return result?.safetyRecommendation || "";
  };

  const getConfidenceScore = () => {
    return result?.confidenceScore ? `${result.confidenceScore}%` : null;
  };

  const getSuspiciousIndicators = () => {
    return result?.suspiciousIndicators || [];
  };

  const status = getStatus();

  const getStatusIcon = () => {
    switch (status) {
      case "safe":
        return "bg-green-500 px-2 py-1 text-slate-100 rounded-full";
      case "suspicious":
        return " bg-yellow-500 px-2 text-slate-100 py-1 rounded-full";
      case "scam":
        return " bg-red-500 px-2 text-slate-100 py-1 rounded-full";
      default:
        return "bg-gray-500 px-2 text-slate-100 py-1 rounded-full";
    }
  };
  const getRiskColor = () => {
    switch (result?.risk) {
      case "low":
        return "bg-green-500 px-2 py-1 text-slate-100 rounded-full";
      case "medium":
        return " bg-yellow-500 px-2 text-slate-100 py-1 rounded-full";
      case "high":
        return " bg-red-500 px-2 text-slate-100 py-1 rounded-full";
      default:
        return "bg-gray-500 px-2 text-slate-100 py-1 rounded-full";
    }
  };
  const getStatusText = () => {
    switch (status) {
      case "safe":
        return "Safe";
      case "suspicious":
        return "Suspicious";
      case "scam":
        return "Scam Detected";
      default:
        return "Unknown";
    }
  };

  const getCardClass = () => {
    switch (status) {
      case "safe":
        return "border-green-500 bg-green-50";
      case "suspicious":
        return "border-yellow-500 bg-yellow-50";
      case "scam":
        return "border-red-500 bg-red-50";
      default:
        return "border-gray-300";
    }
  };

  return (
    <div
      className={`border-2 !bg-white text-black rounded-lg p-4 mb-4 ${getCardClass()}`}
    >
      <div className="flex flex-col justify-between items-start">
        <div className="flex-grow">
          <h4 className="font-bold text-lg mb-2 flex items-center">
            <span className={`!font-normal text-sm ${getStatusIcon()}`}>
              {getStatusText()}
            </span>
            {getConfidenceScore() && (
              <span
                className={`ml-2 text-sm !bg-gray-100 px-2 py-1 rounded-full text-black/65 font-medium `}
              >
                {getConfidenceScore()} confidence
              </span>
            )}
            {result?.risk && (
              <span className={`!font-normal text-sm ${getRiskColor()}`}>
                {result?.risk}
              </span>
            )}
          </h4>
          <p className="text-gray-700 mb-3">{getExplanation()}</p>

          {getRecommendation() && (
            <div className="mb-3 bg-white shadow-sm p-3 rounded-md border border-indigo-200">
              <p className="text-indigo-600 font-semibold text-sm">
                Recommendation:
              </p>
              <p className="text-indigo-500">{getRecommendation()}</p>
            </div>
          )}

          {getSuspiciousIndicators().length > 0 && (
            <div className={showDetails ? "block" : "hidden"}>
              <div className="flex flex-wrap">
                <div>
                  <p className="font-semibold text-black/80 mb-2">
                    Suspicious indicators detected:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 pl-2">
                    {getSuspiciousIndicators().map((indicator, index) => (
                      <li key={index} className="mb-1">
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  {result?.transcriptAnalysis?.suspiciousElements && (
                    <div>
                      <p className="font-semibold text-slate-200 mb-2">
                        Suspicious Element detected:
                      </p>
                      <ul className="list-disc list-inside text-slate-300 pl-2">
                        {result?.transcriptAnalysis?.suspiciousElements?.map(
                          (indicator, index) => (
                            <li key={index} className="mb-1">
                              {indicator}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {getSuspiciousIndicators().length > 0 && (
            <div
              className=" text-sm font-medium mt-2 flex items-center rounded-md text-gray-500 cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide details" : "Show details"}
              <i
                className={`fas fa-chevron-${showDetails ? "up" : "down"} ml-1`}
              ></i>
            </div>
          )}
        </div>
        {getExplanation() && (
          <PhishingExplanationAudio explanation={getExplanation()} />
        )}
      </div>
    </div>
  );
};

export default ResultCard;

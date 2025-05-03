// import { useRef, useState } from "react";
// import StatusBadge from "./StatusBadge";

// export default function ResultDisplay({
//   result,
//   audioPlaying,
//   setAudioPlaying,
// }) {
//   const audioRef = useRef(null);

//   // const handleAudioPlay = () => {
//   //   if (audioRef.current) {
//   //     if (audioPlaying) {
//   //       audioRef.current.pause();
//   //     } else {
//   //       audioRef.current.play();
//   //     }
//   //     setAudioPlaying(!audioPlaying);
//   //   }
//   // };

//   return (
//     <div className="bg-[#1A1A1A] rounded-lg shadow-md p-6">
//       <h2 className="text-xl font-semibold mb-4 !text-slate-100">
//         Analysis Result
//       </h2>

//       <div className="mb-4">
//         <StatusBadge status={result?.isSafe ? "Safe" : "Scam"} />
//         {/* <StatusBadge status={result?.isSafe ? "Safe" : "Scam"} /> */}
//       </div>

//       {/* {result.transcribedText && ( */}
//       {/* <div className="mb-4">
//         <h3 className="text-sm font-medium text-slate-200 mb-1">
//           Transcribed Text:
//         </h3>
//         <p className="text-gray-800 bg-gray-50 p-3 rounded-md">
//         </p>
//       </div> */}
//       <div className="mb-4">
//         <h3 className="text-sm text-slate-200 mb-1 font-semibold">
//           Suspicious List:
//         </h3>
//         <ul className="flex flex-col">
//           {[
//             "Offers that seem too good to be true",
//             "Requesting sensitive information",
//             "Unusual requests or instructions",
//           ]?.map((indicator, index) => (
//             <li className="list-disc mx-8">{indicator}</li>
//           ))}
//         </ul>
//       </div>
//       {/* )} */}

//       <div className="mb-4">
//         <h3 className="text-sm text-slate-200 mb-1 font-semibold">Details:</h3>
//         {/* <p className="text-gray-800">{result.details}</p> */}
//         <p>
//           The message promises a large sum of money, which is a common tactic
//           used in phishing attempts to lure victims. It also requests for a
//           payment to collect the prize, which is a suspicious request. The
//           message does not provide any legitimate source or organization, making
//           it highly suspicious.'
//         </p>
//       </div>
//       <div>
//         <h3 className="text-sm text-slate-200 mb-1 font-semibold">
//           Recommendation:
//         </h3>

//         <p>
//           Do not respond to the message or send any money. Report the message to
//           your service provider.
//         </p>
//       </div>
//       {/* {result.audioResponse && ( */}
//       <div className="mt-4">
//         <h3 className="text-sm font-medium text-slate-200 mb-2">
//           Audio Feedback:
//         </h3>
//         <div className="flex items-center">
//           <button
//             // onClick={handleAudioPlay}
//             className="!bg-green-600 text-white p-2 rounded-full !hover:bg-green-700 focus:outline-none"
//           >
//             {audioPlaying ? (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             )}
//           </button>
//           <span className="ml-2 text-sm text-slate-200">
//             Click to play audio feedback
//           </span>
//         </div>
//         <audio
//           ref={audioRef}
//           // src={result.audioResponse}
//           onEnded={() => setAudioPlaying(false)}
//           className="hidden"
//         />
//       </div>
//       {/* )} */}
//     </div>
//   );
// }

// components/shared/ResultCard.jsx
import { useRef, useState } from "react";

const ResultCard = ({ result }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const audioRef = useRef(null);
  // Handle API response structure
  const getStatus = () => {
    // If we're using the new API response format
    if (result?.phishingLikelihood) {
      return result?.isSafe
        ? "safe"
        : result?.phishingLikelihood === "High"
        ? "scam"
        : "suspicious";
    }

    // If we're using the older/simpler format
    return result?.status || "unknown";
  };

  const getExplanation = () => {
    return (
      result?.explanation ||
      result?.reason ||
      "No detailed explanation available."
    );
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

  // const getStatusIcon = () => {
  //   switch (status) {
  //     case "safe":
  //       return <div className="w-4 h-4 rounded-full bg-green-500"></div>;
  //     case "suspicious":
  //       return <div className="w-4 h-4 rounded-full bg-yellow-500"></div>;
  //     case "scam":
  //       return <div className="w-4 h-4 rounded-full bg-red-500"></div>;
  //     default:
  //       return <div className="w-4 h-4 bg-gray-500"></div>;
  //   }
  // };
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

  const playVoiceFeedback = () => {
    setIsPlaying(true);

    const message = `${getStatusText()}. ${getExplanation()} ${getRecommendation()}`;

    console.log("Playing voice feedback:", message);

    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div
      className={`border-2 !bg-[#1A1A1A] rounded-lg p-4 mb-4 ${getCardClass()}`}
    >
      <div className="flex flex-col justify-between items-start">
        <div className="flex-grow">
          <h4 className="font-bold text-lg mb-2 flex items-center">
            {/* <span className="mr-2">{getStatusIcon()}</span> */}
            <span className={`!font-normal text-sm ${getStatusIcon()}`}>
              {getStatusText()}
            </span>
            {getConfidenceScore() && (
              <span className="ml-2 text-sm !bg-[#2a2a2e] px-2 py-1 rounded-full text-slate-100 font-medium">
                {getConfidenceScore()} confidence
              </span>
            )}
            {result?.risk && (
              <span className={`!font-normal text-sm ${getRiskColor()}`}>
                {result?.risk}
              </span>
            )}
          </h4>
          <p className="text-slate-200 mb-3">{getExplanation()}</p>

          {getRecommendation() && (
            <div className="mb-3 bg-[#1A1A1A] p-3 rounded-md border border-indigo-200">
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
                  <p className="font-semibold text-slate-200 mb-2">
                    Suspicious indicators detected:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 pl-2">
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
            <button
              className="!bg-green-600 hover:text-green-800 text-sm font-medium mt-2 flex items-center rounded-md"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide details" : "Show details"}
              <i
                className={`fas fa-chevron-${showDetails ? "up" : "down"} ml-1`}
              ></i>
            </button>
          )}
        </div>
        <div className=" mt-4">
          <div className="flex items-center">
            <button
              //             // onClick={handleAudioPlay}
              className="!bg-green-600 text-white p-2 rounded-full !hover:bg-green-700 focus:outline-none"
            >
              {/* {audioPlaying ? ( */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {/* ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              )} */}
            </button>
            <span className="ml-2 text-sm text-slate-200">
              Click to play audio feedback
            </span>
          </div>
          <audio
            ref={audioRef}
            // src={result.audioResponse}
            onEnded={() => setAudioPlaying(false)}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Play, Pause, Save, Loader2, Trash2 } from "lucide-react";

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioElementRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    audioElementRef.current = new Audio();

    audioElementRef.current.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    audioElementRef.current.addEventListener("loadedmetadata", () => {
      if (
        audioElementRef.current &&
        audioElementRef.current.duration !== Infinity
      ) {
        setDuration(Math.round(audioElementRef.current.duration));
      }
    });

    audioElementRef.current.addEventListener("timeupdate", () => {
      if (audioElementRef.current) {
        setPlaybackTime(Math.round(audioElementRef.current.currentTime));
      }
    });

    return () => {
      clearInterval(timerRef.current);
      if (audioElementRef.current) {
        audioElementRef.current.pause();
        audioElementRef.current.removeEventListener("ended", () => {});
        audioElementRef.current.removeEventListener("loadedmetadata", () => {});
        audioElementRef.current.removeEventListener("timeupdate", () => {});
      }
    };
  }, []);

  const startRecording = async () => {
    setLoading(true);
    try {
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
        setAudioURL("");
      }

      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        const finalDuration = recordingTime;
        setDuration(finalDuration);

        const tempAudio = new Audio(url);
        tempAudio.addEventListener("loadedmetadata", () => {
          if (tempAudio.duration !== Infinity) {
            setDuration(Math.round(tempAudio.duration));
          }
        });

        if (onRecordingComplete) {
          onRecordingComplete(audioBlob, finalDuration);
        }

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    } finally {
      setLoading(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const togglePlayback = () => {
    if (!audioURL) return;

    if (isPlaying) {
      audioElementRef.current.pause();
      setIsPlaying(false);
    } else {
      audioElementRef.current.src = audioURL;
      audioElementRef.current.play();
      setIsPlaying(true);
    }
  };

  const deleteRecording = () => {
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL("");
      setIsPlaying(false);
      setRecordingTime(0);
      setDuration(0);
      setPlaybackTime(0);
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const downloadRecording = () => {
    if (!audioURL) return;

    const a = document.createElement("a");
    a.href = audioURL;
    a.download = `voice-message-${new Date().toISOString()}.wav`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-3 rounded-full transition-colors ${
            isRecording
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={loading}
          aria-label={isRecording ? "Stop recording" : "Start recording"}
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isRecording ? (
            <Square className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        <div className="flex-1">
          {isRecording ? (
            <div className="flex items-center">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="font-mono">{formatTime(recordingTime)}</span>
              <span className="ml-2 text-gray-600">Recording...</span>
            </div>
          ) : audioURL ? (
            <div className="flex items-center">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="font-mono text-lg">
                    {isPlaying ? formatTime(playbackTime) : formatTime(0)}
                  </span>
                  <span className="mx-1">/</span>
                  <span className="font-mono text-lg">
                    {formatTime(duration)}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  Length: {formatTime(duration)}
                </span>
              </div>
            </div>
          ) : (
            <span className="text-gray-600">
              Click the microphone to start recording
            </span>
          )}
        </div>

        {audioURL && !isRecording && (
          <div className="flex space-x-2">
            <button
              onClick={togglePlayback}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={downloadRecording}
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
              aria-label="Download recording"
            >
              <Save className="w-5 h-5" />
            </button>

            <button
              onClick={deleteRecording}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
              aria-label="Delete recording"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="text-sm text-slate-200">
        {!navigator.mediaDevices ? (
          <span className="text-yellow-500">
            Voice recording is not supported in this browser or requires HTTPS.
          </span>
        ) : audioURL ? (
          <span>Recording saved. You can play, download, or delete it.</span>
        ) : (
          <span>
            Ready to record. Maximum recording time depends on your browser and
            available memory.
          </span>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;

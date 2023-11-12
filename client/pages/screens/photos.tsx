/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export default function Photos() {
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [highStress, setHighStress] = useState(0);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
      console.log(imageSrc);
      // send image url to socket server
      const socket = new WebSocket("ws://129.120.67.51:8765");
      socket.addEventListener("open", function (event) {
        socket.send(imageSrc);
      });
    }
  }, [webcamRef]);

  //listen for messages from the server
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Create WebSocket connection
    socketRef.current = new WebSocket("ws://129.120.67.51:8765");

    // Listen for messages
    const handleMessage = (e: { data: any }) => {
      console.log("Message received:", e.data);
      // Here you can update the state based on the received message
      // For example, if you're expecting a JSON message:
      // const data = JSON.parse(e.data);
      // setSomeState(data);
    };

    socketRef.current.addEventListener("message", () => handleMessage);

    // Clean up
  }, []);

  const toggleCapture = () => {
    setIsCapturing(!isCapturing);
  };

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
      if (isCapturing) {
        capture();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isCapturing, capture]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-[5%]">
        <Webcam
          audio={false}
          width={720}
          height={400}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          className="rounded-lg"
        />
        {/* //a little buggy so possibly not show
                    {url && isCapturing && (
                    <div className="w-[360] h-[360]">
                        <img src={url} alt="Screenshot" className="rounded-md" />
                    </div>
                    )} */}
        <div className=" flex flex-row justify-center items-center">
          <button
            className="bg-gray-800 text-white py-2 px-4 rounded-md "
            onClick={toggleCapture}
          >
            {isCapturing ? "Pause" : "Start"}
          </button>
          <button
            className="bg-gray-800 text-white py-2 px-4 rounded-md m-2"
            onClick={() => setUrl(null)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

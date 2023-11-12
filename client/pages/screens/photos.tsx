/* eslint-disable @next/next/no-img-element */
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 720,
    height: 360,
    facingMode: "user"
};

export default function Photos () {
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState<boolean>(false);
    

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc);
            console.log(imageSrc);
        }
    }, [webcamRef]);

    const toggleCapture = () => {
        setIsCapturing(!isCapturing);
    }

    //take a picture every 5 seconds
    setInterval(() => {
        if (isCapturing) {
            capture();
        }
    }, 2000);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative">
                <div className="flex flex-row gap-[5%]">
                    <Webcam
                        audio={false}
                        width={360}
                        height={360}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        videoConstraints={videoConstraints}
                        className="rounded-md"
                    />
                    {/* //a little buggy so possibly not show
                    {url && isCapturing && (
                    <div className="w-[360] h-[360]">
                        <img src={url} alt="Screenshot" className="rounded-md" />
                    </div>
                    )} */}
                </div>

                <div className=" flex justify-center">
                    <button className="bg-gray-800 text-white py-2 px-4 rounded-md m-2" onClick={toggleCapture}>
                        {isCapturing ? 'Pause' : 'Start'}
                    </button>
                    <button className="bg-gray-800 text-white py-2 px-4 rounded-md m-2" onClick={() => setUrl(null)}>
                        Delete
                    </button>
                </div>
            </div>

        </div>
    );
};

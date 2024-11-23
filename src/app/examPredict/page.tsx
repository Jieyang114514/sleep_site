"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "antd";

const PageDisplay = () => {
    const router = useRouter();
    const [isTimePassed, setIsTimePassed] = useState(false);

    useEffect(() => {
        const handle = setTimeout(() => {
            setIsTimePassed(true);
           
            if (isTimePassed) {
                router.push("/examPredict/examPredict1");
            }
        }, 5800);

        return () => clearTimeout(handle);
    }, [isTimePassed]); // Added dependency array to fix stale closure

    const handleReturn = () => {
        localStorage.clear();
        router.push("/popularity");
    };

    const handleContinue = () => {
        router.push("/examPredict/examPredict1");
    }

   

    return (
        <>
            <Button type="primary" onClick={handleReturn}>
                Retake the test
            </Button>
            <div
                className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center"
                style={{ backgroundColor: "rgba(0,0,0,0.8)" }} // Fixed zIndex syntax
            >
                <iframe
                    width={1500}
                    height={800}
                    src="https://www.youtube.com/embed/eRJohwL9brw?autoplay=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />

            </div>
            <div
                style={{
                    position: "fixed",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
                >
                <Button 
                    type="primary" 
                    style={{ padding: "10px 20px", fontSize: "16px" }}
                    onClick={handleContinue}
                >
                    Skip
                </Button>
            </div>
           
        </>
    );
};

export default PageDisplay;

"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../../../../public/IMG_0532.jpg";
import styles from "@/styles/style.module.css";
import { Button, Spin, Input } from "antd";

const PageDisplay = () => {
    const [color1, setColor1] = useState("2F1C56");
    const [color2, setColor2] = useState("362F41");
    const [color3, setColor3] = useState("BD93D8");
    const [answerRegister, setAnswerRegister] = useState({});
    const [prompt, setPrompt] = useState("");
    const [loadings, setLoadings] = useState(false);
    const [messageSuggestion, setMessageSuggestion] = useState('');
    const [messageTypePersonality, setMessageTypePersonality] = useState([]);  // Initialize as array instead of string
    const typePersonality = ['ISFJ (The Protector)', 'ESFJ (The Provider)', 'ISTJ (The Inspector)'];
    const [ifTutorial, setIftutorial] = useState(20)
    const [isTimePassed, setIsTimePassed] = useState(false);
    useEffect(() => { 
        let storedData = localStorage.getItem("answer");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setAnswerRegister(parsedData);
            setPrompt(parsedData['1'] + parsedData['2'] + parsedData['3']);

            
            const personalityTypes = [];
            for (let i = 1; i <= 3; i++) {
                const answerNumber = parsedData[i.toString()];
                if (answerNumber) {
                    const typeIndex = parseInt(answerNumber.slice(-1));
                    if (typeIndex >= 0 && typeIndex < typePersonality.length) {
                        personalityTypes.push(typePersonality[typeIndex]);
                    }
                }
            }
            
            setMessageTypePersonality([...new Set(personalityTypes)]);
        }

    }, []);

    const router = useRouter();
    const handleReturn = () => {
        localStorage.clear();
        router.push("/popularity");
    };

    return (
        <>
            
            <Button type="primary" onClick={handleReturn}>retake the test</Button>
            <div style={{backgroundColor: `#${color1}`}}>
                <Image
                    className={styles.homepage}
                    src={img}
                    alt="Person sleeping peacefully"
                />
                <div className={styles.titleFont}>
                    <h1>Your personality is:</h1>
                    {messageTypePersonality.length > 0 ? (
                        messageTypePersonality.map((type, index) => (
                            <h2 key={index}>{type}</h2>
                        ))
                    ) : (
                      <Spin size="large" />
                    )}
                    <br/>
                    <p className={styles.description}>{messageSuggestion}</p>
                    <p className={styles.description}>Historic answer:</p>
                    <p className={styles.description}>{answerRegister['1'].slice(0, -1)}</p>
                    <p className={styles.description}>{answerRegister['2'].slice(0, -1)}</p>
                    <p className={styles.description}>{answerRegister['3'].slice(0, -1)}</p>
                </div>
            </div>
        </>
    );
};

export default PageDisplay;
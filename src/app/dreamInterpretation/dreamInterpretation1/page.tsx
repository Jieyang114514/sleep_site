"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { openai } from "../../util/open-ai-util";
import { Button, Spin, Input } from "antd";
import styles from "@/styles/style.module.css";
import Image from "next/image";
import img from "../../../../public/Dream bot icon.jpg";
// import video from "../../../public/test_video1.mp4";

const PageDisplay = () => {
  const [prompt, setPrompt] = useState("");
  // const [showPrompt, setShowPrompt] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [message, setMessage] = useState("");
  const [isFirstUse, setIsFirstUse] = useState(true);

  const dreamInterpreterPrompt = `You are a dream interpreter with deep insight into the subconscious realm. 
  Your role is to analyze the dreams that users describe to you and provide interpretations of their hidden meanings. 
5. Connect the dream's symbolism to the user's possible waking life situations or emotions.
6. Offer guidance or suggestions after maximum 2 prompts
Use mystical and intuitive language in your response.
`;

  const handleInputChange = (value) => {
    setPrompt(value);
    ``
  };
  const useOpenAI = (prompt) => {
    setLoadings(true);
    const fullPrompt = isFirstUse ? dreamInterpreterPrompt + prompt : prompt;

    openai(fullPrompt).then((result) => {
      const pastConversation  = localStorage.getItem("historyConversation")
      console.log('past conversation:',pastConversation)
      let newConversation;
      if (pastConversation===null){
        newConversation = [{'Question':fullPrompt,'Answear':result}]
      }
       else{
        const recoveredValue = JSON.parse(pastConversation)
        console.log('recoveredValue:',recoveredValue)
        recoveredValue.push({'Question':fullPrompt,'Answear':result})
        newConversation = recoveredValue
       }
      localStorage.setItem("historyConversation", JSON.stringify(newConversation) );
      console.log(result);
      setMessage(result.content);
      setLoadings(false);
      setIsFirstUse(false)
     
    });
  };
  const router = useRouter();
  const handleReturn = () => {
    localStorage.clear();
    router.push("/page_return_version");
  };

  

  return (
    <>
      <div>
        <Button type="primary" onClick={handleReturn}>
          return
        </Button>
      </div>
      <br />
      <Input
        className={styles.divBottomCenter}
        type="text"
        value={prompt}
        placeholder="Describe your recent dream here..."
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            useOpenAI(prompt);
            setPrompt('')
            
            
           
          }
        }}
      ></Input>
      {loadings ? (
        <div>
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Button
            className={styles.divBottomRight}
            type="primary"
            onClick={() => useOpenAI(prompt)}
          >
            Submit
          </Button>
          <br />
          <Image
            className={styles.aiProfile}
            src={img}
          />

          {/* <Video
            className={styles.userTutorial}
            src={video}
          /> */}
          
          <p style={{fontSize: '18px'}}>: {message}</p>
        </>
      )}
    </>
  );
};
export default PageDisplay;

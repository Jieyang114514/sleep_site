"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { openai } from "../../util/open-ai-util";
import { Button, Spin, Input } from "antd";
import styles from "@/styles/style.module.css";
import Image from "next/image";
import img from "../../../../public/Exam bot.jpg";
// import video from "../../../public/test_video1.mp4";

const PageDisplay = () => {
  const [prompt, setPrompt] = useState("");
  // const [showPrompt, setShowPrompt] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [message, setMessage] = useState("");
  const [isFirstUse, setIsFirstUse] = useState(true);

  const dreamInterpreterPrompt = ` predict how well the user will do on his upcoming exam
  consider:
Hours studied this week? 
Course material covered? (rough %)
How confident are you? (1-10)
Have you done practice questions? (Y/N)
Based on the answers,  share:
the likely score 
What is already doing great at
One quick tip to boost the score even higher 
Remember: answer while being optimistic and encouraging

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
        placeholder="Describe your latest study here..."
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

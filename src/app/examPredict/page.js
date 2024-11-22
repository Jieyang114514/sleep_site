
// note modified

"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { openai } from "../util/open-ai-util";
import { Button, Spin, Input } from "antd";
import styles from "@/styles/style.module.css";
import Image from "next/image";
import img from "../../../public/img.jpg";

const PageDisplay = () => {
  const [prompt, setPrompt] = useState("");
  const [loadings, setLoadings] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (value) => {
    console.log(value)

    setPrompt(value);
    
  };
  const useOpenAI = () => {
    setLoadings(true);
    openai(prompt).then((result) => {
      const pastConversation  = localStorage.getItem("historyConversation")
      console.log('past conversation:',pastConversation)
      let newConversation;
      if (pastConversation===null){
        newConversation = [{'Question':prompt,'Answear':result}]
      }
       else{
        const recoveredValue = JSON.parse(pastConversation)
        console.log('recoveredValue:',recoveredValue)
        recoveredValue.push({'Question':prompt,'Answear':result})
        newConversation = recoveredValue
       }
      localStorage.setItem("historyConversation", JSON.stringify(newConversation) );
      console.log(result);
      setMessage(result.content);
      setLoadings(false);
     
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
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setPrompt('')
            useOpenAI(prompt);
           
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
            onClick={useOpenAI}
          >
            Use OPENAI
          </Button>
          <br />
          <Image
            className={styles.aiProfile}
            src={img}
            
          />
          <p style={{fontSize: '18px'}}>: {message}</p>
        </>
      )}
    </>
  );
};
export default PageDisplay;

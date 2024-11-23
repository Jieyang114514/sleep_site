"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import styles from "@/styles/personalityTest.module.css";

const PageDisplay = () => {
  const [backgroundColor1, setBackgroundColor1] = useState('#f0f0f0');
  const [backgroundColor2, setBackgroundColor2] = useState('#f0f0f0');
  const [backgroundColor3, setBackgroundColor3] = useState('#f0f0f0');
  const [ifLastQuestion, setIfLastQuestion] = useState(false)
  const [answerRegister, setAnswerRegister] = useState({
  })
  const [ifTutorial, setIfTutorial] = useState(true)
  const [answerOrder, setAnswerOrder] = useState(1);
  // ther should always be one more key with empty list so when answerOrder is added it will not encounter no-index error
  const [answerObject, setAnswerObject] = useState({
    question1: {
      question: "In social situations, which best describes you?",
      options: ["I prefer small groups or one-on-one interactions and need alone time to recharge", 
        "I love being in groups and feel energized by social interactions", 
        "I prefer structured interactions and tend to be reserved unless necessary"]
    },
    question2: {
      question: "When facing a problem at work/school, what's your first instinct?",
      options: ["I Consider how the solution will affect everyone involved and seek harmony", 
        "Discuss it with others and find a solution that works for the group ", 
        "Analyze the facts and follow established procedures to solve it "]
    },
    question3: {
      question: "How do you typically make important decisions?",
      options: ["Consider personal values and how it affects others, but prefer to reflect privately",
         "Discuss with others and consider the impact on people and relationships",
         "Look at the logical facts and make a decision based on proven methods"]
    },
    question4: {
      question: "test finished",
      options: ["complete the test", "complete the test", "complete the test"]
    }
});

  const answer = !ifLastQuestion ? answerObject[`question${answerOrder}`]?.options : [];
  const question = !ifLastQuestion ? answerObject[`question${answerOrder}`]?.question : '';
    
  const router = useRouter();
  const delay = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

  const handleReturn = () => {
    localStorage.clear();
    router.push("/page_return_version");
  };

  const handleClick = (divNumber: number) => {
    if (answerOrder >= Object.keys(answerObject).length) {
      console.log('last question')
      setIfLastQuestion(true);
      console.log('test finished')
      router.push("/show_result");}
  
    answerRegister[answerOrder] = answer[divNumber]+divNumber.toString();
    console.log(answerRegister);
    localStorage.setItem('answer', JSON.stringify(answerRegister));
    setAnswerOrder(answerOrder + 1);
;}
  

  return (
    <>
      <Button type="primary" onClick={handleReturn}>return</Button>
      <div>
        <h1 className={styles.title}>{question}</h1>
      </div>

      <div className={styles.multipleChoice1}
        style={{
          backgroundColor: backgroundColor1,
          userSelect: 'none',
          transition: 'background-color 0.8s ease, transform 0.5s ease-in-out',
        }}
        onClick={async () => {
          if(ifLastQuestion){setBackgroundColor1('#a0a0a0');
            handleClick(0);  // Registering Div 1 click
            }
          setBackgroundColor1('#a0a0a0');
          handleClick(0);  // Registering Div 1 click
          await delay(500);
          setBackgroundColor1(backgroundColor1);
      }}
      >
        <div className={styles.answearPolice}>{answer[0]}</div>
      </div>

      <div className={styles.multipleChoice2}
        style={{
          backgroundColor: backgroundColor2,
          userSelect: 'none',
          transition: 'background-color 0.8s ease, transform 0.5s ease-in-out',
        }}
        onClick={async () => {
          setBackgroundColor2('#a0a0a0');
          handleClick(1);  // Registering Div 2 click
          await delay(500);
          setBackgroundColor2(backgroundColor2);
        }}
      >
        <div className={styles.answearPolice}>{answer[1]}</div>
      </div>

      <div className={styles.multipleChoice3}
        style={{
          backgroundColor: backgroundColor3,
          userSelect: 'none',
          transition: 'background-color 0.8s ease, transform 0.5s ease-in-out',
        }}
        onClick={async () => {
          setBackgroundColor3('#a0a0a0');
          handleClick(2);  // Registering Div 3 click
          await delay(500);
          setBackgroundColor3(backgroundColor3);
        }}
      >
        <div className={styles.answearPolice}>{answer[2]}</div>
      </div>
    </>
  );
};

export default PageDisplay;

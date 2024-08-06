"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { openai } from "../util/open-ai-util";
import { Button, Spin, Input } from "antd";
import styles from "@/styles/style.module.css";
import Image from "next/image";
import img from "../../../public/img.jpg";

const PageDisplay = () => {
  const [num1, setNum1] = useState(null);
  const [loadings, setLoadings] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (value) => {
    if (value.length > 0) {
      const newNumber = value;
      console.log(value);
      setNum1(value);
    }
  };
  const useOpenAI = () => {
    setLoadings(true);
    openai(num1).then((result) => {
      console.log(result);
      setMessage(result.content);
      setLoadings(false);
    });
  };
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/");
  };

  return (
    <>
      <div>
        <Button type="primary" onClick={handleSubmit}>
          return
        </Button>
      </div>
      <br />
      <Input
        className={styles.divBottomCenter}
        type="text"
        value={num1}
        onChange={(e) => handleInputChange(e.target.value)}
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
            alt="Person sleeping peacefully"
          />
          <p style={{fontSize: '18px'}}>: {message}</p>
        </>
      )}
    </>
  );
};
export default PageDisplay;

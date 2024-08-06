"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import img from "../../public/img.jpg";
import { BorderlessTableOutlined } from "@ant-design/icons";
import styles from "@/styles/style.module.css";
import { Button } from "antd";
export default function Home() {
  const router = useRouter();
  const handleSubmit = () => {
    router.push("/chatbot");
  };

  return (
    <div>
      <div>
        <Image
          className={styles.homepage}
          src={img}
          alt="Person sleeping peacefully"
        />
        <h1 className={styles.titleFont}>Main Title</h1>
      </div>
      <div style={{ textAlign: "center", height:'5rem' }}>
        {/* div containing only space */}
      </div>
      <div className={styles.imageContainer}>
        <Image
          className={styles.titleImg1}
          src={img}
          alt="Person sleeping peacefully"
        />
        <h1 className={styles.subtitleFont}>Title</h1>
        <div style={{  height:'2rem' }}></div>
        <p className={styles.centerDiv}>
          {" "}
          txt txt txt txt <br />
          txt txt txt
          <br />
          txt txt
          <br />
          txt
          <br />
          <br /></p>
          <div className={styles.centerDiv}>
            <Button
              className={styles.gradientButton}
              type="primary"
              onClick={handleSubmit}
            >
              push to AI chat
            </Button>
          </div>
        
      </div>

      <div className={styles.space} style={{ textAlign: "center" }}>
        div containing only space
      </div>

      {/*  */}
    </div>
  );
}

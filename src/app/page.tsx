"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import img from "../../public/IMG_0532.jpg";
import { BorderlessTableOutlined } from "@ant-design/icons";
import styles from "@/styles/style.module.css";
import { Button } from "antd";

const PageDisplay = () => {
  const [scale, setScale] = useState(0);
  const [cardNum, setCardNum] = useState(5);
  const [topSpeed, setTopSpeed] = useState(0.6);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [color1, setColor1] = useState("2F1C56");
  const [color2, setColor2] = useState("362F41");
  const [color3, setColor3] = useState("BD93D8");
  const [ifReturn, setIfReturn] = useState(false);

  useEffect(() => {
    const scrollMiddlePage = (ifReturn: boolean) => {
      if (ifReturn) {
        window.scrollTo(0, 50 * 16); // 50rem * 16px
      }
    };
// if the user use return button of subpage, he will goes directly tyo the middle of the mainpage. missing the link between pages
    scrollMiddlePage(ifReturn);     

    const preventDefault = (e: WheelEvent) => {
      if (isMouseOver) {
        e.preventDefault();
      }
    };

    document.body.addEventListener("wheel", preventDefault, { passive: false });

    return () => {
      document.body.removeEventListener("wheel", preventDefault);
    };
  }, [isMouseOver, ifReturn]);

  const router = useRouter();

  const handleSubmitChatbot = () => {
    setIfReturn(true);
    router.push("/chatbot");
  };

  const handleSubmitExam = () => {
    setIfReturn(true);
    router.push("/examPredict");
  };

  const handleSubmitPopularity = () => {
    setIfReturn(true);
    router.push("/popularity");
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    if (event.deltaY < 0) {
      if (scale > cardNum * -1 + 3) setScale(scale - 1);
    } else {
      if (scale < cardNum - 3) setScale(scale + 1);
    }
  };

  const styleName = "card" + scale.toString();




  return (
    <>
      <div style={{backgroundColor:`#${color1}`}}>
        <Image
          className={styles.homepage}
          src={img}
          alt="Person sleeping peacefully"
        />
        <div className={styles.titleFont} >
          <h1 >Discover the hidden paths to your future.</h1>
          <br/>
          <p className={styles.description}>Have you ever wondered what the future holds? Our innovative platform 
            harnesses the power of data and advanced algorithms 
            to analyze these elements and provide you with personalized insights into your potential future.
          <br/> <br/> Uncover hidden patterns, identify opportunities, and make informed decisions. Your journey to tomorrow starts here.</p>
          </div>
      </div>

      <div style={{ textAlign: "center", marginTop: '3rem' }}>
        {/* div containing only space */}
      </div>

      <div style = {{
        position: 'relative',
        width: '800px',
        height: '600px',
        top: '100%',
        margin: 'auto'
      }}>
         <div 
          style={{
            width: '70rem',
            height: '50rem',
            overflow: 'hidden',
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translate(-50%, 10%)',
            // backgroundColor: 'green'
          }}
            onWheel={handleWheel}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
            >



            <div className={styles['card'+(scale+0).toString()]  ? styles['card'+(scale+0).toString()] : styles['emptyCard']}
              style={{
                transition: `transform ${topSpeed}s ease-in-out`
              }}
            >
              <div style={{ display: styles['card'+(scale).toString()]  ? 'block' : 'none' }}>
                
                <div >
                  
                  <div  style={{backgroundColor:`#${color1}`}} className={styles.imageContainer}>
                  <Image
                    
                    className={styles.titleImg1}
                    src={img}
                    alt="Person sleeping peacefully"
                    
                  />
                  <h1 className={styles.subtitleFont}>Exam Prediction</h1>
                  {/* <div style={{  height:'2rem' }}></div> */}
                  <p className={styles.presentation}>
                    {" "}
                    By analyzing your unique study patterns <br/>
                    and past performance, it provides tailored insights <br/>
                    and predictions to help you optimize your preparation. <br/>
                    Discover your strengths, identify areas for <br/>
                    improvement, and gain a competitive edge.
                    </p>
                    <div className={styles.centerDiv}>
                      <Button
                        style={{backgroundColor:`#${color1}`}}
                        className={styles.gradientButton}
                        type="primary"
                        onClick={handleSubmitExam}
                      >
                        Get a glimpse into my exam success!
                      </Button>
                    </div>
                  
                </div>
                </div>
                
              </div>
            </div>






            <div className={styles['card'+(scale+1).toString()]  ? styles['card'+(scale+1).toString()] : styles['emptyCard']}
              style={{
              transition: `transform ${topSpeed}s ease-in-out`
              }}
            >
              <div style={{ display: styles['card'+(scale+1).toString()]  ? 'block' : 'none' }}>
                  
                <div >
                  
                  <div  style={{backgroundColor:`#${color2}`}} className={styles.imageContainer}>
                  <Image
                    
                    className={styles.titleImg1}
                    src={img}
                    alt="Person sleeping peacefully"
                    
                  />
                  <h1 className={styles.subtitleFont}>Popularity Test</h1>
                  {/* <div style={{  height:'2rem' }}></div> */}
                  <p className={styles.presentation}>
                    {" "}
                    Unleash your inner superstar! <br/>
                    Our AI-powered tool reveals your online <br/>
                    popularity potential, giving you the insights <br/>
                    you need to dominate social media.
                    </p>
                    <div className={styles.centerDiv}>
                      <Button
                        style={{backgroundColor:`#${color2}`}}
                        className={styles.gradientButton}
                        type="primary"
                        onClick={handleSubmitPopularity}
                      >
                        Discover your online stardom potential now!
                      </Button>
                    </div>
                  
                </div>
                </div>
                
              </div>
            </div>





            <div className={styles['card'+(scale+2).toString()]  ? styles['card'+(scale+2).toString()] : styles['emptyCard']}
              style={{
                transition: `transform ${topSpeed}s ease-in-out`
              }}
            >
              <div style={{ display: styles['card'+(scale+1).toString()]  ? 'block' : 'none' }}>
                  
                <div >
                  
                  <div  style={{backgroundColor:`#${color3}`}} className={styles.imageContainer}>
                  <Image
                    
                    className={styles.titleImg1}
                    src={img}
                    alt="Person sleeping peacefully"
                    
                  />
                  <h1 className={styles.subtitleFont}>Dream Interpretation</h1>
                  {/* <div style={{  height:'2rem' }}></div> */}
                  <p className={styles.presentation}>
                    {" "}
                    Our AI-powered app analyzes user dreams<br/>  
                    and provides symbolic interpretations  <br/>
                    based on extensive dream databases.
                    </p>
                    <div className={styles.centerDiv}>
                      <Button
                        style={{backgroundColor:`#${color3}`}}
                        className={styles.gradientButton}
                        type="primary"
                        onClick={handleSubmitChatbot}
                      >
                        Unlock the hidden meanings in my dreams
                      </Button>
                    </div>
                  
                </div>
                </div>
                
              </div>
            </div>






            <div className={styles['card'+(scale+3).toString()]  ? styles['card'+(scale+3).toString()] : styles['emptyCard']}
              style={{
                transition: `transform ${topSpeed}s ease-in-out`
              }}
            >
              <div style={{ display: styles['card'+(scale+3).toString()]  ? 'block' : 'none' }}>
                  
                <div >
                  
                  <div  style={{backgroundColor:`#${color2}`}} className={styles.imageContainer}>
                  <Image
                    
                    className={styles.titleImg1}
                    src={img}
                    alt="Person sleeping peacefully"
                    
                  />
                  <h1 className={styles.subtitleFont}>Coming soon</h1>
                  {/* <div style={{  height:'2rem' }}></div> */}
                  <p className={styles.presentation}>
                    {" "}
                    txt txt txt txt <br />
                    txt txt txt
                    <br />
                    txt txt
                    <br />
                    txt
                    </p>
                    <div className={styles.centerDiv}>
                      <Button
                        style={{backgroundColor:`#${color2}`}}
                        className={styles.gradientButton}
                        type="primary"
                        onClick={handleSubmitChatbot}
                      >
                        try our dream interpretetion bot
                      </Button>
                    </div>
                  
                </div>
                </div>
              </div>
            </div>
          




          
            <div className={styles['card'+(scale+4).toString()]  ? styles['card'+(scale+4).toString()] : styles['emptyCard']}
              style={{
                transition: `transform ${topSpeed}s ease-in-out`
              }}
            >
              <div style={{ display: styles['card'+(scale+4).toString()]  ? 'block' : 'none' }}>
                  
                <div >
                  
                  <div  style={{backgroundColor:`#${color1}`}} className={styles.imageContainer}>
                  <Image
                    
                    className={styles.titleImg1}
                    src={img}
                    alt="Person sleeping peacefully"
                    
                  />
                  <h1 className={styles.subtitleFont}>Coming soon</h1>
                  {/* <div style={{  height:'2rem' }}></div> */}
                  <p className={styles.presentation}>
                    {" "}
                    txt txt txt txt <br />
                    txt txt txt
                    <br />
                    txt txt
                    <br />
                    txt
                    </p>
                    <div className={styles.centerDiv}>
                      <Button
                        style={{backgroundColor:`#${color1}`}}
                        className={styles.gradientButton}
                        type="primary"
                        onClick={handleSubmitChatbot}
                      >
                        try our dream interpretetion bot
                      </Button>
                    </div>
                  
                </div>
                </div>
                
              </div>
            </div>

 
          </div>
      
      </div>
     
    </>
  );
};

export default PageDisplay;

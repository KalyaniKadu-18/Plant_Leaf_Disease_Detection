import React, { useState, useEffect } from "react";
import styles from "./History.module.css";
import bgimg from "../../assets/home_bg_img.jpg";

function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("predictionHistory")) || [];
    setData(savedHistory);
  }, []);

  return (
    <div className={styles.HistoryWrapper}>
      <img src={bgimg} alt="History Background" className={styles.bgimg} />
      <div className={styles.HistoryWrapper2}>
        <h1 className={styles.MainHeading}>History</h1>

        {data.length === 0 ? (
          <p>No Data Found</p>
        ) : (
          <ul>
            {data.map((item, index) => (
              <li className={styles.HistoryList} key={index}>
                <img
                  src={item.image}
                  alt={`prediction${index}`}
                  className={styles.historyImage}
                />
                <div className={styles.resultHistory}>
                  <h2>Prediction:</h2>
                  <span className={styles.result}>{item.prediction}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default History;

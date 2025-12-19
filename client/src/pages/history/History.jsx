import React, { useState } from 'react';
import styles from './History.module.css';
import bgimg from '../../assets/home_bg_img.jpg';
import { Link } from 'react-router-dom';

function History() {
  const [data, setData] = useState([]);

  return (
    <div className={styles.HistoryWrapper}>
      <img src={bgimg} alt="HistoryBgimg" className={styles.bgimg} />
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
                id="historyImage"
              />

              <p id="resultHistory">
                <h1>Prediction :</h1>
                <span id="historySpan"></span>

                <Link
                  to={`explore?prediction=${encodeURIComponent(
                    item.prediction
                  )}`}
                >
                  <span id="result">{item.prediction}</span>
                </Link>
              </p>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}

export default History;

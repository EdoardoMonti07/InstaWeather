import { useState } from "react";
import styles from "./Picker.module.css";
import { useWeather } from "../contexts/WeatherContext";

function TimePicker() {
  const { selTime, dispatch } = useWeather();

  const [isOpen, setIsOpen] = useState(false);

  const times = [
    "00 : 00",
    " 03 : 00",
    "06 : 00",
    "09 : 00",
    "12 : 00",
    " 15 : 00",
    "18 : 00",
    "21 : 00",
  ];

  return (
    <div>
      <div className={styles.picker} onClick={() => setIsOpen(!isOpen)}>
        <span>{selTime ? selTime : "Select Time"}</span>
        <svg className="picker-icon" width="12" height="8" viewBox="0 0 12 8">
          <path
            className="svg-arrow-path-time"
            d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z"
          />
        </svg>
      </div>
      <div className={`${styles.pickerOptions} ${!isOpen && "hidden"}`}>
        <div
          className={`${styles.timeOptionsContainer} ${styles.optionsContainer}`}
        >
          {times.map((time) => (
            <div
              className={styles.option}
              key={time}
              onClick={() => {
                dispatch({ type: "selTime/changed", payload: time });
                setIsOpen(false);
              }}
            >
              {time}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimePicker;

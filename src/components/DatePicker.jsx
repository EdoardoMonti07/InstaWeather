import { useEffect, useState } from "react";
import styles from "./Picker.module.css";
import { useWeather } from "../contexts/WeatherContext";

function DatePicker() {
  const { selDate, dispatch } = useWeather();
  const [isOpen, setIsOpen] = useState(false);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const newDates = [];
    const datesLength = 5;
    for (let i = 0; i < datesLength; i++) {
      const date = new Date();

      date.setDate(date.getDate() + i);
      const formattedDate = `${date.getFullYear()} - ${String(
        date.getMonth() + 1
      ).padStart(2, "0")} - ${String(date.getDate()).padStart(2, "0")}`;
      newDates.push(formattedDate);
    }
    setDates(["Today", ...newDates]);
  }, []);

  return (
    <div>
      <div className={styles.picker} onClick={() => setIsOpen(!isOpen)}>
        <span>{selDate ? selDate : "Select Date"}</span>
        <svg
          className={styles.pickerIcon}
          width="12"
          height="8"
          viewBox="0 0 12 8"
        >
          <path
            className="svg-arrow-path-date"
            d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z"
          />
        </svg>
      </div>
      <div className={`${styles.pickerOptions} ${!isOpen && "hidden"}`}>
        <div
          className={`${styles.dateOptionsContainer} ${styles.optionsContainer}`}
        >
          {dates.map((date) => (
            <div
              className={styles.option}
              key={date}
              onClick={() => {
                {
                  dispatch({ type: "selDate/changed", payload: date });
                  setIsOpen(false);
                }
              }}
            >
              {date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DatePicker;

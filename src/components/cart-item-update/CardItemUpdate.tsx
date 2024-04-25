import { FC, useEffect, useState } from "react";
import { translateDays } from "../../translateDays";

import RowUpdate from "../row-update/RowUpdate";

import "./CardItemUpdate.scss";

import { ILesson } from "../../hooks/defaultData";

export interface ICardItemUpdate {
  day: string;
  dayData: ILesson[];
  checkChangeValue: () => void;
}

const CardItemUpdate: FC<ICardItemUpdate> = ({
  day,
  dayData,
  checkChangeValue,
}) => {
  const [currentData, setCurrentData] = useState<Array<ILesson>>(dayData);

  const changeDataHandler = (
    time: string,
    numerator: string,
    denominator: string,
    index: number
  ): void => {
    if (
      time !== dayData[index]?.time ||
      numerator !== dayData[index].lesson?.numerator ||
      denominator !== dayData[index].lesson?.denominator
    ) {
      checkChangeValue();

      let _temp = currentData;

      _temp.splice(index, 1, {
        time,
        lesson: { numerator, denominator },
      });

      setCurrentData(_temp);
      return localStorage.setItem(`${day}-update`, JSON.stringify(_temp));
    }

    // return localStorage.removeItem(`${day}-update`);
  };

  const plusRowHandler = (index: number): void => {
    if (index < 6) {
      checkChangeValue();

      setCurrentData((state) => [
        ...state,
        { time: "", lesson: { numerator: "", denominator: "" } },
      ]);
    }

    if (index >= 6) alert("Нельзя добавлять больше шести строк");
  };

  const deleteRowHandler = (): void => {
    checkChangeValue();

    setCurrentData((state) => {
      const [...all] = state;

      all.pop();

      return all;
    });
  };

  useEffect(() => {
    return localStorage.setItem(`${day}-update`, JSON.stringify(currentData));
  }, [currentData, day]);

  return (
    <div className={"card-item-update"}>
      <div className="card-update-day">{translateDays[day]}</div>

      <div
        className={
          currentData.length > 4 ? "card-update-data big" : "card-update-data"
        }
      >
        {currentData.map((row, index) => {
          return (
            <div className="data-update-row" key={index}>
              <RowUpdate
                row={row}
                index={index}
                len={currentData.length - 1}
                changeDataHandler={changeDataHandler}
                plusRowHandler={plusRowHandler}
                deleteRowHandler={deleteRowHandler}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardItemUpdate;

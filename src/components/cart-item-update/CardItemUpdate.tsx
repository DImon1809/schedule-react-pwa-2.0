import {
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from "react";
import { translateDays } from "../../translateDays";

import alertStore from "../../stores/alert-store";

import RowUpdate from "../row-update/RowUpdate";

import "./CardItemUpdate.scss";

import { ILesson } from "../../hooks/defaultData";

export interface ICardItemUpdate {
  day: string;
  dayData: ILesson[];
  cancel: boolean;
  setCancel: Dispatch<SetStateAction<boolean>>;
  checkChangeValue: () => void;
}

const CardItemUpdate: FC<ICardItemUpdate> = ({
  day,
  dayData,
  cancel,
  setCancel,
  checkChangeValue,
}) => {
  const [currentData, setCurrentData] = useState<Array<ILesson>>(dayData);

  const changeDataHandler = useCallback(
    (
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
    },
    [checkChangeValue, day, dayData, currentData]
  );

  const plusRowHandler = (index: number): void => {
    if (index < 6) {
      checkChangeValue();

      setCurrentData((state) => [
        ...state,
        { time: "", lesson: { numerator: "", denominator: "" } },
      ]);
    }

    // if (index >= 6) alert("Нельзя добавлять больше шести строк");
    if (index >= 6)
      alertStore.openSetText(true, "Нельзя добавлять больше шести строк!");
  };

  const deleteRowHandler = (): void => {
    checkChangeValue();

    setCurrentData((state) => {
      const [...all] = state;

      if (all.length === 1) {
        localStorage.removeItem(`${day}-update`);

        return [{ time: "", lesson: { numerator: "", denominator: "" } }];
      }

      all.pop();

      return all;
    });
  };

  useEffect(() => {
    return localStorage.setItem(`${day}-update`, JSON.stringify(currentData));
  }, [currentData, day]);

  useEffect(() => {
    if (cancel) {
      const _currentData = JSON.parse(localStorage.getItem(day) || "[]");

      setCurrentData(
        _currentData.length
          ? _currentData
          : [{ time: "", lesson: { numerator: "", denominator: "" } }]
      );
    }
  }, [cancel, day]);

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
                day={day}
                row={row}
                index={index}
                len={currentData.length - 1}
                cancel={cancel}
                setCancel={setCancel}
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

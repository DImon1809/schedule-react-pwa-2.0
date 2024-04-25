import { FC } from "react";
import { translateDays } from "../../translateDays";

import DataRow from "../data-row/DataRow";

import "./CardItem.scss";

import { ILesson } from "../../hooks/defaultData";

export interface ICardItem {
  day: string;
  dayData: Array<ILesson>;
  mainNumerator: boolean;
  mainDenominator: boolean;
}

const CardItem: FC<ICardItem> = ({
  day,
  dayData,
  mainNumerator,
  mainDenominator,
}) => {
  return (
    <div className="card-item">
      <div className="card-day">{translateDays[day]}</div>
      <div className={dayData.length > 4 ? "card-data big" : "card-data"}>
        {dayData.map((data, index) => (
          <DataRow
            key={index}
            data={data}
            mainNumerator={mainNumerator}
            mainDenominator={mainDenominator}
          />
        ))}
      </div>
    </div>
  );
};

export default CardItem;

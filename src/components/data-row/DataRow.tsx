import { FC, useState } from "react";

import { ILesson } from "../../hooks/defaultData";

export interface IDataRow {
  data: ILesson;
  mainNumerator: boolean;
  mainDenominator: boolean;
}

const DataRow: FC<IDataRow> = ({ data, mainNumerator, mainDenominator }) => {
  const [len] = useState<number>(
    `${data.lesson?.numerator} ${data.lesson?.denominator}`.split("").length
  );

  const [lenNumerator] = useState<number>(
    `${data.lesson?.numerator}`.split("").length
  );

  const [lenDenominator] = useState<number>(
    `${data.lesson?.denominator}`.split("").length
  );

  return (
    <div className="data-row">
      <div
        className={
          mainNumerator && data.lesson?.numerator
            ? "time numerator"
            : mainDenominator && data.lesson?.denominator
            ? "time denominator"
            : "time"
        }
      >
        {data.time}
      </div>
      <div
        // className={
        //   len > 180 || lenNumerator > 80 || lenDenominator > 80
        //     ? "lesson big"
        //     : "lesson"
        // }

        className="lesson"
        // className={lenNumerator > 80 || lenDenominator > 80 ? le}
      >
        <div
          className={
            mainNumerator
              ? "numerator active"
              : mainDenominator
              ? "numerator unactive"
              : lenNumerator > 80
              ? "numerator big"
              : "numerator"
          }
        >
          {data.lesson?.numerator}
        </div>
        <div
          className={
            mainDenominator
              ? "denominator active"
              : mainNumerator
              ? "denominator unactive"
              : lenDenominator > 80
              ? "denominator big"
              : "denominator"
          }
        >
          {data.lesson?.denominator}
        </div>
      </div>
    </div>
  );
};

export default DataRow;

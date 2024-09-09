import { FC, useState } from "react";

import { ILesson } from "../../hooks/defaultData";

export interface IDataRow {
  data: ILesson;
  mainNumerator: boolean;
  mainDenominator: boolean;
}

const DataRow: FC<IDataRow> = ({ data, mainNumerator, mainDenominator }) => {
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
      <div className="lesson">
        <div
          className={
            mainNumerator
              ? "numerator active"
              : mainDenominator
              ? "numerator unactive"
              : lenNumerator > 74
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
              : lenDenominator > 74
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

import { FC, useState, useEffect } from "react";

import { ILesson } from "../../hooks/defaultData";

import plus from "../../images/plus.png";
import minus from "../../images/minus.png";

export interface IRowUpdate {
  row: ILesson;
  index: number;
  len: number;
  changeDataHandler: (
    time: string,
    numerator: string,
    denominator: string,
    index: number
  ) => void;

  plusRowHandler: (index: number) => void;
  deleteRowHandler: () => void;
}

const RowUpdate: FC<IRowUpdate> = ({
  row,
  index,
  len,
  changeDataHandler,
  plusRowHandler,
  deleteRowHandler,
}) => {
  const [time, setTime] = useState<string>(row?.time || "");
  const [numerator, setNumerator] = useState<string>(
    row.lesson?.numerator || ""
  );
  const [denominator, setDenominator] = useState<string>(
    row.lesson?.denominator || ""
  );

  useEffect(() => {
    const handler = setTimeout(
      () => changeDataHandler(time, numerator, denominator, index),
      400
    );

    return () => clearTimeout(handler);
  }, [time, numerator, denominator]);

  return (
    <>
      <textarea
        className="update-time"
        value={time}
        onChange={(event) => setTime(event.target.value)}
      />

      <div className="update-lesson">
        <textarea
          className="update-numerator"
          value={numerator}
          onChange={(event) => setNumerator(event.target.value)}
        />

        <textarea
          className="update-denominator"
          value={denominator}
          onChange={(event) => setDenominator(event.target.value)}
        />

        {len === index && (
          <div className="buttons">
            <img
              src={plus}
              alt="#"
              className="plus"
              onClick={() => plusRowHandler(++index)}
            />
            <img
              src={minus}
              alt="#"
              className="minus"
              onClick={deleteRowHandler}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default RowUpdate;

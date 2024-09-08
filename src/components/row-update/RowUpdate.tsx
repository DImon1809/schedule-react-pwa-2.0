import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";

import { ILesson } from "../../hooks/defaultData";

import plus from "../../assets/plus.webp";
import minus from "../../assets/minus.webp";

export interface IRowUpdate {
  day: string;
  row: ILesson;
  index: number;
  len: number;
  cancel: boolean;
  setCancel: Dispatch<SetStateAction<boolean>>;
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
  day,
  row,
  index,
  len,
  cancel,
  setCancel,
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
  }, [time, numerator, denominator, changeDataHandler, index]);

  useEffect(() => {
    if (!row.time && !row.lesson?.numerator && !row.lesson?.denominator) {
      setTime("");
      setNumerator("");
      setDenominator("");
    }

    if (cancel) {
      setTime(row.time || "");
      setNumerator(row.lesson?.numerator || "");
      setDenominator(row.lesson?.denominator || "");
    }
  }, [row, cancel]);

  return (
    <>
      <textarea
        id={`time-${day}-${index}`}
        className="update-time"
        value={time}
        onChange={(event) => {
          cancel && setCancel(false);

          setTime(event.target.value);
        }}
      />

      <div className="update-lesson">
        <textarea
          id={`numerator-${day}-${index}`}
          className="update-numerator"
          value={numerator}
          onChange={(event) => {
            cancel && setCancel(false);

            setNumerator(event.target.value);
          }}
        />

        <textarea
          id={`denominator-${day}-${index}`}
          className="update-denominator"
          value={denominator}
          onChange={(event) => {
            cancel && setCancel(false);

            setDenominator(event.target.value);
          }}
        />

        {len === index && (
          <div className="buttons">
            <img
              src={plus}
              alt="#"
              className="plus"
              onClick={() => {
                cancel && setCancel(false);

                plusRowHandler(++index);
              }}
            />
            <img
              src={minus}
              alt="#"
              className="minus"
              onClick={() => {
                cancel && setCancel(false);

                deleteRowHandler();
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default RowUpdate;

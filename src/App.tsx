import { FC, useEffect, useState, useCallback } from "react";

import { useWriteDefaultData } from "./hooks/useWriteDefaultData";
import { useUpdateData } from "./hooks/useUpdateData";

import CardItem from "./components/card-item/CardItem";
import CardItemUpdate from "./components/cart-item-update/CardItemUpdate";
import Navigation from "./components/navigation/Navigation";
import Loading from "./components/loading/Loading";

import "./App.scss";

const App: FC = () => {
  const { writeDefaultData } = useWriteDefaultData();
  const { days } = useUpdateData();

  const [edit, setEdit] = useState<boolean>(false);
  const [checkValue, setCheckValue] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [mainNumerator, setMainNumerator] = useState<boolean>(false);
  const [mainDenominator, setMainDenominator] = useState<boolean>(false);

  const changeNumerator = (active?: boolean): void => {
    if (active === false) {
      return setMainNumerator(false);
    }

    return setMainNumerator(!mainNumerator);
  };

  const changeDenominator = (active?: boolean): void => {
    if (active === false) {
      return setMainDenominator(false);
    }

    return setMainDenominator(!mainDenominator);
  };

  const openEditPage = (open?: boolean): void => {
    if (open === false) {
      setCheckValue(false);
      return setEdit(false);
    }

    setCheckValue(false);
    return setEdit(!edit);
  };

  const checkChangeValue = useCallback((active?: boolean): void => {
    if (active === false) return setCheckValue(false);

    return setCheckValue(true);
  }, []);

  useEffect(() => {
    writeDefaultData();
  }, [writeDefaultData]);

  useEffect(() => {
    if (loading) {
      setTimeout(() => setLoading(!loading), 2000);
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navigation
            openEditPage={openEditPage}
            edit={edit}
            checkValue={checkValue}
            checkChangeValue={checkChangeValue}
            changeNumerator={changeNumerator}
            changeDenominator={changeDenominator}
          />

          <div className="card-items">
            {days.map((keyDay, index) => {
              let dayData = JSON.parse(localStorage.getItem(keyDay) || "[]");

              if (dayData.length && !edit)
                return (
                  <CardItem
                    key={index}
                    day={keyDay}
                    dayData={dayData}
                    mainNumerator={mainNumerator}
                    mainDenominator={mainDenominator}
                  />
                );

              if (!dayData.length && edit)
                return (
                  <CardItemUpdate
                    key={index}
                    day={keyDay}
                    checkChangeValue={checkChangeValue}
                    dayData={[
                      { time: "", lesson: { numerator: "", denominator: "" } },
                    ]}
                  />
                );

              if (edit)
                return (
                  <CardItemUpdate
                    key={index}
                    day={keyDay}
                    checkChangeValue={checkChangeValue}
                    dayData={dayData}
                  />
                );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default App;

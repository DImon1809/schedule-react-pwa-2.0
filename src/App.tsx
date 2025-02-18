import "./App.scss";

import { FC, useCallback, useEffect, useState } from "react";

import AlertWindow from "./components/alert-window/AlertWindow";
import CardItem from "./components/card-item/CardItem";
import CardItemUpdate from "./components/cart-item-update/CardItemUpdate";
import Loading from "./components/loading/Loading";
import Navigation from "./components/navigation/Navigation";
import { useUpdateData } from "./hooks/useUpdateData";
import { useWriteDefaultData } from "./hooks/useWriteDefaultData";

const App: FC = () => {
  const { writeDefaultData } = useWriteDefaultData();
  const { days } = useUpdateData();

  const [edit, setEdit] = useState<boolean>(false);
  const [cancel, setCancel] = useState<boolean>(false);
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
            isCancel={cancel}
            setCancel={setCancel}
            checkChangeValue={checkChangeValue}
            changeNumerator={changeNumerator}
            changeDenominator={changeDenominator}
          />

          <div className="card-items">
            {days.map((keyDay, index) => {
              const dayData = JSON.parse(localStorage.getItem(keyDay) || "[]");

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
                    cancel={cancel}
                    setCancel={setCancel}
                    checkChangeValue={checkChangeValue}
                    dayData={[{ time: "", lesson: { numerator: "", denominator: "" } }]}
                  />
                );

              if (edit)
                return (
                  <CardItemUpdate
                    key={index}
                    day={keyDay}
                    cancel={cancel}
                    setCancel={setCancel}
                    checkChangeValue={checkChangeValue}
                    dayData={dayData}
                  />
                );

              return null;
            })}
          </div>

          <AlertWindow />
        </>
      )}
    </>
  );
};

export default App;

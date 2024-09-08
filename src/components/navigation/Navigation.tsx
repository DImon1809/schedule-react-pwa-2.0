import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { useUpdateData } from "../../hooks/useUpdateData";

import menu from "../../assets/menu.webp";
import check from "../../assets/check.webp";
import checkTrue from "../../assets/check-true.webp";
import cancel from "../../assets/cancel.webp";
import cancelTrue from "../../assets/cancel-true.webp";

import "./Navigation.scss";

export interface INavigation {
  edit: boolean;
  checkValue: boolean;
  isCancel: boolean;
  setCancel: Dispatch<SetStateAction<boolean>>;
  openEditPage: (open?: boolean) => void;
  checkChangeValue: (active?: boolean) => void;
  changeNumerator: (active?: boolean) => void;
  changeDenominator: (active?: boolean) => void;
}

const Navigation: FC<INavigation> = ({
  openEditPage,
  edit,
  checkValue,
  isCancel,
  setCancel,
  checkChangeValue,
  changeNumerator,
  changeDenominator,
}) => {
  const { updateData } = useUpdateData();

  const [active, setActive] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);

      checkChangeValue(false);
    }
  }, [alert, checkChangeValue]);

  return (
    <nav>
      <h3 className={alert ? "alert active" : "alert"}>
        {isCancel ? "Изменения отменены!" : "Данные были успешно изменены!"}
      </h3>
      <div className={active ? "items-wrapper active" : "items-wrapper"}>
        <ul>
          <li
            onClick={() => {
              changeDenominator(false);
              changeNumerator(false);

              openEditPage(false);
              setActive(false);
            }}
          >
            Все предметы
          </li>
          <li
            onClick={() => {
              changeDenominator(false);

              changeNumerator();

              setActive(false);
            }}
          >
            Числитель
          </li>
          <li
            onClick={() => {
              changeNumerator(false);

              changeDenominator();

              setActive(false);
            }}
          >
            Знаменатель
          </li>
          <li
            onClick={() => {
              changeDenominator(false);
              changeNumerator(false);

              openEditPage();
              setActive(false);
            }}
          >
            Редактировать
          </li>
        </ul>
      </div>

      <div className="icons-wrapper">
        <div className="edit-icons">
          <img
            src={cancel}
            alt="#"
            className={edit && !checkValue ? "cancel visible" : "cancel"}
          />
          <img
            src={cancelTrue}
            alt="#"
            className={edit && checkValue ? "cancel-true visible" : "cancel"}
            onClick={() => {
              setCancel(true);
              setAlert(true);
            }}
          />

          <img
            src={check}
            alt="#"
            className={edit && !checkValue ? "check visible" : "check"}
          />
          <img
            src={checkTrue}
            alt="#"
            className={edit && checkValue ? "check-true visible" : "check-true"}
            onClick={() => {
              setAlert(true);
              updateData();
            }}
          />
        </div>

        <img
          src={menu}
          alt="#"
          className={active ? "menu active" : "menu"}
          onClick={() => setActive(!active)}
        />
      </div>

      <div
        className={active ? "wrapper active" : "wrapper"}
        onClick={() => setActive(false)}
      ></div>
    </nav>
  );
};

export default Navigation;

import { FC, useState, useEffect } from "react";
import { useUpdateData } from "../../hooks/useUpdateData";

import menu from "../../images/menu.png";
import check from "../../images/check.png";
import checkTrue from "../../images/check-true.png";

import "./Navigation.scss";

export interface INavigation {
  edit: boolean;
  checkValue: boolean;
  openEditPage: (open?: boolean) => void;
  checkChangeValue: (active?: boolean) => void;
  changeNumerator: (active?: boolean) => void;
  changeDenominator: (active?: boolean) => void;
}

const Navigation: FC<INavigation> = ({
  openEditPage,
  edit,
  checkValue,
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
        Данные были успешно изменены!
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

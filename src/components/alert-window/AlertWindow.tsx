import "./AlertWindow.scss";

import { observer } from "mobx-react-lite";
import { FC, useEffect,useState } from "react";

import alertStore from "../../stores/alert-store";

const AlertWindow: FC = observer(() => {
  const [isClosure, setIsClosure] = useState<boolean>(false);

  useEffect(() => {
    if (alertStore.isOpenAlert) {
      setTimeout(() => {
        setIsClosure(true);
      }, 2000);

      setTimeout(() => {
        alertStore.openSetText(false, "Внимание!");
      }, 3000);

      return setIsClosure(false);
    }
  }, [alertStore.isOpenAlert]);

  return (
    <div
      className={
        alertStore.isOpenAlert
          ? isClosure
            ? "alert-window open closure"
            : "alert-window open"
          : "alert-window"
      }
    >
      <p>{alertStore.alertText}</p>
    </div>
  );
});

export default AlertWindow;

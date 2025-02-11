import "./Loading.scss";

import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="loading">
      <h3>Загрузка</h3>
      <div className="loading-wrapper">
        <span className="l-1"></span>
        <span className="l-2"></span>
        <span className="l-3"></span>
        <span className="l-4"></span>
        <span className="l-5"></span>
      </div>
    </div>
  );
};

export default Loading;

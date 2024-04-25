import { data } from "./defaultData";

export const useWriteDefaultData = () => {
  const writeDefaultData = () => {
    for (let i = 0; i < data.length; i++) {
      if (!localStorage.getItem(data[i].day)) {
        localStorage.setItem(data[i].day, JSON.stringify(data[i].lessons));
      }
    }
  };

  return { writeDefaultData };
};

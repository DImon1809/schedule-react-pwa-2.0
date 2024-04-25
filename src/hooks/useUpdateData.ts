import { ILesson } from "./defaultData";

const days: Array<string> = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const useUpdateData = () => {
  const updateData = () => {
    for (let i = 0; i < days.length; i++) {
      const _temp: Array<ILesson> = JSON.parse(
        localStorage.getItem(`${days[i]}-update`) || "[]"
      );

      if (
        _temp.length &&
        (_temp[0].time ||
          _temp[0].lesson?.denominator ||
          _temp[0].lesson?.numerator)
      ) {
        localStorage.setItem(`${days[i]}`, JSON.stringify(_temp));
      }

      if (
        !_temp[0].time &&
        !_temp[0].lesson?.denominator &&
        !_temp[0].lesson?.numerator
      )
        localStorage.setItem(`${days[i]}`, JSON.stringify([]));
    }
  };

  return { updateData, days };
};

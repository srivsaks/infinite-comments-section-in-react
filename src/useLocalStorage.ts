import { useEffect, useState } from "react";

export const useLocalStorage = ({ defaultValue, key }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const data = localStorage.getItem(key);
    if (data) {
      setValue(JSON.parse(data));
    } else {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      setValue(defaultValue);
    }
  }, []);

  const setStorage = (data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    setValue(data);
  };

  return [value, setStorage];
};

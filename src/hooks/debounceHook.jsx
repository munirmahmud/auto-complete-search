import { useEffect, useState } from "react";

export const useDebounce = (value, timeout, callback) => {
  const [timer, setTimer] = useState("");

  const clearTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    clearTimer();

    if (value && callback) {
      const newTimer = setTimeout(callback, timeout);
      setTimer(newTimer);
    }
  }, [value]);
};

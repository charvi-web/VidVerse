import { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [direction, setDirection] = useState("up");

  useEffect(() => {
    let last = window.scrollY;

    const handle = () => {
      const current = window.scrollY;

      if (current > last) {
        setDirection("down");
      } else {
        setDirection("up");
      }

      last = current;
    };

    window.addEventListener("scroll", handle);

    return () =>
      window.removeEventListener("scroll", handle);
  }, []);

  return direction;
};

export default useScrollDirection;
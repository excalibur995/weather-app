import { useState } from "react";

function useToggle(defaultValue?: boolean) {
  const [value, setValue] = useState(!!defaultValue);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((x: boolean) => !x);
  return { value, setValue, setTrue, setFalse, toggle };
}

export default useToggle;

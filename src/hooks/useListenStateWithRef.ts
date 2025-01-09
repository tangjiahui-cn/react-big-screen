/**
 * useListenStateWithRef
 *
 * @author TangJiaHui
 * @date 2022.01.04
 * @description extend useEffect with useRef, which solved the closure problem, and listen state change.
 */
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import { useUpdateEffect } from "ahooks";

export function useListenStateWithRef<T = undefined>(
  state: T | (() => T),
): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T | undefined>] {
  const [value, setValue] = useState<T>(state);
  const valueRef = useRef<T>(value);
  valueRef.current = value;

  useUpdateEffect(() => {
    setValue(state);
  }, [state]);

  return [value, setValue, valueRef];
}

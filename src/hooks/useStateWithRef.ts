/**
 * useStateWithRef
 *
 * @author TangJiaHui
 * @date 2022.01.04
 * @description extend useEffect with useRef, which solved the closure problem.
 */
import { Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";

export function useStateWithRef<T = undefined>(
  initialState: T | (() => T),
): [T, Dispatch<SetStateAction<T>>, MutableRefObject<T | undefined>] {
  const [value, setValue] = useState<T>(initialState);
  const valueRef = useRef<T>(value);
  valueRef.current = value;

  return [value, setValue, valueRef];
}

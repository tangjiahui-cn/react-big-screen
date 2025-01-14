/**
 * useListenState
 *
 * @author TangJiaHui
 * @date 2022.01.14
 */
import { Dispatch, SetStateAction, useState } from "react";
import { useUpdateEffect } from "ahooks";

export function useListenState<T = undefined>(
  state: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(state);

  useUpdateEffect(() => {
    setValue(state);
  }, [state]);

  return [value, setValue];
}

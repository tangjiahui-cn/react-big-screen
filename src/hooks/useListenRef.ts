/**
 * useListenRef
 *
 * @author TangJiaHui
 * @date 2022.01.14
 */
import { useRef, MutableRefObject } from "react";

export function useListenRef<T = any>(state: T): MutableRefObject<T> {
  const ref = useRef(state);
  ref.current = state;
  return ref;
}

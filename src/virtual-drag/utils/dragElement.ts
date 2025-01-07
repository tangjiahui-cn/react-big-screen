/**
 * drag a element.
 *
 * @author tangjiahui
 * @date 2024/12/26
 */
type UnmountWatch = () => void;

type Payload = {
  isDragging: boolean;
};

type Options = {
  onStart?: (e: MouseEvent, payload: Payload) => void;
  onEnd?: (e: MouseEvent, payload: Payload) => void;
};

/**
 * dragElement
 *
 * @param dom bind dom.
 * @param options callback options
 * @description while try drag an element, listen which status.
 */
export function dragElement(dom: HTMLElement, options: Options): UnmountWatch {
  let isDragging = false;
  dom.addEventListener("mousedown", mousedown);

  function mousemove(e: MouseEvent) {
    if (isDragging) return;
    isDragging = true;
    options?.onStart?.(e, { isDragging });
  }

  function mousedown() {
    dom.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);
  }

  function mouseup(e: MouseEvent) {
    options?.onEnd?.(e, { isDragging });
    clearMove();
  }

  function clearMove() {
    if (!isDragging) return;
    isDragging = false;
    dom.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);
  }

  return () => {
    clearMove();
    dom.removeEventListener("mousedown", mousedown);
  };
}

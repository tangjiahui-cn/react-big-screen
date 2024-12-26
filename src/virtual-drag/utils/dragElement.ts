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
 * @description while try drag a element, listen which status.
 */
export function dragElement(dom: HTMLElement, options: Options): UnmountWatch {
  let isDragging = false;
  dom.addEventListener('mousedown', mousedown);

  function mousemove(e: MouseEvent) {
    if (isDragging) return;
    isDragging = true;
    options?.onStart?.(e, { isDragging });
  }

  function mousedown() {
    dom.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', clean);
  }

  function clean(e: MouseEvent) {
    if (!isDragging) return;
    isDragging = false;
    dom.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', clean);
    options?.onEnd?.(e, { isDragging });
  }

  return () => {
    clean();
    dom.removeEventListener('mousedown', mousedown);
  };
}

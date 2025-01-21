/**
 * virtual drag data.
 *
 * @author tangjiahui
 * @date 2024/12/26
 */

export interface VirtualDragOptions {
  /** drag type */
  type?: string;
  /** drag carry data */
  data?: Record<string, any>;
}

export type DraggingChangeCallbackOptions = VirtualDragOptions & { isDragging: boolean };
export type DraggingChangeCallback = (options: DraggingChangeCallbackOptions) => void;
export type UnMountDraggingChangeCallback = () => void;

class VirtualDragData {
  private isDragging: boolean = false;
  private dragOptions: VirtualDragOptions = {
    type: "",
    data: undefined,
  };
  private draggingChangeCallback: DraggingChangeCallback[] = [];

  private notifyDraggingChange() {
    this.draggingChangeCallback.forEach((cb) => {
      cb({
        ...this.dragOptions,
        isDragging: this.isDragging,
      });
    });
  }

  // 监听拖拽变更
  public onDraggingChange(draggingCallback: DraggingChangeCallback): UnMountDraggingChangeCallback {
    this.draggingChangeCallback.push(draggingCallback);
    return () => {
      this.draggingChangeCallback = this.draggingChangeCallback.filter((cb) => {
        return cb !== draggingCallback;
      });
    };
  }

  // 设置拖拽中状态
  public setIsDragging(isDragging: boolean) {
    this.isDragging = isDragging;
    this.notifyDraggingChange();
  }

  // 获取拖拽中状态
  public getIsDragging() {
    return this.isDragging;
  }

  // 设置拖拽配置
  public setDragOptions(dragOptions: VirtualDragOptions, cover?: boolean) {
    if (cover) {
      this.dragOptions = {
        ...dragOptions,
      };
      return;
    }
    this.dragOptions = {
      ...this.dragOptions,
      ...dragOptions,
    };
  }

  // 获取拖拽配置
  public getDragOptions() {
    return this.dragOptions;
  }
}

export const virtualDragData = new VirtualDragData();

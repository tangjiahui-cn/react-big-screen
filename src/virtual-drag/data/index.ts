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

class VirtualDragData {
  private isDragging: boolean = false;
  private dragOptions: DragOptions = {
    type: '',
    data: undefined,
  };

  public setIsDragging(isDragging: boolean) {
    this.isDragging = isDragging;
  }

  public getIsDragging() {
    return this.isDragging;
  }

  public setDragOptions(dragOptions: DragOptions, cover?: boolean) {
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

  public getDragOptions() {
    return this.dragOptions;
  }
}

export const virtualDragData = new VirtualDragData();

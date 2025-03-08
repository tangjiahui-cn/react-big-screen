/**
 * HistoryRecord
 *
 * @author tangjiahui
 * @date 2025/3/4
 * @description 操作历史，可以回退指定历史记录。
 */
import { createUUID } from "@/engine";
import type {
  HistoryData,
  HistoryRecordItem,
  HistoryRecordListener,
  HistoryRecordListenerUnmount,
} from "./types";
import { cloneDeep } from "lodash-es";

export * from "./types";
export class HistoryRecord {
  private initData: any; // 初始化data（不在list中）
  private maxSize: number = 20; // 最大容量
  private list: HistoryRecordItem[] = []; // 历史记录列表(存储顺序：[new, ..., old])
  private currentIndex: number = -1; // 当前历史索引
  private listeners: HistoryRecordListener[] = []; // 监听器

  // 获取历史数据
  public getHistoryData(): HistoryData {
    return {
      maxSize: this.maxSize,
      list: this.getAll(),
      currentIndex: this.currentIndex,
      current: this.getCurrent(),
      isCanGoForward: !!(this.list.length && this.currentIndex), // 上一条，则currentIndex越小
      isCanGoLast: !!(this.list.length && this.currentIndex <= this.list.length - 1), // 下一条，则 currentIndex 越大
    };
  }

  // 触发事件
  private notifyListChange() {
    const historyData = this.getHistoryData();
    this.listeners.forEach((listener) => {
      listener(historyData);
    });
  }

  // 检查容量
  private checkCapacity(): boolean {
    // 值是否变化
    let isChanged = false;
    // 如果 currentIndex 在 maxSize之外，则重置currentIndex，删除isPass 为 false 的记录
    if (this.currentIndex >= this.maxSize) {
      this.currentIndex = 0;
      this.list = this.list.filter((item) => item.isPass);
      isChanged = true;
    }
    // 如果容量未超过，则不处理
    if (this.list.length <= this.maxSize) {
      return isChanged;
    }
    this.list = this.list.slice(0, this.maxSize);
    return true;
  }

  // 更新列表的isPass属性
  private updateIsPass(currentIndex: number) {
    this.list.forEach((item, index) => {
      item.isPass = index >= currentIndex;
    });
  }

  // 获取initData
  private getInitDataRecordItem(): HistoryRecordItem {
    return {
      stepId: "init",
      data: cloneDeep(this.initData),
      isPass: true,
    };
  }

  // 初始化
  public setInitData(initData: any) {
    this.initData = initData;
  }

  // 获取历史记录列表
  public getAll() {
    return this.list;
  }

  public getCurrent() {
    return this.list[this.currentIndex];
  }

  // 新增一条记录
  public add(data: any, description: string): HistoryRecordItem {
    const item: HistoryRecordItem = {
      data,
      isPass: true,
      stepId: createUUID(),
      description,
    };
    this.list = [item, ...this.list.filter((item) => item.isPass)];
    this.currentIndex = 0;
    // 监测容量（确保不超过最大容量）
    this.checkCapacity();
    this.notifyListChange();
    return item;
  }

  // 判断stepId是否已经passed
  public isPass(stepId?: string): boolean {
    if (!stepId) return false;
    return !!this.list.find?.((item) => item.stepId === stepId)?.isPass;
  }

  // 前往指定记录
  public go(stepId: string): HistoryRecordItem | undefined {
    let currentIndex = this.list.findIndex((item) => item.stepId === stepId);
    // 如果未找到，则不处理
    if (currentIndex < 0) {
      console.warn(`[history] stepId not found: ${stepId}.`);
      return;
    }
    // 更新 isPass
    this.updateIsPass((this.currentIndex = currentIndex));
    this.notifyListChange();
    return this.getCurrent();
  }

  // 前往上一条记录
  public goBack(): HistoryRecordItem["data"] | undefined {
    // 如果已经不在list中，则不处理
    if (this.currentIndex >= this.list.length) {
      return;
    }
    this.updateIsPass(++this.currentIndex);
    this.notifyListChange();
    return this.getCurrent() || this.getInitDataRecordItem();
  }

  // 前往下一条记录
  public goForward(): HistoryRecordItem | undefined {
    // 如果已经是最新一条，则不处理
    if (this.currentIndex <= 0) {
      return;
    }
    this.updateIsPass(--this.currentIndex);
    this.notifyListChange();
    return this.getCurrent();
  }

  // 设置最大容量
  public setMaxSize(maxSize: number = 0) {
    maxSize = Math.max(0, maxSize);
    // 需要判断是否影响修改列表 （修改容量 < 当前最大容量，也许会导致当前列表长度需要裁剪）
    const isNeedAdjustment = maxSize < this.maxSize;
    this.maxSize = maxSize;
    if (isNeedAdjustment && this.checkCapacity()) {
      this.notifyListChange();
    }
  }

  // 监听历史记录变化
  public onChange(callback: HistoryRecordListener): HistoryRecordListenerUnmount {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }
}

const historyRecord = new HistoryRecord();
export default historyRecord;

export type HistoryRecordListener = (data: HistoryData) => void;

export interface HistoryData {
  maxSize: number; // 最大存储容量
  list: HistoryRecordItem[]; // 历史记录列表
  currentIndex: number; // 当前历史索引
  current?: HistoryRecordItem; // 当前历史
  isCanGoLast: boolean; // 能否前往上一条记录
  isCanGoForward: boolean; // 能否前往下一条记录
}

export type HistoryRecordListenerUnmount = () => void;

export interface HistoryRecordItem {
  stepId: string; // 步骤id
  data: any; // 携带数据
  isPass: boolean; // 是否经过历史记录（即：当前位置 <= 头部位置）
  description?: string; // 描述
}

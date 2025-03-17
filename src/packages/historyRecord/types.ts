export type HistoryRecordListener = (data: HistoryData) => void;

export interface HistoryData {
  maxSize: number; // 最大存储容量
  list: HistoryRecordItem[]; // 历史记录列表
  currentIndex: number; // 当前历史索引
  current?: HistoryRecordItem; // 当前历史
  isCanGoForward: boolean; // 前进历史到更新记录
  isCanGoBack: boolean; // 后退历史到更旧记录
}

export type HistoryRecordListenerUnmount = () => void;

export interface HistoryRecordItem {
  stepId: string; // 步骤id
  data: any; // 携带数据
  isPass: boolean; // 是否经过历史记录（即：当前位置 <= 头部位置）
  description?: string; // 描述
}

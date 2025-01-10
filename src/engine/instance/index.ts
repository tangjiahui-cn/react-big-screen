/**
 * 运行时行为实例
 *
 * @author tangjiahui
 * @date 2024/12/25
 * @description 用来控制运行时的每个实例的各种行为，例如：鼠标经过、鼠标选中效果等。
 */
import { InstanceType } from "..";

export default class Instance {
  // instance总数量
  private size: number = 0;
  // 存储 id => instance 的映射
  private data: Record<string, InstanceType> = {};
  // 存储选中的实例列表
  private selectedInstances: InstanceType[] = [];

  /************************ 实例数据 ************************/
  // 注册一个实例
  public registerInstance(instance: InstanceType) {
    this.data[instance.id] = instance;
    this.size++;
  }

  // 取消注册一个实例
  public unregisterInstance(id: string) {
    delete this.data[id];
    this.size--;
  }

  // 获取单个实例
  public getInstance(id: string): InstanceType | null {
    return this.data[id];
  }

  // 获取全部实例
  public getAllInstance() {
    return Object.values(this.data);
  }

  /************************ 实例选中 ************************/
  // 查询id是否被选中
  public isSelected(id: string): boolean {
    return !!this.selectedInstances.find((instance) => instance.id === id);
  }

  // 取消选中所有选中实例
  public unSelectAllSelectedInstances() {
    this.selectedInstances.forEach((instance) => {
      instance.handleUnSelected();
    });
    this.selectedInstances = [];
  }

  // 获取所有选中实例
  public getAllSelectedInstances(): InstanceType[] {
    return this.selectedInstances;
  }

  // 获取所有选中实例的id
  public getAllSelectedInstanceIds(): string[] {
    return this.getAllSelectedInstances().map((x) => x.id);
  }

  // 新增一个选中实例
  public addSelectedInstance(instance: InstanceType) {
    this.selectedInstances.push(instance);
  }

  // 选中全部实例
  public selectedAllInstance() {
    const allInstance = this.getAllInstance();
    // 如果选中实例数量和总实例数量一样，则表示都选中或空，不必操作。
    if (allInstance.length === this.selectedInstances.length) {
      return;
    }

    // 所有实例选中
    allInstance.forEach((instance: InstanceType) => {
      instance.handleSelected(true);
    });

    // 复制选中实例
    this.selectedInstances = allInstance;
  }

  // 移出一个选中实例
  public removeSelectedInstance(id: string) {
    this.selectedInstances = this.selectedInstances.filter((instance) => {
      return instance.id !== id;
    });
  }
}

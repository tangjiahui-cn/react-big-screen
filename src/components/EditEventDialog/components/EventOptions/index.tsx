/**
 * EventOptions
 *
 * @author tangjiahui
 * @date 2025/2/11
 * @description 编辑event.target对象的options
 */
import VisibleOptions from "./VisibleOptions";
import RequestOptions from "./RequestOptions";
import CustomOptions from "./CustomOptions";
import CommonOptions from "./CommonOptions";
import {
  ComponentNodeEventTargetOpt,
  ComponentNodeEventTargetOption,
  INIT_EXPOSES,
} from "@/engine";
import IEmpty from "@/components/IEmpty";

export const selectWidth: number = 200;

interface Props {
  value?: ComponentNodeEventTargetOpt;
  onChange?: (value: ComponentNodeEventTargetOpt) => void;
}

export default function EventOptions(props: Props) {
  const options: ComponentNodeEventTargetOption | undefined = props?.value?.option;

  function handleChange(option: ComponentNodeEventTargetOption) {
    if (!props?.value) return;
    props?.onChange?.({
      ...props?.value,
      option,
    });
  }

  // 空
  if (!props?.value?.exposeId) {
    return <IEmpty description={"请选中目标操作"} />;
  }

  // 显隐
  if (props?.value?.exposeId === INIT_EXPOSES.visible) {
    return <VisibleOptions value={options as any} onChange={handleChange} />;
  }

  // 请求
  if (props?.value?.exposeId === INIT_EXPOSES.request) {
    return <RequestOptions value={options as any} onChange={handleChange} />;
  }

  // 自定义函数
  if (props?.value?.exposeId === INIT_EXPOSES.custom) {
    return <CustomOptions value={options as any} onChange={handleChange} />;
  }

  // 通用配置
  return <CommonOptions value={options as any} onChange={handleChange} />;
}

/**
 * 选中实例下拉框
 *
 * @author tangjiahui
 * @date 2025/2/23
 */
import ICustomSelect, { ICustomSelectProps } from "@/components/ICustomSelect";
import { useSelectedInstances } from "@/engine";

export default function SelectedInstancesSelect(props: ICustomSelectProps) {
  const selectedInstances = useSelectedInstances();
  return (
    <ICustomSelect
      {...props}
      effectParams={[selectedInstances]}
      requestFn={async () => {
        return (
          selectedInstances?.map?.((ins) => {
            return {
              label: ins.getComponentNode().name,
              value: ins.id,
            };
          }) || []
        );
      }}
    />
  );
}

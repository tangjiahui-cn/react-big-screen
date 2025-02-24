/**
 * 多实例属性配置
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import styles from "./index.module.less";
import { InstanceType } from "@/engine";
import SingleInstanceAttributes from "../SingleInstanceAttributes";
import SelectedInstancesSelect from "@/components/SelectedInstancesSelect";
import { useEffect, useState } from "react";

interface Props {
  instances: InstanceType[];
}

export default function (props: Props) {
  const { instances } = props;
  const [instance, setInstance] = useState<InstanceType>();

  useEffect(() => {
    setInstance(instances[0]);
  }, [instances]);

  return (
    <div className={styles.multipleInstanceAttributes}>
      <div className={styles.multipleInstanceAttributes_header}>
        <SelectedInstancesSelect
          allowClear={false}
          style={{ width: "100%" }}
          value={instance?.id}
          onChange={(id: any) => {
            setInstance(instances.find((ins) => ins.id === id));
          }}
        />
      </div>
      <div className={styles.multipleInstanceAttributes_body}>
        {instance && <SingleInstanceAttributes instance={instance} />}
      </div>
    </div>
  );
}

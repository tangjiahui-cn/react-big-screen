/**
 * SizeBar
 *
 * @author tangjiahui
 * @date 2024/12/22
 */
import styles from "./index.module.less";
import { CloseOutlined } from "@ant-design/icons";
import InputNumberWithSuffix from "@/components/InputNumberWithSuffix";
import { useConfig } from "@/engine";
import ScaleSelect from "@/components/ScaleSelect";
import { useEngineContext } from "@/export/context";

export default function SizeBar() {
  const config = useConfig();
  const { engine } = useEngineContext();

  return (
    <div className={styles.sizeBar} id={"rbs-sizebar"}>
      <InputNumberWithSuffix
        suffix={"px"}
        value={config.width}
        onChange={(width: any) => {
          engine.config.setConfig({
            width,
          });
        }}
      />
      <CloseOutlined style={{ fontSize: 10 }} />
      <InputNumberWithSuffix
        suffix={"px"}
        value={config.height}
        onChange={(height: any) => {
          engine.config.setConfig({
            height,
          });
        }}
      />
      <ScaleSelect
        value={config.scale}
        onChange={(scale) => {
          engine.config.setConfig({
            scale,
          });
        }}
      />
    </div>
  );
}

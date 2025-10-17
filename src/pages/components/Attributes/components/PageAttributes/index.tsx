/**
 * 页面属性配置页
 *
 * @author tangjiahui
 * @date 2025/3/13
 */
import styles from "./index.module.less";
import { JsonTypePage, useCurrentPage } from "@/engine";
import { IColorPicker, Line, LineConfigProvider } from "@/components/Attributes";
import { Checkbox, Col, Row, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useEngineContext } from "@/export/context";

export default function PageAttributes() {
  const { engine } = useEngineContext();
  const [t] = useTranslation();
  const page = useCurrentPage();
  const { id, options } = page || {};

  function handleChangeOptions(extOptions: Partial<JsonTypePage["options"]>) {
    engine.page.update(id, {
      options: {
        ...options,
        ...extOptions,
      },
    });
  }

  return (
    <div className={styles.pageAttributes}>
      <div className={styles.pageAttributes_description}>
        <Row>
          <Col span={24} style={{ marginBottom: 6 }}>
            <b>{page?.name}</b>
          </Col>
          <Col span={24}>
            <span>id：{page?.id || "-"}</span>
          </Col>
          <Col span={24}>
            <span>parentId：{page?.parentId || "-"}</span>
          </Col>
        </Row>
      </div>
      <div className={styles.pageAttributes_body}>
        <LineConfigProvider labelSpan={5}>
          <Line
            label={"页面背景"}
            labelTip={"设置当前页背景颜色"}
            childrenStyle={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <IColorPicker
              style={{ flex: 1 }}
              value={options?.background}
              onChange={(background) => {
                handleChangeOptions({ background });
              }}
            />
            <Tooltip title={t("reset")}>
              <ReloadOutlined
                className={"icon_clickable"}
                onClick={() => {
                  handleChangeOptions({ background: "white" });
                }}
              />
            </Tooltip>
          </Line>
          <Line
            label={"白板背景"}
            labelTip={"页面所处白板的背景颜色"}
            childrenStyle={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <IColorPicker
              style={{ flex: 1 }}
              value={options?.whiteBoardColor}
              onChange={(whiteBoardColor) => {
                handleChangeOptions({ whiteBoardColor });
              }}
            />
            <Tooltip title={t("reset")}>
              <ReloadOutlined
                className={"icon_clickable"}
                onClick={() => {
                  handleChangeOptions({ whiteBoardColor: "white" });
                }}
              />
            </Tooltip>
          </Line>
          <Line
            label={"边框"}
            childrenStyle={{ display: "flex", alignItems: "center", gap: 8 }}
            labelTip={"设置当前页边框"}
          >
            <Checkbox
              checked={options?.bordered}
              onChange={(e) => {
                handleChangeOptions({
                  bordered: e.target.checked,
                });
              }}
            />
            {options?.bordered && (
              <>
                <IColorPicker
                  style={{ flex: 1 }}
                  value={options?.borderColor}
                  onChange={(borderColor) => {
                    handleChangeOptions({ borderColor });
                  }}
                />
                <Tooltip title={t("reset")}>
                  <ReloadOutlined
                    className={"icon_clickable"}
                    onClick={() => {
                      handleChangeOptions({ borderColor: "white" });
                    }}
                  />
                </Tooltip>
              </>
            )}
          </Line>
        </LineConfigProvider>
      </div>
    </div>
  );
}

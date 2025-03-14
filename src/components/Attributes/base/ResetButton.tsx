import { Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  onClick?: MouseEventHandler<any> | undefined;
}

export function ResetButton(props: Props) {
  const [t] = useTranslation();
  return (
    <Tooltip title={t("reset")}>
      <ReloadOutlined className={"icon_clickable"} onClick={props?.onClick} />
    </Tooltip>
  );
}

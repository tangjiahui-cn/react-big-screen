/**
 * EmptyAttributes
 *
 * @author tangjiahui
 * @date 2025/1/14
 */
import styles from "./index.module.less";
import { useTranslation } from "react-i18next";

export default function () {
  const [t] = useTranslation();
  return <div className={styles.emptyAttributes}>{t("attributes.empty")}</div>;
}

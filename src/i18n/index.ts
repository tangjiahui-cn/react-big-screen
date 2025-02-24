/**
 * i18n
 *
 * @author tangjiahui
 * @date 2025/2/24
 * @description 语言国际化配置
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { zh, en } from "./locales";

// 语言枚举
export const LANGUAGE = {
  zh: "zh",
  en: "en",
};

// 语言类型
export type LANGUAGE_TYPE = keyof typeof LANGUAGE;

// 切换语言
export function changeLanguage(lang?: LANGUAGE_TYPE) {
  i18n.changeLanguage(lang);
}

// 初始化配置
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "zh",
    fallbackLng: "en",
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
    },
  });

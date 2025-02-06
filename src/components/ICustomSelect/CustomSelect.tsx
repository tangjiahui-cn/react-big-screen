/**
 * select template
 *
 * @author TangJiaHui
 * @date 2022.05.11
 */
import React, { useState } from "react";
import { Select, SelectProps } from "antd";
import { useDebounceEffect, useUpdateEffect } from "ahooks";
import { useEffectOnce, useStateWithRef } from "@/hooks";
import { IOption, localSearchFn, ValueType, DataMapType } from "./type";

export interface CustomSelectProps {
  /** select size. */
  size?: SelectProps["size"];
  /** default select first item (only run once) */
  defaultFirst?: boolean;
  /** default select first item while effectParams Change. (may run some times) */
  effectDefaultFirst?: boolean;
  /** if allow clear */
  allowClear?: boolean;
  /** if disabled */
  disabled?: boolean;
  /** if show all */
  all?: boolean;
  /** the name of all. */
  allName?: string;
  /** value */
  value?: ValueType;
  /** placeholder */
  placeholder?: string;
  /** style */
  style?: React.CSSProperties;
  /** debounce delay */
  debounceTime?: number;
  /** if enable search */
  showSearch?: boolean;
  /** if enable local search。（true：yes。false：use [requestFn] with debounce） */
  isLocalSearch?: boolean;
  /** local search filter function */
  filterOption?: (inputV: string, option: any, dataMap: DataMapType) => boolean;
  /** a params array, which change maybe cause the select reQuery */
  effectParams?: any[];
  /** a function to request the select options */
  requestFn?: (keyword?: ValueType) => PromiseLike<IOption[]>;
  /** onChange callback */
  onChange?: (value?: ValueType, label?: string, dataMap?: DataMapType) => void;
  /** custom select option render */
  optionRender?: (selectOption: any) => React.ReactNode;
  /** extend antd origin props */
  extAntdProps?: SelectProps;
}
export default function CustomSelect(props: CustomSelectProps) {
  const {
    allowClear = true,
    size = "small",
    defaultFirst,
    disabled,
    all,
    allName = "全部",
    value = undefined,
    placeholder = "请选择",
    style = {},
    debounceTime = 500,
    showSearch = true,
    isLocalSearch = true,
    effectParams = [],
    filterOption = undefined,
    requestFn = () => Promise.resolve([]),
    onChange,
  } = props;

  const optionAll: IOption = {
    label: allName,
    value: "",
  };

  const [keyword, setKeyword] = useState<string>("");
  const [optionList, setOptionList] = useState<IOption[]>([]);
  const [currentValue, setCurrentValue] = useState<ValueType>(undefined);
  const [dataMap, setDataMap] = useState<DataMapType>({});

  const [_, setIsFirstSet, isFirstSetRef] = useStateWithRef<boolean>(false); // 是否设置过第一次值了

  function query(keyword: string = "", isUpdateByEffect?: boolean) {
    requestFn?.(keyword).then((list: IOption[] = []) => {
      const dataMap: DataMapType = {};
      list.forEach((x: IOption) => {
        dataMap[`${x?.value}`] = x;
      });
      setDataMap(dataMap);
      setOptionList(list);

      // 是否初次查询设置 defaultFirst
      if (!isFirstSetRef.current && defaultFirst) {
        onChange?.(list?.[0]?.value, list?.[0]?.label, dataMap);
        setIsFirstSet(true);
      }

      // 通过effectParams触发查询
      if (isUpdateByEffect) {
        if (props?.effectDefaultFirst) {
          onChange?.(list?.[0]?.value, list?.[0]?.label, dataMap);
        }
      }
    });
  }

  useDebounceEffect(
    () => {
      requestFn?.(keyword)?.then((list: IOption[] = []) => {
        const dataMap: DataMapType = {};
        list.forEach((x: IOption) => {
          dataMap[`${x?.value}`] = x;
        });
        setDataMap(dataMap);
        setOptionList(list);
      });
    },
    [keyword],
    {
      wait: debounceTime,
    },
  );

  function getFilterOption(inputV: string, option: any) {
    return filterOption?.(inputV, option, dataMap);
  }

  useEffectOnce(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }

    query("");
  });

  useUpdateEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useUpdateEffect(() => {
    query("", true);
  }, effectParams);

  return (
    <Select
      size={size}
      allowClear={allowClear}
      disabled={disabled}
      style={style}
      value={currentValue}
      placeholder={placeholder}
      showSearch={showSearch}
      filterOption={
        showSearch && isLocalSearch ? (filterOption ? getFilterOption : localSearchFn) : false
      }
      onBlur={() => {
        // 如果是服务端模糊搜索则重置
        if (!props?.isLocalSearch) {
          query("");
        }
      }}
      onSearch={showSearch && !isLocalSearch ? (k) => setKeyword(k) : undefined}
      onChange={(k, options?: any) => {
        const names = Array.isArray(options)
          ? options.map((x: any) => x.children)
          : options?.children;
        onChange?.(k, names, dataMap);
        if (value !== undefined) return;
        setCurrentValue(k);
      }}
      {...props?.extAntdProps}
    >
      {all && (
        <Select.Option key={optionAll.value} value={optionAll.value}>
          {props?.optionRender ? props.optionRender(optionAll) : optionAll?.label}
        </Select.Option>
      )}
      {optionList?.map((x: IOption) => {
        return (
          <Select.Option key={x.value} value={x.value}>
            {props?.optionRender ? props.optionRender(x) : x?.label}
          </Select.Option>
        );
      })}
    </Select>
  );
}

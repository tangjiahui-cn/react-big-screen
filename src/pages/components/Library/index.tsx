/**
 * Library
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import type { Component } from '@/engine';
import { Input } from 'antd';
import { useState } from 'react';
import { useDebounceEffect } from 'ahooks';
import IEmpty from '@/components/IEmpty';
import styles from './index.module.less';
import { components } from '@/built-in';

export default function Library() {
  const [keyword, setKeyword] = useState<string>('');
  const [displayComponents, setDisplayComponents] = useState<Component[]>([]);

  useDebounceEffect(
    () => {
      const keywordLowerCase: string = keyword.toLowerCase();
      setDisplayComponents(
        components.filter((component: Component) => {
          return (
            component.name.toLowerCase().includes(keywordLowerCase) ||
            component.id.toLowerCase().includes(keywordLowerCase)
          );
        }),
      );
    },
    [keyword, components],
    {
      wait: 500,
    },
  );

  return (
    <div className={styles.library}>
      <div className={styles.library_header}>
        <Input.Search
          allowClear
          value={keyword}
          placeholder='搜索组件'
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </div>
      <div className={styles.library_main}>
        {!displayComponents.length && <IEmpty description={'暂无组件'} />}
        {displayComponents.map((component: Component) => {
          return (
            <div key={component.id} className={styles.library_item}>
              <div className={styles.library_item_body}>
                {component.icon ? (
                  <img src={component.icon} draggable={false} />
                ) : (
                  <span>None</span>
                )}
              </div>
              <div className={styles.library_item_footer}>{component.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

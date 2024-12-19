/**
 * Header
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import React from 'react';
import {
  UploadOutlined,
  VerticalAlignBottomOutlined,
  GithubFilled,
  DesktopOutlined,
  SaveOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import styles from './index.module.less';

interface OperateItem {
  key: string;
  description: string;
  icon: React.ReactNode;
}

const operates: OperateItem[] = [
  { key: 'upload', description: '上传', icon: <UploadOutlined /> },
  { key: 'import', description: '导入', icon: <VerticalAlignBottomOutlined /> },
  { key: 'preview', description: '预览', icon: <DesktopOutlined /> },
  { key: 'save', description: '保存', icon: <SaveOutlined /> },
  { key: 'settings', description: '设置', icon: <SettingOutlined /> },
];

export default function Header() {
  function handleJumpGithub() {
    window.open('https://github.com/tangjiahui-cn/big-screen.git');
  }

  function handleOperate(item: OperateItem) {
    console.log('zz click: ', item.key);
    switch (item.key) {
      case 'upload':
        break;
      case 'import':
        break;
      case 'preview':
        break;
      case 'save':
        break;
      case 'settings':
        break;
      default:
        break;
    }
  }

  return (
    <div className={styles.header}>
      <div className={styles.header_flex}>
        <b>BigScreen</b>
        <GithubFilled style={{ cursor: 'pointer', fontSize: 16 }} onClick={handleJumpGithub} />
      </div>
      <div className={styles.header_flex}>
        {operates.map((item: OperateItem) => {
          return (
            <div
              key={item.key}
              className={styles.header_flex_btn}
              onClick={() => handleOperate(item)}
            >
              <Tooltip title={item.description}>{item.icon}</Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
import styles from './index.module.less';
import TooltipButton from '@/components/TooltipButton';
import { message } from 'antd';
import IconFont from '@/components/IconFont';
import SizeBar from './components/SizeBar';

interface OperateItem {
  key: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

const operates: OperateItem[] = [
  { key: 'undo', description: '撤销', disabled: true, icon: <IconFont type={'icon-undo'} /> },
  {
    key: 'cancelRevoke',
    description: '取消撤销',
    disabled: true,
    icon: <IconFont type={'icon-cancel-undo'} />,
  },
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
    message.success('click ' + item.key);

    switch (item.key) {
      case 'undo':
        message.warn('暂不支持撤销');
        break;
      case 'cancelRevoke':
        message.warn('暂不支持取消撤销');
        break;
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

      <SizeBar />

      <div className={styles.header_flex}>
        {operates.map((item: OperateItem) => {
          return (
            <TooltipButton
              key={item.key}
              disabled={item?.disabled}
              title={item.description}
              onClick={() => handleOperate(item)}
            >
              {item.icon}
            </TooltipButton>
          );
        })}
      </div>
    </div>
  );
}

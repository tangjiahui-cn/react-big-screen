/**
 * Property
 *
 * @author tangjiahui
 * @date 2024/12/19
 * @description 个人资产管理页面
 */
import { message, Space } from "antd";
import engine, { ComponentNodeType, ComponentPackage, usePackages } from "@/engine";
import Item from "./components/Item";
import AddPackageButton from "./components/AddPackageButton";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import IEmpty from "@/components/IEmpty";
import { useRequest } from "ahooks";

export default function () {
  const packages = usePackages();

  // 刷新个人资产列表（远程请求）
  const { loading, run: runRefreshPropertyList } = useRequest(
    async () => {
      // 待开发（需与后端联动）
      // ...，
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          message.success("刷新成功");
          resolve();
        }, 500);
      });
    },
    {
      manual: true,
    },
  );

  // 新增包
  function handleAdd(pkg: ComponentPackage, code: string) {
    // 注册package
    engine.component.registerPackage(pkg);
    // 存储源代码
    engine.component.savePackageSourceCode(pkg, code);
  }

  // 删除包
  function handleDelete(pkg: ComponentPackage, componentNodes: ComponentNodeType[]) {
    // 取消注册组件包
    engine.component.unregisterPackage(pkg);
    // 删除相关实例
    engine.componentNode.delete(componentNodes);
  }

  return (
    <div className={styles.property}>
      <div className={styles.property_header}>
        <Space>
          <b>资产列表</b>
          {/* 刷新资产列表（拉取远程最新包） */}
          <span
            title={"刷新资产"}
            className={"icon_clickable"}
            onClick={() => !loading && runRefreshPropertyList()}
          >
            {loading ? <LoadingOutlined /> : <ReloadOutlined />}
          </span>
        </Space>
        <Space>
          {/* 新增包下拉按钮 */}
          <AddPackageButton onAdd={(pkg, code) => handleAdd(pkg, code)}>
            新增组件包
          </AddPackageButton>
        </Space>
      </div>

      {/* 资产包列表 */}
      {!packages.length && <IEmpty />}
      {packages?.map?.((pkg) => {
        return (
          <Item
            key={pkg.id}
            data={pkg}
            onDelete={(pkg, componentNodes) => {
              handleDelete(pkg, componentNodes);
            }}
          />
        );
      })}
    </div>
  );
}

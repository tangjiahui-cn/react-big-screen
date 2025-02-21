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
import DownloadButton from "./components/DownloadButton";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import IEmpty from "@/components/IEmpty";
import { useRequest } from "ahooks";
import jszip from "jszip";
import { saveAs } from "file-saver";

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
  function handleAdd(pkg: ComponentPackage, code: string): void;
  function handleAdd(pkgs: ComponentPackage[], codes: string[]): void;
  function handleAdd(pkg: ComponentPackage | ComponentPackage[], code: string | string[]) {
    const pkgs = Array.isArray(pkg) ? pkg : [pkg];
    const codes = Array.isArray(code) ? code : [code];
    // 注册package
    engine.component.registerPackage(pkgs);
    // 存储源代码
    codes.forEach((code, index) => {
      engine.component.savePackageSourceCode(pkgs[index], code);
    });
  }

  // 删除包
  function handleDelete(pkg: ComponentPackage, componentNodes: ComponentNodeType[]) {
    // 取消注册组件包
    engine.component.unregisterPackage(pkg);
    // 删除相关实例
    engine.componentNode.delete(componentNodes);
  }

  // 打包下载所有组件包
  async function handleDownloadAll() {
    const thenableList = packages.map((pkg) => {
      return engine.component.getPackageSourceCode(pkg.id);
    });
    Promise.all(thenableList).then((codes) => {
      const zip = new jszip();
      codes.forEach((code, index) => {
        if (!code) return;
        const pkg = packages[index];
        zip.file(`${pkg.name}.js`, code);
      });
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, "组件包集合.zip");
      });
    });
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
          {/* 下载下拉按钮 */}
          <DownloadButton
            onDownloadAll={() => {
              handleDownloadAll();
            }}
          >
            下载
          </DownloadButton>
          {/* 新增包下拉按钮 */}
          <AddPackageButton
            onAdd={(pkg, code) => {
              handleAdd(pkg, code);
            }}
            onAddSome={(pkgs, codes) => {
              handleAdd(pkgs, codes);
            }}
          >
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

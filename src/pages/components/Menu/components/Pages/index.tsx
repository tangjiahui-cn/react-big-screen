/**
 * Pages
 *
 * @author tangjiahui
 * @date 2025/2/25
 */
import styles from "./index.module.less";
import { Button, message, Space, Tree, TreeDataNode } from "antd";
import { FileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import engine, { JsonTypePage, useCurrentPage, usePages } from "@/engine";
import useAddPageDialog from "./components/AddPageDialog";
import { useStateWithRef } from "@/hooks";
import { selectPage } from "@/packages/shortCutKeys";

export default function () {
  const [expandedKeys, setExpandedKeys] = useState<any[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<any[]>([]);
  const [treeData, setTreeData, treeDataRef] = useStateWithRef<TreeDataNode[]>([]);
  const pages = usePages();
  const currentPage = useCurrentPage();

  // 新增页面弹窗
  const addPageDialog = useAddPageDialog({
    onOk({ page, parentId }) {
      // 插入一个新页面
      engine.page.insert(page, parentId);
      // 选中新页面
      selectPage(page.id);
      // 展开当前id
      if (parentId) {
        const keys = Array.from(new Set(expandedKeys).add(parentId));
        handleExpandedKeys(keys);
      }
    },
  });

  // 设置展开keys
  function handleExpandedKeys(keys: any[]) {
    setExpandedKeys(keys);
    engine.config.setConfigSilently({ expandedPageIds: keys });
  }

  // 获取所有节点keys
  function getTreeNodeKeys(treeDataList?: TreeDataNode[]): string[] {
    return (
      treeDataList?.reduce?.((keys, treeData) => {
        return keys.concat([treeData.key as any, ...getTreeNodeKeys(treeData?.children)]);
      }, [] as string[]) || []
    );
  }

  // 树节点新增操作
  function handleOptAdd(page: JsonTypePage) {
    addPageDialog.open({
      parentId: page.id,
      parentName: page.name,
    });
  }

  // 树节点删除操作
  function handleOptDelete(page: JsonTypePage, idMap: Record<string, TreeDataNode> = {}) {
    // 删除id列表
    const deletePageIds = [page.id, ...getTreeNodeKeys(idMap[page.id].children)];
    // 至少保留一个顶层页
    if (
      treeDataRef.current?.length === 1 &&
      deletePageIds?.includes(treeDataRef.current?.[0]?.key as any)
    ) {
      message.warn("至少保留一个顶层页");
      return;
    }
    // 如果当前选中页在待删除id列表中
    if (deletePageIds.includes(engine.config.getCurrentPage())) {
      // 则自动选中第一顶层页
      let topLevelPageId: any = treeDataRef.current?.[0]?.key;
      // 如果第一顶层页被删除，则选中第二顶层页
      if (deletePageIds.includes(topLevelPageId!)) {
        topLevelPageId = treeDataRef.current?.[1]?.key;
      }
      selectPage(topLevelPageId);
    }
    // 实际删除页面
    engine.page.delete(deletePageIds);
  }

  // page列表转treeData
  function pagesToTreeData(
    pages: JsonTypePage[],
    idMap: Record<string, TreeDataNode> = {},
  ): TreeDataNode[] {
    const treeData: TreeDataNode[] = [];
    // 遍历列表中的每一项
    pages.forEach((page) => {
      const currentNode: TreeDataNode = idMap[page.id];
      // 树节点
      const item: TreeDataNode = (idMap[page.id] = {
        key: currentNode?.key || page.id,
        title: currentNode?.title || (
          <span>
            <span>{page.name}</span>
            <span style={{ fontSize: 12 }} onClick={(e) => e.stopPropagation()}>
              <a style={{ marginLeft: 16 }} onClick={() => handleOptAdd(page)}>
                新增
              </a>
              <a style={{ marginLeft: 8 }} onClick={() => handleOptDelete(page, idMap)}>
                删除
              </a>
            </span>
          </span>
        ),
        children: currentNode?.children || [],
      });

      // 父组件添加
      if (page?.parentId) {
        // 非顶层需要由父组件children插入
        (idMap[page?.parentId] ||= {
          key: "",
          title: "",
          children: [],
        })?.children?.push(item);
        return;
      }

      // 顶层页面直接插入
      treeData.push(item);
    });
    return treeData;
  }

  useEffect(() => {
    setExpandedKeys(engine.config.getConfig().expandedPageIds || []);
  }, []);

  useEffect(() => {
    setTreeData(pagesToTreeData(pages));
  }, [pages]);

  useEffect(() => {
    setSelectedKeys([currentPage]);
  }, [currentPage]);

  return (
    <div className={styles.pages}>
      <div className={styles.pages_head}>
        <b>页面管理</b>
        <Space>
          <Button
            type={"primary"}
            size={"small"}
            style={{ fontSize: 12 }}
            onClick={() => {
              addPageDialog.open();
            }}
          >
            新增页面
          </Button>
        </Space>
      </div>
      <div className={styles.pages_body}>
        <Tree
          showIcon
          multiple={false}
          defaultExpandAll
          icon={<FileOutlined />}
          treeData={treeData}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          onExpand={handleExpandedKeys}
          onSelect={(keys) => {
            if (!keys.length) {
              return;
            }
            selectPage(keys?.[0] as any);
          }}
        />
      </div>
      {addPageDialog.children}
    </div>
  );
}

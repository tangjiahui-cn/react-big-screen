/**
 * 文件操作相关方法
 *
 * @author tangjiahui
 * @date 2025/1/9
 */
interface GetLocalFileTextOptions {
  accept?: string; // 可打开文件类型
}

/**
 * 获取打开文件
 */
export async function getLocalFile(options?: GetLocalFileTextOptions): Promise<File | undefined> {
  return new Promise<File | undefined>((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    if (options?.accept) {
      input.accept = options.accept;
    }
    input.onchange = (e: any) => {
      const file: File | undefined = e.target?.files?.[0];
      if (!file) {
        console.warn("file must be selected.");
        return resolve(undefined);
      }
      resolve(file);
    };
    input.click();
  });
}

/**
 * 获取本地文件的txt字符串
 *
 * @return Promise<string>
 */
export async function getLocalFileText(options?: GetLocalFileTextOptions): Promise<string> {
  return getLocalFile(options).then((file) => getFileText(file));
}

/**
 * 获取file的文本内容
 */
export async function getFileText(file: File | undefined): Promise<string> {
  return new Promise<string>((resolve) => {
    if (!file) return "";
    const reader = new FileReader();
    reader.onload = function () {
      const text: string = (this.result as string) || "";
      resolve(text);
    };
    reader.readAsText(file as any);
  });
}

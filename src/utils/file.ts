/**
 * 文件操作相关方法
 *
 * @author tangjiahui
 * @date 2025/1/9
 */

/**
 * 获取本地文件的txt字符串
 *
 * @return Promise<string>
 */
interface GetLocalFileTextOptions {
  accept?: string; // 可打开文件类型
}
export async function getLocalFileText(options?: GetLocalFileTextOptions): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let input = document.createElement("input");
    input.type = "file";
    if (options?.accept) {
      input.accept = options.accept;
    }
    input.onchange = (e: any) => {
      const file = e.target?.files?.[0];
      if (!file) {
        return reject("file must be selected.");
      }
      const reader = new FileReader();
      reader.onload = function () {
        const text: string = (this.result as string) || "";
        resolve(text);
      };
      reader.readAsText(file);
    };
    input.click();
  });
}

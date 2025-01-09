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
export async function getLocalFileText(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    let input = document.createElement("input");
    input.type = "file";
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

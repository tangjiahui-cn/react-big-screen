/**
 * save to file.
 *
 * @author tangjiahui
 * @date 2024/12/25
 */

// 默认空文件名
const DEFAULT_FILE_NAME = "未命名文件.txt";

// 获取远程链接的文本内容
export async function getUrlText(url: string): Promise<string> {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => {
        const isSuccess = `${res?.status}`?.startsWith?.("2");
        return isSuccess ? res.text() : "";
      })
      .then(resolve)
      .catch((error: any) => {
        console.error(error);
        resolve("");
      });
  });
}

// 获取远程链接的blob内容
export async function getUrlBlob(url: string): Promise<Blob | undefined> {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => {
        const isSuccess = `${res?.status}`?.startsWith?.("2");
        return isSuccess ? res.blob() : undefined;
      })
      .then(resolve)
      .catch((error: any) => {
        console.error(error);
        resolve(undefined);
      });
  });
}

// 保存url内容文本到本地
export function downloadUrlText(url: string = "", fileName: string = DEFAULT_FILE_NAME) {
  getUrlText(url).then((text) => {
    downloadText(text, fileName);
  });
}

// 保存文本到本地
export function downloadText(text: string = "", fileName: string = DEFAULT_FILE_NAME) {
  const blob = new Blob([text], {
    type: "text/plain;charset=utf-8",
  });
  downloadBlob(blob, fileName);
}

// 保存blob到本地文件
export function downloadBlob(blob: Blob = new Blob([""]), fileName: string = DEFAULT_FILE_NAME) {
  const a = document.createElement("a");
  const objectURL = URL.createObjectURL(blob);
  a.style.display = "none";
  a.download = fileName;
  a.href = objectURL;
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(objectURL);
  });
}

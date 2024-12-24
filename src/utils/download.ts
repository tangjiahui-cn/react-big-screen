/**
 * save to file.
 *
 * @author tangjiahui
 * @date 2024/12/25
 */
export function saveToFile(text: string = '', fileName: string = '文件.txt') {
  const a = document.createElement('a');
  const blob = new Blob([text], {
    type: 'text/plain;charset=utf-8',
  });
  const objectURL = URL.createObjectURL(blob);
  a.style.display = 'none';
  a.download = fileName;
  a.href = objectURL;
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(objectURL);
  });
}

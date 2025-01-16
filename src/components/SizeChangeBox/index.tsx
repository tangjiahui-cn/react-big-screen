/**
 * 拖拽修改大小（8个点）
 *
 * @author tangjiahui
 * @date 2025/1/16
 */

interface SizeChangeBox {
  onMoveStart?: (deltaWidth: number, deltaHeight: number) => void;
  onMove?: (deltaWidth: number, deltaHeight: number) => void;
  onMoveEnd?: (deltaWidth: number, deltaHeight: number) => void;
}

export default function SizeChangeBox(props: SizeChangeBox) {
  return (
    <div style={{ position: "absolute", width: "100%", height: "100%" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transform: "translateX(-100%, -100%)",
          width: 10,
          height: 10,
          background: "red",
          borderRadius: "50%",
        }}
      ></div>
    </div>
  );
}

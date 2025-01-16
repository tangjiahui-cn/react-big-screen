/**
 * Entry
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import "antd/dist/antd.min.css";

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);

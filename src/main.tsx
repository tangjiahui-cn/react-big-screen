/**
 * Entry
 *
 * @author tangjiahui
 * @date 2024/12/19
 */
import { createRoot } from 'react-dom/client';
import App from './pages';
import 'antd/dist/antd.min.css';
import { GlobalProvider } from '@/engine';

createRoot(document.getElementById('root')!).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
);

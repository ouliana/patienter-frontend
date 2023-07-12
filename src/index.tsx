import ReactDOM from 'react-dom/client';
import App from './App';
import { DiagnosesContextProvider } from './DiagnosesContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <DiagnosesContextProvider>
    <App />
  </DiagnosesContextProvider>
);

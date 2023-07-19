import ReactDOM from 'react-dom/client';
import App from './App';
import { DiagnosesContextProvider } from './context/DiagnosesContext';
import { MessageContextProvider } from './context/MessageContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MessageContextProvider>
    <DiagnosesContextProvider>
      <App />
    </DiagnosesContextProvider>
  </MessageContextProvider>
);

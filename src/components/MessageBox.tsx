import { Alert } from '@mui/material';
import { useMessageValue } from '../context/MessageContext';
import { Severity } from '../types';

const MessageBox = () => {
  const { message } = useMessageValue();
  if (message.content && 'severity' in message) {
    switch (message.severity) {
      case Severity.Error:
        return <Alert severity='error'> {message.content}</Alert>;
      case Severity.Success:
        return <Alert severity='success'> {message.content}</Alert>;
      case Severity.Warning:
        return <Alert severity='warning'> {message.content}</Alert>;
      case Severity.Info:
        return <Alert severity='info'> {message.content}</Alert>;
      default:
        return null;
    }
  }
  return null;
};

export default MessageBox;

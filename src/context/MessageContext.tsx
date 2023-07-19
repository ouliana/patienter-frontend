import { createContext, useReducer, useContext } from 'react';
import { Message, Severity } from '../types';
import { isString } from '../utils';

export enum MessageActionKind {
  Set = 'SET',
  Clear = 'CLEAR',
}

interface Action {
  type: MessageActionKind;
  payload: Message;
}

interface State {
  message: Message;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case MessageActionKind.Set:
      return { message: action.payload };
    case MessageActionKind.Clear:
      return { message: { content: '' } };
    default:
      return state;
  }
};

const toMessage = (obj: unknown): Message => {
  const isSeverity = (severity: string): severity is Severity => {
    return Object.values(Severity)
      .map(v => v.toString())
      .includes(severity);
  };

  if (!obj || typeof obj !== 'object') throw new Error('Invalid message type');

  if ('content' in obj && isString(obj.content)) {
    const msg = {
      content: obj.content,
    };
    if (
      'severity' in obj &&
      isString(obj.severity) &&
      isSeverity(obj.severity)
    ) {
      Object.defineProperty(msg, 'severity', {
        enumerable: true,
        configurable: true,
        writable: true,
        value: obj.severity,
      });
    }

    return msg;
  }
  throw new Error('missing content property');
};
const initialState = { message: toMessage({ content: '' }) };

const MessageContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const useMessageValue = () => {
  const messageAndDispatch = useContext(MessageContext);
  return messageAndDispatch.state;
};

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(MessageContext);
  return messageAndDispatch.dispatch;
};

export const MessageContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MessageContext.Provider value={{ state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;

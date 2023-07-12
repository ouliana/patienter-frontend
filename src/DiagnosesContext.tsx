import { createContext, useReducer, useContext } from 'react';
import { Diagnosis } from './types';

export enum DiagnosesActionKind {
  SET = 'SET',
}

interface Action {
  type: DiagnosesActionKind;
  payload: Diagnosis[];
}

interface State {
  diagnoses: Diagnosis[];
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case DiagnosesActionKind.SET:
      return { diagnoses: action.payload };
    default:
      return state;
  }
};

const DiagnosesContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { diagnoses: [] },
  dispatch: () => undefined,
});

export const useDiagnosesValue = () => {
  const diagnosesAndDispatch = useContext(DiagnosesContext);
  return diagnosesAndDispatch.state;
};

export const useDiagnosesDispatch = () => {
  const diagnosesAndDispatch = useContext(DiagnosesContext);
  return diagnosesAndDispatch.dispatch;
};

export const DiagnosesContextProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, { diagnoses: [] });

  return (
    <DiagnosesContext.Provider value={{ state, dispatch }}>
      {children}
    </DiagnosesContext.Provider>
  );
};

export default DiagnosesContext;

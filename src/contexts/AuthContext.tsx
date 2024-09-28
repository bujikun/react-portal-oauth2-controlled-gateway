import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

type StateType = {
  userId: string | null;
  token: string | null;
};

type ActionType = {
  type: "USER_LOGGED_IN" | "USER_LOGGED_OUT";
  payload: StateType | null;
};

type ContextType = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};
const initialState: StateType = {
  userId: null,
  token: null,
};
const initialContext: ContextType = {
  state: initialState,
  dispatch: () => {},
};

const Context = createContext<ContextType>(initialContext);

type Props = {
  children: ReactNode;
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "USER_LOGGED_IN":
      console.log("LOGGED IN");

      return { ...state, ...action.payload };
    case "USER_LOGGED_OUT":
      return initialState;
    default:
      throw new Error("Invalid action");
  }
};
const AuthProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const useAuthContext = () => {
  const { state, dispatch } = useContext(Context);
  console.log("STATE", state);

  if (!state) {
    throw new Error("Can not access auth info outside AuthContext");
  }
  return { state, dispatch };
};

export default AuthProvider;

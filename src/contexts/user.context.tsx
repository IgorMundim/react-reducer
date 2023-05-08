import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';
interface IProps {
  children: React.ReactNode;
}

export enum UserAccountType {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

interface UserProps {
  firstName: string;
  lastName: string;
}

interface UserAction {
  type: UserAccountType;
  payload: UserProps;
}

interface UserState {
  currentUser: {
    firstName: string;
    lastName: string;
  };
}

const INITIAL_STATE = {
  currentUser: {
    firstName: '',
    lastName: '',
  },
};

export interface UserContextProps {
  setCurrentUser: (user: UserProps) => void;
  currentUser: { firstName: string; lastName: string };
}

export const UserContext = createContext<UserContextProps | null>(null);

export const userReducer = (state: UserState, action: UserAction) => {
  const { type, payload } = action;
  switch (type) {
    case UserAccountType.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(` Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }: IProps) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user: UserProps) => {
    dispatch(createAction(UserAccountType.SET_CURRENT_USER, user));
  };
  const value = {
    currentUser,
    setCurrentUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

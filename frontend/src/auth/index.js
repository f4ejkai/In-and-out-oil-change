import {createContext, useState, useContext} from 'react';
import {JWT_TOKEN, USERNAME} from "../http";

const AuthContext = createContext();

const useAuth = () => {
  const _authed = Boolean(localStorage.getItem(JWT_TOKEN));
  const [authed, setAuthed] = useState(_authed);
  const [username, setUsername] = useState(localStorage.getItem(USERNAME));
  return {
    authed,
    username,
    login(token, username) {
      localStorage.setItem(JWT_TOKEN, token);
      localStorage.setItem(USERNAME, username);
      return new Promise(res => {
        setAuthed(true);
        setUsername(username);
        res();
      })
    },
    logout() {
      localStorage.removeItem(JWT_TOKEN);
      return new Promise(res => {
        setAuthed(false);
        res();
      })
    }
  }
}

export const AuthProvider = ({children}) => {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function AuthConsumer() {
  return useContext(AuthContext);
}

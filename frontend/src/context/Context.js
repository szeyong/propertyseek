import { createContext, useReducer, useEffect } from "react";
import LoginReducer from "./LoginReducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE); // update INITIAL_STATE

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user)); // json format
    }, [state.user]);

    return (
        <Context.Provider
            value = {{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch, 
            }}
        >
            {children}
        </Context.Provider>
  );
};
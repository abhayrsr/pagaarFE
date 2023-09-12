import axios from "axios";
import{createContext, useContext, useEffect, useMemo, useState} from "react";

const AuthContext = createContext();
const AuthProvider = ({children}) => {

    const[token, setToken_] = useState(localStorage.getItem("token"));
    const setToken = (newToken) => {
        setToken_(newToken)
    }

    useEffect(() => {
        if(token){
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
        }
    },[token])

    const login = async (username, password) => {
        try {
          const response = await axios.post("http://localhost:3000/users/login", {
            username,
            password,
          });
          const newToken = response.data.token;
          setToken(newToken);
        } catch (error) {
          console.error("Login failed:", error);
        }
      };

    const contextvalue = useMemo(
        () => ({
            token,
            setToken,
            login
        }), [token,setToken,login]
    );

    return(
        <AuthContext.Provider value={contextvalue}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthProvider;
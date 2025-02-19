
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
    const isAuthenticated = localStorage.getItem("access_token"); // Substitua com sua lógica de autenticação real

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
};
export default AuthGuard;
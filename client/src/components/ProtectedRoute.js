import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
    //bring token from props
    const { token, children, redirectTo } = props
    //if there's a token, render whatever component being passed as children, else navigate to the other designed route
    return token ? children : <Navigate to={redirectTo} />
}

export default ProtectedRoute

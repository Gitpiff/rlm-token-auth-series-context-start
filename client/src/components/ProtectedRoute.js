import React, { Component } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
    //bring token from props
    const { token, children } = props
    //if there's a token, render whatever component being passed as children, else navigate to the other designed route
    return token ? children : <Navigate to="/" />
}

export default ProtectedRoute

import React from 'react';
import { Navigate } from "react-router-dom";

// Небольшой компонент для создания защищенных роутов при авторизации
// Добавил его, так как всегда держу под рукой в проектах, чтоб сразу добавить при добавлении регистрации/авторизации
const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />
  )
};

export default ProtectedRoute;
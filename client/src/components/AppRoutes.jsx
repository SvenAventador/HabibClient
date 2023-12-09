import React from 'react';
import {Routes, Route, Navigate} from "react-router";
import { adminRoute, managerRoute, publicRoutes, supplierRoute } from "../routes";
import { useUser } from "../state/UserStore";
import {MAIN_ROUTE} from "../utils/conts";

const AppRoutes = () => {
    const {
        user,
        isAuth
    } = useUser();

    console.log(user)
    console.log(adminRoute.path)

    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            {user?.userRole === 2 && isAuth && (
                <Route key={adminRoute.path}
                       path={adminRoute.path}
                       element={<adminRoute.Component />}
                />
            )}

            {user?.userRole === 3 && isAuth && (
                <Route key={managerRoute.path}
                       path={managerRoute.path}
                       element={<managerRoute.Component />}
                />
            )}

            {user?.userRole === 4 && isAuth && (
                <Route key={supplierRoute.path}
                       path={supplierRoute.path}
                       element={<supplierRoute.Component />}
                />
            )}


            <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRoutes;

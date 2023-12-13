import React from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router";
import {
    adminRoute, authRoutes,
    managerRoute,
    publicRoutes,
    supplierRoute
} from "../routes";
import {useUser} from "../state/UserStore";
import {MAIN_ROUTE} from "../utils/conts";

const AppRoutes = () => {
    const {
        user,
    } = useUser();

    return (
        <Routes>
            {
                adminRoute.map(({path, Component}) => (
                    <Route key={path}
                           path={path}
                           element={user?.userRole === 2 ? <Component/> : <Navigate to="/"/>
                           }/>
                ))
            }
            {
                managerRoute.map(({path, Component}) => (
                    <Route key={path}
                           path={path}
                           element={user?.userRole === 3 ? <Component/> : <Navigate to="/"/>
                           }/>
                ))
            }
            {
                supplierRoute.map(({path, Component}) => (
                    <Route key={path}
                           path={path}
                           element={user?.userRole === 4 ? <Component/> : <Navigate to="/"/>
                           }/>
                ))
            }
            {
                authRoutes.map(({path, Component}) =>
                    <Route key={path}
                           path={path}
                           element={<Component/>}/>
                )
            }
            {
                publicRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))
            }
            <Route path="*" element={<Navigate replace to={MAIN_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRoutes;

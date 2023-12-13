import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    MANAGER_ROUTE,
    REGISTRATION_ROUTE,
    SUPPLIER_ROUTE
} from "./utils/conts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import AdminPage from "./pages/admin/AdminPage";
import ManagerPage from "./pages/manager/ManagerPage";
import SupplierPage from "./pages/supplier/SupplierPage";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    }
]

export const authRoutes = [
]

export const adminRoute = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    }
]

export const managerRoute = [
    {
        path: MANAGER_ROUTE,
        Component: ManagerPage
    }
]

export const supplierRoute = [
    {
        path: SUPPLIER_ROUTE,
        Component: SupplierPage
    }
]
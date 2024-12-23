import "./App.css";
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { publicRoutes } from "./routes/Routes";
import DefaultLayout from "./components/layouts/DefaultLayout";
import { Fragment, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { publicAdminRoutes } from "./routes/AdminRoutes";
import AdminDefaultLayout from "./admin/components/layouts/AdminDefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { handleRefresh } from "./redux/auth/authAction";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useSelector((state) => state.auth);
    // const authAdmin = useSelector((state) => state.authAdmin);

    useEffect(() => {
        if (window.location.pathname.startsWith("/admin")) {
            dispatch(handleRefresh());
        }
    }, []);

    useEffect(() => {
        if (auth.auth && location.pathname === "/admin/login") {
            navigate("/admin");
        }

        if (!auth.auth && window.location.pathname.startsWith("/admin")) {
            navigate("/admin/login");
        }
    }, [auth.auth, location.pathname]);

    return (
        <>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.Layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
                {publicAdminRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = AdminDefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    );
}

export default App;

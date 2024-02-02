import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home/Home";
import Appointment from "../components/Appointment/Appointment";
import Dashboard from "../components/Dashboard/Dashboard";
import AppointMents from "../components/Dashboard/AppointMents";
import RequireAuth from "../components/Auth/RequireAuth";
import Login from "../components/page/Login";
import SignUp from "../components/page/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "appointment",
                element: <Appointment />
            },
            {
                path: 'dashboard',
                element: <RequireAuth>
                    <Dashboard />
                </RequireAuth>,
                children: [
                    {
                        index: true,
                        element: <RequireAuth><AppointMents /></RequireAuth>
                    },
                    {
                        path: 'appointments',
                        element: <AppointMents />
                    }
                ]
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <SignUp />
            }
        ]
    },
])

export default router
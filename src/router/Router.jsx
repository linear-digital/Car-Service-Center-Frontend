import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home/Home";
import Appointment from "../components/Appointment/Appointment";
import Dashboard from "../components/Dashboard/Dashboard";
import AppointMents from "../components/Dashboard/AppointMents";

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
                element: <Dashboard />,
                children: [
                    {
                        index: true,
                        element: <AppointMents />
                    },
                    {
                        path: 'appointments',
                        element: <AppointMents />
                    }
                ]
            }
        ]
    }
])

export default router
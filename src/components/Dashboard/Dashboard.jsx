import { Link, Outlet } from "react-router-dom";
import { auth } from "../Auth/firebase.config";


const Dashboard = () => {

    return (
        <section className="pb-70 pt-100 " id="services">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">dashboard</span>
                </div>
                <div className="row">
                    <div className="col-lg-2 p-2">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link to="profile">Profile</Link>
                            </li>
                            <li className="list-group-item">
                                <Link to="appointments">Appointments</Link>
                            </li>
                            <li className="list-group-item">Settings</li>
                            <li className="list-group-item">
                                <div onClick={() => {
                                    auth.signOut();
                                }}
                                    style={{ cursor: "pointer" }}
                                >
                                    Logout
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-9" style={{
                        minHeight: "80vh"
                    }}>
                        <Outlet />
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Dashboard;
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from "react-router-dom";
import { auth } from '../../Auth/firebase.config';
import Loader from '../../Loader/Loader';
const Navbar = () => {
    const showForm = () => {
        const form = document.getElementById("loginModal");
        form.setAttribute("style", "display: block;");
        form.removeAttribute("aria-modal");
    }
    const [user, loading] = useAuthState(auth)

    if (loading) {
        return <Loader />
    }
    return (
        <div>
            <div className="navbar-area fixed-top">
                {/* Menu For Mobile Device */}
                <div className="mobile-nav">
                    <Link to="/" className="logo">
                        <img src="/assets/logo.png" alt="Logo" />
                    </Link>
                </div>
                {/* Menu For Desktop Device */}
                <div className="main-nav">
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <Link to={'/'} className="navbar-brand">
                                <img width={100} src="/assets/logo.png" className="logo-one" alt="Logo" />
                                <img src="/assets/img/logo.png" className="logo-two" alt="Logo" />
                            </Link>
                            <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <NavLink to="/" className="nav-link ">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/#about" className="nav-link"
                                        >
                                            About
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/#services" className="nav-link">Services</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/appointment" className="nav-link">Request Appointment</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="#" className="nav-link">Blog</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="contact.html" className="nav-link">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            {
                                user ?
                                    <>
                                        <div className="dropdown">
                                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {user.displayName || user.email.slice(0, user.email.indexOf("@"))}
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <Link  className="dropdown-item" to="/dashboard">Dashboard</Link>
                                                <button className="dropdown-item btn btn-danger"
                                                    onClick={() => auth.signOut()}
                                                >Logout</button>
                                            </div>
                                            
                                        </div>

                                    </>
                                    :
                                    <div className="cmn-btn">
                                        <a
                                            href="#"
                                            onClick={showForm}
                                            className="banner-btn-left">
                                            <i className="bx bxs-user-plus" />
                                            Sign In
                                        </a>
                                    </div>
                            }
                        </nav>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;
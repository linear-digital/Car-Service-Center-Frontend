import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Auth/firebase.config";

import { useEffect, useState } from "react";
import api from "../../util/Api";
import toast from "react-hot-toast";
import moment from "moment";


const AppointMents = () => {
    const [user, loading] = useAuthState(auth)
    const [currentUser, setCurrentUser] = useState({})
    const [appintments, setAppintments] = useState([])
    console.log(currentUser)
    useEffect(() => {
        (
            async () => {
                try {
                    api.get(`/user/check/${user?.email}`)
                        .then(res => {
                            setCurrentUser(res.data)
                            if (res.data.role === "admin") {
                                api.get('/appointment')
                                    .then(res => setAppintments(res.data))
                            }
                            else {
                                api.get(`/appointment/get/${user?.email}`)
                                    .then(res => setAppintments(res.data))
                            }
                        })


                } catch (error) {
                    toast.error(error.response.data.err)
                }
            }
        )()
    }, [user])
    const [selected, setSelected] = useState({})
    const showModal = () => {
        const form = document.getElementById("singleAppointment");
        form.setAttribute("style", "display: block;");
    }
    const hideModal = () => {
        const form = document.getElementById("singleAppointment");
        form.setAttribute("style", "display: none;");
        setSelected({})
    }
    if (loading) {
        return "Loading..."
    }
    return (
        <div>
            <h2>Appintments</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Service</th>
                        <th scope="col">Time</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appintments.map((appintment, index) => {
                            return (
                                <tr
                                    onClick={() => {
                                        showModal()
                                        setSelected(appintment)
                                    }}
                                    key={appintment._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <a href="#"
                                        >
                                            {appintment.service}
                                        </a>
                                    </td>
                                    <td>
                                        {moment(appintment.date).format('MMMM Do YYYY,')}
                                    </td>
                                    <td>{appintment.name}</td>
                                    <td>{appintment.email}</td>
                                    <td>{appintment.phone}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div id="singleAppointment" className="modal fade show " tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle">
                <div className="modal-dialog modal-dialog-centered" role="document">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">{selected?.service}</h5>
                            <button type="button " className="close btn btn-danger"
                                onClick={() => {
                                    hideModal()
                                }}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <p>
                                <strong>Name:</strong> {selected?.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {selected?.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {selected?.phone}
                            </p>
                            <p>
                                <strong>Time:</strong> {moment(selected?.date).format('MMMM Do YYYY,')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointMents;
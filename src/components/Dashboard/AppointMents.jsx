import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Auth/firebase.config";

import { useEffect, useState } from "react";
import api from "../../util/Api";
import toast from "react-hot-toast";
import moment from "moment";
import Loader from "../Loader/Loader";


const AppointMents = () => {
    const [user, loading] = useAuthState(auth)
    const [currentUser, setCurrentUser] = useState({})
    const [appintments, setAppintments] = useState([])
    const [inProgress, setProgress] = useState(true)
    useEffect(() => {
        (
            async () => {
                try {
                    setProgress(true)
                    api.get(`/user/check/${user?.email}`)
                        .then(res => {
                            setCurrentUser(res.data)
                            if (res.data.role === "admin") {
                                api.get('/appointment')
                                    .then(res => {
                                        setProgress(false)
                                        setAppintments(res.data)
                                    })
                            }
                            else {
                                api.get(`/appointment/get/${user?.email}`)
                                    .then(res => {
                                        setProgress(false)
                                        setAppintments(res.data)
                                    })
                            }
                        })


                } catch (error) {
                    toast.error(error.response.data.err)
                    setProgress(false)
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
    const updateStatus = (status, appint) => {
        api.put(`/appointment/${appint._id}`, { status: status })
            .then(res => {
                if (res.status === 200) {
                    toast.success("Status updated successfully")
                    api.get('/appointment')
                        .then(res => setAppintments(res.data))
                }
            })
    }
    if (loading || inProgress) {
        return <Loader />
    }
    return (
        <div>
            <h2>Appintments</h2>
            <table className="table table-striped" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Service</th>
                        <th scope="col">Time</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        {
                            currentUser.role === "admin" && <th scope="col">Action</th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        appintments.map((appintment, index) => {
                            return (
                                <tr
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
                                    {
                                        currentUser.role === "admin" && <td>
                                            <div className="d-flex justify-content-between align-items-center gap-2">
                                                <select
                                                    className="form-select form-select-sm col-5"
                                                    style={{ width: "120px" }}
                                                    aria-label="Small select example">
                                                    <option >
                                                        {appintment.status || "Status"}
                                                    </option>
                                                    <option value={"pending"}>
                                                        <button
                                                            className="btn btn-warning"
                                                            onClick={() => updateStatus("pending", appintment)}
                                                        >
                                                            Pending
                                                        </button>
                                                    </option>

                                                    <option value={"accepted"}>
                                                        <button className="btn btn-warning"
                                                            onClick={() => updateStatus("accepted", appintment)}
                                                        >
                                                            Accept
                                                        </button>
                                                    </option>
                                                </select>
                                                <button
                                                    className="btn btn-success col-5"
                                                    style={{ width: "100px" }}
                                                    onClick={() => {
                                                        showModal()
                                                        setSelected(appintment)
                                                    }}
                                                >See More</button>
                                            </div>
                                        </td>
                                    }
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
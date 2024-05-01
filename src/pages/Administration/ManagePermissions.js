

import React, { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../config";
import { Icon } from '@iconify/react';
import moment from "moment/moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, CardBody, CardHeader, Col, Container, Row, Label, Input, Modal, Progress, ModalBody, ModalHeader, ModalFooter, Table, Spinner } from 'reactstrap';

const ManagePermissions = () => {
    document.title = "Manage Permissions";
    const [tableData, setData] = useState([])
    const [feedDevices, setFeedDevices] = useState([])
    const [isNew, setIsNew] = useState(true)
    const [name, setName] = useState()
    const [definition, setDefinition] = useState()
    const [errors, setErrors] = useState()
    const [id, setId] = useState(null)


    useEffect(() => {
        updateData()
    }, [])

    const saveInfo = () => {
        axios.post(api.API_URL + "/api/addPermission", { isNew, id, name, definition })
            .then(res => {
                if (res && res.status === true) {
                    tog_backdrop()
                    updateData()
                    toast(`Permission ${isNew ? 'Added' : 'Updated'} Successfully`, { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' })

                }
            }).catch(err => {

            })
    }

    const updateData = () => {
        axios.get(api.API_URL + "/api/getPermissions")
            .then(res => {
                if (res && res.status === true)
                    setData(res.data)
            })
            .catch(err => console.log(err))
    }
    const deletePermission = async (val) => {
        if (window.confirm('Are you sure you wish to delete?')) {
            axios.delete(api.API_URL + "/api/deletePermission/" + val)
                .then(res => {
                    if (res && res.status === true) {
                        toast("Permission Deleted Successfully", { position: "top-right", hideProgressBar: true, closeOnClick: false, className: 'bg-success text-white' })

                        updateData()
                    } else {
                        setErrors(res);
                        console.log("permissions", "0", res)
                    }
                }).catch(err => {
                    setErrors(err);
                    console.log("permissions", "1", err)
                })
        }
    }

    const updateFields = (isNew, val) => {
        setIsNew(isNew)
        if (isNew) {
            setName("")
            setDefinition("")
            setId(0)
        }
        else {
            setName(val.name)
            setDefinition(val.definition)
            setId(val.id)
        }

        tog_backdrop()
    }
    const [modal_backdrop, setmodal_backdrop] = useState(false);
    function tog_backdrop() {
        setmodal_backdrop(!modal_backdrop);
    }

    return (
        <React.Fragment>
            <ToastContainer />
            {/* Static Backdrop Modal */}
            <Modal
                isOpen={modal_backdrop}
                toggle={() => {
                    tog_backdrop();
                }}
                backdrop={'static'}
                id="staticBackdrop"
                centered
            >
                <ModalHeader className="modal-title" id="staticBackdropLabel" toggle={() => {
                    tog_backdrop();
                }}>
                    {isNew ? 'Add' : 'Update'} Permission
                </ModalHeader>
                <ModalBody className="p-3">
                    <Row className="mt-2">
                        <Col xl={12}>
                            <label>Name:</label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xl={12}>
                            <label>Definition:</label>
                            <input type="text" name="definition" id="definition" value={definition} onChange={(e) => setDefinition(e.target.value)} placeholder="Definition" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xl={6}>
                            <button className="col-md-12 btn btn-success" onClick={saveInfo}>Save</button>

                        </Col>
                        <Col xl={6}>
                            <button className="col-md-12 btn btn-danger" onClick={() => {
                                tog_backdrop();
                            }}>Close</button>
                        </Col>
                    </Row>


                </ModalBody>
            </Modal>
            {/*  */}
            <div className="page-content">
                <Container fluid>

                    <Row>

                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col lg={6}>
                                            <h5 className="card-title mb-0">Manage Permissions</h5>
                                        </Col>
                                        <Col lg={6}>
                                            <h5 className="card-title mb-0 float-end">
                                                <Icon icon="ri:add-box-line"  color="light"  width="30" height="30" style={{ cursor: "pointer" }} onClick={() => updateFields(true, {})} />
                                            </h5>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <div className="table-responsive">
                                        <Table className="table-striped table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Definition</th>
                                                    <th scope="col">Creation Date</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (tableData && Object.keys(tableData).length > 0) ?
                                                        (tableData.map((val, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>{val.id}</td>
                                                                    <td>{val.name}</td>
                                                                    <td>{val.definition}</td>
                                                                    <td>{moment(val.createdAt).format('YYYY-MM-DD h:mm:ss a')}</td>
                                                                    <td>
                                                                        <Icon icon="ri:edit-fill" className="float-right" color="#a33" width="20" height="20" style={{ cursor: "pointer" }} onClick={() => updateFields(false, val)} />
                                                                        &nbsp;
                                                                        &nbsp;
                                                                        <Icon icon="ri:delete-bin-5-line" className="float-right" color="#a33" width="20" height="20" style={{ cursor: "pointer" }} onClick={() => deletePermission(val.id)} />

                                                                    </td>
                                                                </tr>

                                                            )
                                                        })) : <tr><td colSpan={8} align="center">No Permission Found</td></tr>
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};

export default ManagePermissions
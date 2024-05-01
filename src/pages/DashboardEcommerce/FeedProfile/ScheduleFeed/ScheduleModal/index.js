import { Col, Row, Card, Label, Input, Modal, Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { weekdays } from "moment/moment";
import React from "react";

import { Series } from '../../../../../Components/Common/Series';

import { FieldsbyTime } from './FieldsbyTime';
import { HoursMinutesDDL } from './HoursMinutesDDL';
import { useScheduleModal } from './hooks/useScheduleModal';

export const ScheduleModal = (props) => {

    const {
        title,
        quantity,
        saveInfo,
        feed_day,
        btnStatus,
        feed_time,
        setFeedDay,
        CloseModel,
        handleClick,
        setTimeHours,
        tog_backdrop,
        feedTimeType,
        execFeedTime,
        dayTimesData,
        setTimeMinute,
        feed_schedule,
        validateField,
        modal_backdrop,
        updateFeedTime,
        setHoursMinutesList,
        updateScheduleField,
    } = useScheduleModal(props)

    return (
        <Modal
            isOpen={modal_backdrop}
            toggle={tog_backdrop}
            backdrop={'static'}
            id="staticBackdrop"
            centered
            onLoad={() => {
                validateField();
                handleClick(feed_schedule)
            }}
        >
            <ModalHeader className="modal-title" id="staticBackdropLabel" toggle={CloseModel}>
                Feed Schedule
            </ModalHeader>
            <ModalBody className="p-3">
                <Row><span id="errorbox" style={{ color: "#c44", fontSize: "8px" }}></span></Row>
                <Row className="mt-2">
                    <Col xl={6}>
                        <label>Title:</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={title}
                            className="form-control"
                            placeholder="Set Schedule Name"
                            onChange={(e) => { validateField(); updateScheduleField('title', e.target.value); }}
                        />
                    </Col>
                    <Col xl={6}>
                        <label>Quantity:</label>
                        <input
                            type="text"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            className="form-control"
                            placeholder="Set Food Quantity"
                            onChange={(e) => { validateField(); updateScheduleField('quantity', e.target.value) }}
                        />
                    </Col>
                </Row>
                <Row className="mt-2">
                    {
                        dayTimesData.map(({name, imgTime, imgTimeC}) => (
                            <Col key={name} lg={4} >
                                <Card>
                                    <input type="radio" id={name} name="day_time" value={name} className="radio-input" onChange={(e) => {/** action here */}} />
                                    <label htmlFor={name} className="radio-label" id={`${name}_click`} onClick={() => handleClick(name)}>
                                        <img src={imgTime} style={{ width: "80px", height: "70px", margin: "0 auto" }} alt={name} />
                                        <img src={imgTimeC} alt={name} style={{ display: "none", width: "80px", height: "70px", margin: "0 auto" }} />
                                    </label>
                                    <h7 className="text-center">{name}</h7>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <Row >
                {
                    feed_schedule && feed_schedule !== "FixedTime" && (
                        ['before', 'after'].map(duration => (
                            <Col key={duration} xl={6}>
                                <div className="form-check form-radio-primary mb-3">
                                    <Input
                                        type="radio"
                                        value={duration}
                                        name="formradiocolor1"
                                        id={`formradio_${duration}`}
                                        className="form-check-input"
                                        defaultChecked={feedTimeType === duration}
                                        onChange={(e) => updateScheduleField('feedTimeType', e.target.value)}
                                    />
                                    <Label className="form-check-label" for={`formradio_${duration}`}>
                                        {duration.charAt(0).toUpperCase() + duration.slice(1)} {feed_schedule}
                                    </Label>
                                </div>
                            </Col>
                        ))
                    )
                }
                </Row>
                <Row >
                    <Col xl={12}>
                        <FieldsbyTime
                            feedTimeType={feedTimeType}
                            feed_schedule={feed_schedule}
                            TimesDropDown={
                                <select
                                    onChange={(e) => { validateField(); updateScheduleField('feed_time', e.target.value); }}
                                    className="form-select rounded-pill"
                                    value={feed_time}
                                    id="feed_time"
                                >
                                    <option value={""}>Please Select</option>
                                    <Series
                                        data={[1,15,30,45,60,120,180,240,300]}
                                        component={(val) => {
                                            const displayed = val >= 60
                                            ? { val:  val / 60, typ: 'hour' }
                                            : { val, typ: 'minute' }

                                            const singleOrPloral = displayed.val === 1 ? '' : 's'

                                            return (
                                                <option value={val}>
                                                    {feedTimeType} {displayed.val} {displayed.typ+singleOrPloral}
                                                </option>
                                            );
                                        }}
                                    />
                                </select>
                            }

                            FixedTime={
                                <div>
                                    <Row style={{marginBottom: '1.3rem'}}>
                                        {[0, 1].map((value) => (
                                            <Col key={value} xl={4}>
                                                <HoursMinutesDDL
                                                    type={value}
                                                    setTimeHours={setTimeHours}
                                                    setTimeMinute={setTimeMinute}
                                                />
                                            </Col>
                                        ))}
                                        <Col xl={4} style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <Button color="primary" className="btn-icon rounded-pill" onClick={() => {updateFeedTime(); validateField();}}> <i className="ri-add-fill" /></Button>
                                            <Button color="danger" className="btn-icon rounded-pill" onClick={() => setHoursMinutesList([])}> <i className=" ri-delete-back-2-fill" /></Button>
                                            <Button color="success" className="btn-icon rounded-pill" onClick={() => execFeedTime()}> <i className="  ri-check-fill" /></Button>
                                        </Col>
                                    </Row>

                                    <input type="text" value={feed_time} onChange={(e) => { validateField(); updateScheduleField('feed_time', e.target.value) }} id="feed_time" placeholder="Fixed Time" name="feed_time" className="form-control" />
                                    <span id="time-error" style={{ color: "#c44", fontSize: "8px" }}></span>
                                </div >
                            }
                        />
                    </Col>
                </Row>
                <Row className="mt-3">
                    {
                        [...weekdays().slice(1), weekdays()[0]].map(day => {
                            const dayAbbr = day.slice(0, 3);

                            return (
                                <Col key={day} xl={3}>
                                    <div className="form-check form-check-success mb-3">
                                        <Input
                                            value={dayAbbr}
                                            type="checkbox"
                                            className="form-check-input"
                                            defaultChecked={feed_day.includes(dayAbbr)}
                                            id={`formcheck_${dayAbbr.toLocaleLowerCase()}`}
                                            onChange={({target: {value}}) => setFeedDay(value)}
                                        />
                                        <Label className="form-check-label" for={`formcheck_${dayAbbr.toLocaleLowerCase()}`}>{day}</Label>
                                    </div>
                                </Col>
                            )
                    })
                    }
                </Row>
            </ModalBody>
            <ModalFooter>
                <div className="hstack gap-2 justify-content-center">
                    <button className="btn btn-success" disabled={!btnStatus} onClick={saveInfo}>Save Schedule</button>
                    <button className="btn btn-danger" onClick={CloseModel}>Close</button>
                </div>
            </ModalFooter>
        </Modal>
    );
};
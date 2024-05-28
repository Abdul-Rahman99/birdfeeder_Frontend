import React from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Container } from "reactstrap";
import { Icon } from "@iconify/react";

import { ecomWidgets } from "../../common/data";
import { useState } from "react";

const SensorStatus = (props) => {
  /*
    temp1, 1<25.80>1
hum1, 2<43.90>2,
temp2, 3<26.00>3,
hum2, 4<43.30>4,
ping_dist, 5<61.53>5,
ir_dist, 6<85>6,
vl_dist, 7<6553>7,
bty_volt_f, 8<11.49>8,
solar_volt_f, 9<0.13>9,
bty_current_ma, 10<-50>10,
solar_current_ma, 12<-275>12,
motor_current_ma, 13<-450>13,
pitch, 14<-50.20>14,
roll, 15<-18.01>15,
imu_vib_x, 16<0.00,0.00,0.00>16,
imu_vib_y, 16<0.00,0.00,0.00>16,
imu_vib_z, 16<0.00,0.00,0.00>16,
imu_vib_g, 17<0.00>17,
peak_res, 18<0.37>18,

    */

  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">Sensor Health</h4>
              </CardHeader>
              <div className="card-body">
                <Row>
                  <Col xl={3} md={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Feed Level
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            {props.pingDist > 0 && props.pingDist <= 255
                              ? props.pingDist >= 255
                                ? "-1"
                                : props.pingDist
                              : 0}
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xl={3} md={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Feed Percentage
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            {props.irDist > 0 && props.irDist <= 255
                              ? props.irDist >= 255
                                ? "-1"
                                : props.irDist + "% <"
                              : 0}
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={3} md={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Feed Level
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={"cm"}
                                separator={""}
                                end={props.vlDist}
                                decimals={"2"}
                                duration={0.1}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={3} md={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Battery Status
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={"V"}
                                separator={""}
                                end={props.btyVolt}
                                decimals={"2"}
                                duration={0.1}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xl={3} md={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Solar Status
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={"V"}
                                separator={""}
                                end={props.solarVolt}
                                decimals={"2"}
                                duration={0.1}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={3} md={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Battery Current
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={"mA"}
                                separator={""}
                                end={props.btyCur}
                                decimals={"2"}
                                duration={0.1}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={3} md={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Solar Current
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={"mA"}
                                separator={""}
                                end={props.solarCur}
                                decimals={"2"}
                                duration={0.1}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={3} md={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Motor Current
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={"mA"}
                                separator={""}
                                end={props.motorCur}
                                decimals={"2"}
                                duration={0.1}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xl={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Temperature 1
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={" &#176;c"}
                                separator={" "}
                                end={props.temp1}
                                decimals={""}
                                duration={0.2}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col xl={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Temperature 2
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={" &#176;c"}
                                separator={" "}
                                end={props.temp2}
                                decimals={""}
                                duration={0.2}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Humidity 1
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={"%"}
                                separator={" "}
                                end={props.hum1}
                                decimals={""}
                                duration={0.2}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl={3}>
                    <Card className="card-animate">
                      <CardBody>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase d-flex align-items-center justify-content-center">
                              Humidity 2
                            </p>
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-1">
                          <h4 className="fs-22 fw-semibold ff-secondary mb-1">
                            <span
                              className="counter-value"
                              data-target="559.25"
                            >
                              <CountUp
                                start={0}
                                prefix={""}
                                suffix={"%"}
                                separator={" "}
                                end={props.hum2}
                                decimals={""}
                                duration={0.2}
                              />
                            </span>
                          </h4>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default SensorStatus;

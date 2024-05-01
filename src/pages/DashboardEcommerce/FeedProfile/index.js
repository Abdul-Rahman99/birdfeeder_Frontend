import { Container, Row } from 'reactstrap';
import React, { useState } from "react";

import {
    useFeeder,
    useSocket,
    useEnvInfo,
    useCameras,
    useFeedProfileMainInfo,
} from './hooks';
import { Charts } from './Charts';
import { EnvInfo } from './EnvInfo';
import { Cameras } from './Cameras';
import { FeedInfo } from './FeedInfo';
import SensorStatus from '../SensorStatus';
import { ScheduleFeed } from './ScheduleFeed';

import '../../../assets/scss/timer.css';
import "../../../assets/scss/tank.css";



const FeedProfile = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [isExpired, setIsExpired] = useState();

    const { userId, currentFeederId } = useFeedProfileMainInfo()
    const { camPic, camPic2, updateCameras } = useCameras(currentFeederId)
    const { weatherInfo, deviceDetail, getDeviceDetails } = useEnvInfo(currentFeederId)

    const {
        handleFeederUpdate,
        getFeedsTimings,
        getSensorData,
        tankCapacity,
        feederData,
        lastDate,
        lastTime,
    } = useFeeder({
        currentFeederId,
        setShowLoader,
        showLoader,
    })

    useSocket({
        updateCameras,
        getSensorData,
        getFeedsTimings,
        getDeviceDetails,
        handleFeederUpdate,
    });

    return (
        <div className="page-content">
            <Container fluid>
                <EnvInfo
                    weatherInfo={weatherInfo}
                    deviceDetail={deviceDetail}
                />
                <Cameras
                    camPic={camPic}
                    camPic2={camPic2}
                />
                <FeedInfo 
                    lastTime={lastTime}
                    lastDate={lastDate}
                    isExpired={isExpired}
                    feederData={feederData}
                    tankCapacity={tankCapacity}
                    currentFeederId={currentFeederId}
                />
                <ScheduleFeed
                    userId={userId}
                    showLoader={showLoader}
                    setIsExpired={setIsExpired}
                    setShowLoader={setShowLoader}
                    currentFeederId={currentFeederId}
                />
                <Charts currentFeederId={currentFeederId} />
                <Row><SensorStatus {...feederData} /></Row>
            </Container>
        </div >
    );
};

export default FeedProfile
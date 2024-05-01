import { useState, useEffect } from "react";
import moment from "moment";

import {
  getExportedDataApi,
  getBirdsDataForGraphApi,
  getFeedConsumptionDataApi,
} from "../../../../../services/feedProfile.services";

export function useChartsProvider(currentFeederId) {
  const [FilterTypeBirdsNew, setFilterTypeBirdsNew] = useState("Daily")
  const [birdsPieDataForGraph, setBirdsPieDataForGraph] = useState()
  const [feedConsumptionData, setFeedConsumptionData] = useState()
  const [dateRangeBirdsNew, setDateRangeBirdsNew] = useState()
  const [birdsDataForGraph, setBirdsDataForGraph] = useState()
  const [myGraphLoader, setMyGraphLoader] = useState(false)
  const [filterType, setFilterType] = useState("Days")
  const [dateRangeNew, setDateRangeNew] = useState([])

  useEffect(() => {
    setUpDefaultDateRange();
    getFeedConsumptionData();
    getBirdsDataForGraph();
}, [currentFeederId])

  const getFormatted = (str) => {
    let newDate = str.getFullYear() + "-" + (str.getMonth() + 1) + "-" + str.getDate();
    return newDate;
  }

  const setUpDefaultDateRange = () => {
    let date_now = new Date();
    let date_pre = date_now - 604800000;

    date_now = new Date(date_now)
    date_pre = new Date(date_pre)

    let sdatefrom = getFormatted(date_pre);
    let sdateto = getFormatted(date_now);

    setDateRangeNew([...dateRangeNew, sdatefrom, sdateto])
    setDateRangeBirdsNew([sdateto])
  }

  const getBirdsDataForGraph = () => {
      if (dateRangeBirdsNew && dateRangeBirdsNew.length > 0 && FilterTypeBirdsNew && FilterTypeBirdsNew !== "" && FilterTypeBirdsNew !== "0") {
          let dateF = moment(dateRangeBirdsNew[0]).format("YYYY-MM-DD");
          
          setMyGraphLoader(true)
          getBirdsDataForGraphApi(currentFeederId, {date: dateF, filter: FilterTypeBirdsNew})
              .then(res => {
                  setMyGraphLoader(false)
                  setBirdsDataForGraph(res.data)
                  setBirdsPieDataForGraph(res.birdspiedata)

              })
      } else {
          setMyGraphLoader(true)
          getBirdsDataForGraphApi(currentFeederId)
              .then(res => {
                  setMyGraphLoader(false)
                  setBirdsDataForGraph(res.data)
                  setBirdsPieDataForGraph(res.birdspiedata)
              })

      }
  }

  const getExportedData = () => {
    if (dateRangeBirdsNew && dateRangeBirdsNew.length > 0) {
        let dateF = moment(dateRangeBirdsNew[0]).format("YYYY-MM-DD");
        getExportedDataApi(currentFeederId, dateF)
            .then(res => {

            })
            .catch(err => console.log(err))
    } else {
        setMyGraphLoader(true)
        getExportedDataApi(currentFeederId)
            .then(res => {

            })
            .catch(err => console.log(err))
    }
}

  const getFeedConsumptionData = () => {
    if (filterType && filterType !== "0" && filterType !== "undefined" && dateRangeNew && dateRangeNew.length === 2) {
        let dateF = moment(dateRangeNew[0]).format("YYYY-MM-DD");
        let dateT = moment(dateRangeNew[1]).format("YYYY-MM-DD");
        setMyGraphLoader(true)
        getFeedConsumptionDataApi(currentFeederId, {dateFrom: dateF, dateTo: dateT, filter: filterType})
            .then(res => {
                setMyGraphLoader(false)
                setFeedConsumptionData(res)
            })
    } else {
        setMyGraphLoader(true)
        getFeedConsumptionDataApi(currentFeederId)
            .then(res => {
                setMyGraphLoader(false)
                setFeedConsumptionData(res)
            })
    }

  }
  
  return {
    filterType,
    setFilterType,
    myGraphLoader,
    setMyGraphLoader,
    dateRangeNew,
    setDateRangeNew,
    dateRangeBirdsNew,
    setDateRangeBirdsNew,
    getExportedData,
    birdsDataForGraph,
    setBirdsDataForGraph,
    birdsPieDataForGraph,
    setBirdsPieDataForGraph,
    FilterTypeBirdsNew,
    setFilterTypeBirdsNew,
    feedConsumptionData,
    setFeedConsumptionData,
    setUpDefaultDateRange,
    getBirdsDataForGraph,
    getFeedConsumptionData,
  }
}
import {useEffect, useState} from 'react'
import {ChevronLeft, ChevronRight, RefreshCcw} from 'react-feather'
import {Button, Card, CardBody, Col, Row} from 'reactstrap'
import TimeCard from '../component/footwork/TimeCard'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import useFetchUrl from "../../utility/UseFetchUrl"
import netConfig from '@configs/netConfig'
import {useStartDay} from "@startUtils"
import {addStr} from '@utils'

const FootWork = () => {

    const [data, setData] = useState(null)
    const [totalWeek, setTotalWeek] = useState(null)
    const [today, setToday] = useState(null)
    const [timeSheet, setTimeSheet] = useState(null)
    const [weekOfToday, setWeekOfToday] = useState(0)
    const requestBody = {weekOfToday}

    const refresh = async () => {
        // data.resultData.timeSheet = null
        const d = await useFetchUrl("/api/v1/personnel/footwork/week", "PATCH", requestBody)
        console.log(d)
        if (d.code === netConfig.okStatus) {
            setTimeSheet(d.resultData.timeSheet)
            setTotalWeek(d.resultData.totalWeek)
        }
    }

    const useStart = useStartDay('FootWork', refresh)

    const refreshToDay = (today) => {
        if (today) useStart.refresh('FootWork')
    }

    const nextWeek = async () => {
        setData(null)
        const page = weekOfToday + 1
        setWeekOfToday(page)
        const d = await useFetchUrl("/api/v1/personnel/footwork/week", "PATCH", {weekOfToday: page})
        setData(d)
        setTimeSheet(d.resultData.timeSheet)
        setTotalWeek(d.resultData.totalWeek)
    }

    const previousWeek = async () => {
        setData(null)
        const page = weekOfToday - 1
        setWeekOfToday(page)
        const d = await useFetchUrl("/api/v1/personnel/footwork/week", "PATCH", {weekOfToday: page})
        setData(d)
        setTimeSheet(d.resultData.timeSheet)
        setTotalWeek(d.resultData.totalWeek)

    }

    useEffect(async () => {
            const d = await useFetchUrl("/api/v1/personnel/footwork/week", "PATCH", requestBody)
            setData(d)
            setTimeSheet(d.resultData.timeSheet)
            setTotalWeek(d.resultData.totalWeek)
            setToday(d.resultData.toDay)
        }, []
    )

    return (
        <Card className='foot-work'>
            <UILoader blocking={!data} loader={<Spinner/>}>
                <CardBody>
                    {data &&
                        <Row>
                            <Col lg='3' md='6' sm='12'>
                                <Button className='btn-icon rounded-circle'
                                        onClick={refresh}
                                        color='flat-primary'>
                                    <RefreshCcw size={25}/>
                                </Button>
                            </Col>
                            <Col lg='6' md='8' sm='12' className='my-auto'>
                                <Row>
                                    <Col className='text-end vertical-divider-left my-auto'>
                                        <h6>جمع هفته</h6>
                                    </Col>
                                    <Col className='my-auto'>
                                        <h6>{totalWeek && addStr(totalWeek, 2, ":")}</h6>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg='3' md='4' sm='12' className='text-end'>
                                <Button className='btn-icon rounded-circle' color='flat-primary'
                                        onClick={previousWeek}>
                                    <ChevronRight size={24}/>
                                </Button>
                                {data && data.resultData && data.resultData.fromTo}
                                <Button className='btn-icon rounded-circle' color='flat-primary' onClick={nextWeek}>
                                    <ChevronLeft size={24}/>
                                </Button>
                            </Col>
                        </Row>
                    }
                </CardBody>
                <CardBody className='foot-work-week-sheet'>
                    <Row>
                        {timeSheet && timeSheet.map((item) => (
                            <Col key={item && `day-${item.date}${Math.floor(Math.random() * 100)}`}>
                                <TimeCard data={item && item} today={item.date === today}
                                          refreshToDay={refreshToDay} refresh={refresh}/>
                            </Col>
                        ))}
                    </Row>
                </CardBody>
            </UILoader>
        </Card>
    )
}
export default FootWork

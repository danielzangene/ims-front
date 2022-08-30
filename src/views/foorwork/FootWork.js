import {useEffect, useState} from 'react'
import {ChevronLeft, ChevronRight} from 'react-feather'
import {Button, Card, CardBody, Col, Row} from 'reactstrap'
import TimeCard from './component/TimeCard'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import useFetchUrl from "../../utility/UseFetchUrl"
import netConfig from '@configs/netConfig'
import {useStartDay} from "@startUtils"
import {animated, useSpring} from 'react-spring'
import {showErrorToast} from "../../utility/ToastUtils"

const FootWork = () => {

    const [data, setData] = useState(null)
    const [totalWeek, setTotalWeek] = useState(null)
    const [today, setToday] = useState(null)
    const [timeSheet, setTimeSheet] = useState(null)
    const [weekOfToday, setWeekOfToday] = useState(0)
    const requestBody = {weekOfToday}
    const styles = useSpring({
        opacity: data ? 1 : 0,
        x: data ? 0 : 50
    })

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
            if (netConfig.okStatus === d.code) {
                setData(d)
                setTimeSheet(d.resultData && d.resultData.timeSheet)
                setTotalWeek(d.resultData && d.resultData.totalWeek)
                setToday(d.resultData && d.resultData.toDay)
            } else {
                showErrorToast(d.message)
            }
        }, []
    )

    return (
        <Card className='foot-work'>
            <UILoader blocking={!data} loader={<Spinner/>}>
                <animated.div style={styles}>
                    <CardBody className='pb-0'>
                        {data &&
                            <Row>
                                <Col className='col-2'>
                                    <Button className='btn-icon rounded-circle' color='flat-primary'
                                            onClick={previousWeek}>
                                        <ChevronRight size={24}/>
                                    </Button>
                                </Col>
                                <Col className='col-8 my-auto text-center align-middle'>
                                    <div>
                                        <h6>{totalWeek && `جمع هفته    |    ${totalWeek}`}</h6>
                                        <small
                                            className='text-muted'>{data && data.resultData && data.resultData.fromTo}</small>
                                    </div>
                                </Col>
                                <Col className='text-end col-2'>
                                    <Button className='btn-icon rounded-circle' color='flat-primary' onClick={nextWeek}>
                                        <ChevronLeft size={24}/>
                                    </Button>
                                </Col>
                            </Row>
                        }
                    </CardBody>
                    <CardBody className='foot-work-week-sheet'>
                        <Row className='seven-cols'>
                            {timeSheet && timeSheet.map((item) => (
                                <div key={item && `day-${item.date}${Math.floor(Math.random() * 100)}`} className='col-1-1'>
                                    <TimeCard data={item && item} today={item.date === today}
                                              refreshToDay={refreshToDay} refresh={refresh}/>
                                </div>
                            ))}
                        </Row>
                    </CardBody>
                </animated.div>
            </UILoader>
        </Card>
    )
}
export default FootWork

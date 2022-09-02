import {Button, Card, CardBody, Col, Modal, ModalBody, ModalHeader, Row} from 'reactstrap'
import {useEffect, useState} from 'react'
import {ChevronLeft, ChevronRight} from 'react-feather'
import DiningItem from "./Item"
import netConfig from '@configs/netConfig'
import useFetchUrl from "../../utility/UseFetchUrl"
import {showErrorToast} from "../../utility/ToastUtils"
import Spinner from '@components/spinner/Loading-spinner'
import UILoader from '@components/ui-loader'
import {animated, useSpring} from 'react-spring'


const Dining = () => {
    // const [isPending, setIsPending] = useState(false)

    const [data, setData] = useState(null)
    const [selectedDay, setSelectedDay] = useState(null)
    const [monthFromNow, setMonthFromNow] = useState(0)
    const [visisble, setVisible] = useState(false)
    const [show, setShow] = useState(true)
    const [blockWindow] = useState(false)


    const refresh = async (threshold) => {

        const d = await useFetchUrl("/api/v1/personnel/dining/month", "PATCH", {monthFromNow: threshold})
        console.log(d)
        if (d.code === netConfig.okStatus) {

            setVisible(false)
            setTimeout(() => {
                setData(d)
                setVisible(true)
            }, 100)
            return true
        } else {
            showErrorToast(d.message)
            return false
        }
    }

    const previousWeek = async () => {
        const threshold = monthFromNow - 1
        setMonthFromNow(threshold)
        const isSuccess = await refresh(threshold)
        if (!isSuccess) setMonthFromNow(threshold + 1)
    }

    const nextWeek = async () => {
        const threshold = monthFromNow + 1
        setMonthFromNow(threshold)
        const isSuccess = await refresh(threshold)
        if (!isSuccess) setMonthFromNow(threshold - 1)

    }

    useEffect(async () => {
        await refresh(monthFromNow)
    }, [])

    const showSelectedDayModal = (day) => {
        if (window.innerWidth < 960) {
            setSelectedDay(null)
            setSelectedDay(day)
            setShow(true)
        }
    }

    useEffect(async () => {
        console.log(selectedDay)
    }, [selectedDay])

    const styles = useSpring({
        opacity: visisble ? 1 : 0,
        x: visisble ? 0 : 24
    })

    return (
        <Card>
            <CardBody>
                {data &&
                    <Row>
                        <Col className='text-start col-2'>
                            <Button className='btn-icon rounded-circle' color='flat-primary'
                                    onClick={previousWeek}>
                                <ChevronRight size={24}/>
                            </Button>
                        </Col>
                        <Col className='col-8 my-auto text-center align-middle'>
                            <h4>{data && data.resultData.month}</h4>
                        </Col>
                        <Col className='text-end col-2'>
                            <Button className='btn-icon rounded-circle' color='flat-primary' onClick={nextWeek}>
                                <ChevronLeft size={24}/>
                            </Button>
                        </Col>
                    </Row>
                }

                {data && data.resultData.days.map((item) => (
                    <animated.div style={styles} key={`_${item.date}`}>
                        <div>
                            <Row className=' align-items-center pt-1 border-bottom'>
                                <Col className='d-flex justify-content-center col-lg-3 col-md-12 col-sm-12 col-xs-12'>
                                    <Button color={item.enable ? 'flat-primary' : ''} disabled={!item.enable}
                                            className='pb-1 waves-effect btn btn-outline-none' block
                                            onClick={() => {
                                                showSelectedDayModal(item)
                                            }}>
                                        {item.formattedDate}
                                    </Button>
                                </Col>
                                <Col className='d-flex justify-content-center col-lg-3 col-md-4 d-none d-md-block'>
                                    <DiningItem date={item.date} formattedDate={item.formattedDate} enable={item.enable}
                                                foodType={0}/>
                                </Col>
                                <Col className='d-flex justify-content-center col-lg-3 col-md-4 d-none d-md-block'>
                                    <DiningItem date={item.date} formattedDate={item.formattedDate} enable={item.enable}
                                                foodType={1}/>
                                </Col>
                                <Col className='d-flex justify-content-center col-lg-3 col-md-4 d-none d-md-block'>
                                    <DiningItem date={item.date} formattedDate={item.formattedDate} enable={item.enable}
                                                foodType={2}/>
                                </Col>
                            </Row>
                        </div>
                    </animated.div>
                ))}
            </CardBody>
            {selectedDay &&
                <Modal
                    isOpen={show}
                    toggle={() => setShow(!show)}
                    className='modal-dialog-centered modal-sm'
                >
                    <UILoader blocking={blockWindow} loader={<Spinner/>}>
                        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                        <ModalBody className='px-sm-5 mx-50 pb-5'>
                            <h3 className='text-center mb-2 '>{selectedDay.formattedDate}</h3>
                            <DiningItem date={selectedDay.date} formattedDate={selectedDay.formattedDate}
                                        enable={selectedDay.enable} foodType={0}/>
                            <DiningItem date={selectedDay.date} formattedDate={selectedDay.formattedDate}
                                        enable={selectedDay.enable} foodType={1}/>
                            <DiningItem date={selectedDay.date} formattedDate={selectedDay.formattedDate}
                                        enable={selectedDay.enable} foodType={2}/>
                        </ModalBody>
                    </UILoader>
                </Modal>
            }
        </Card>
    )
}

export default Dining

import {Fragment, useState} from 'react'
import {Minus, Plus} from 'react-feather'
import {Button, CardBody, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row} from 'reactstrap'
import InputNumber from 'rc-input-number'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import '@styles/react/libs/input-number/input-number.scss'
import TimeCardLog from "./TimeCardLog"

const TimeCard = ({data}) => {
    const [show, setShow] = useState(false)
    const [timeData, setTimeDate] = useState({...data})
    const [blockWindow, setBlockWindow] = useState(false)
    const [blockCard, setBlockCard] = useState(false)

    const [id, setId] = useState(null)
    const [min, setMin] = useState()
    const [hour, setHour] = useState()
    const [desc, setDesc] = useState()

    const [formattedDate] = useState(data.formattedDate)

    const log = {hour, min, desc}

    function addNewLogWindow() {
        setId(null)
        const date = new Date()
        setMin(date.getMinutes())
        setHour(date.getHours())
        setShow(true)
    }

    function editLogWindow(logId, h, m, d) {
        setId(logId)
        setMin(m)
        setHour(h)
        setDesc(d)
        setShow(true)
    }

    const editFootLog = logId => {
        const targetLog = timeData.footWork.find(l => l.id === logId)
        const splittedTime = targetLog.log.split(":")
        editLogWindow(logId, parseInt(splittedTime[0]), parseInt(splittedTime[1]), targetLog.desc)
    }

    const deleteFootLog = id => {
        setBlockCard(true)
        setTimeout(function () {
            setBlockCard(false)
            timeData.footWork = timeData.footWork.filter(log => log.id !== id)
            setTimeDate({...timeData})
        }, 1000)
    }

    const logActions = {
        deleteLog: deleteFootLog,
        editLog: editFootLog
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setBlockWindow(true)
        // fetch
        // spinner
        //cancel disable
        // toast
        //
        setTimeout(function () {
            setBlockWindow(false)
            setShow(false)
        }, 1000)
        const footLog = {
            id: id ? id : Math.floor(Math.random() * 10000),
            log: `${String(log.hour).padStart(2, '0')}:${String(log.min).padStart(2, '0')}`,
            desc: log.desc
        }
        let footWork = id ? timeData.footWork.filter(log => log.id !== id) : timeData.footWork
        footWork = [...footWork, footLog]
        timeData.footWork = [...footWork]
    }

    return (
        <Fragment>
            <CardBody className='time-card-body'>
                <UILoader blocking={blockCard}>
                <div
                    className={timeData && timeData.off ? 'text-center time-card-header bg-light-danger rounded' : 'text-center bg-text-center time-card-header bg-light-primary rounded'}>
                    <div>
                        <p className='text-dark'>{formattedDate}</p>
                        <small className='text-muted'>{timeData && timeData.workTime}</small>
                    </div>
                </div>
                </UILoader>
                <div className='foot-work-details'>
                    {timeData && timeData.footWork && timeData.footWork.map((item, index) => (
                        <div key={item && `log-${item.log}`}>
                            <TimeCardLog data={item} index={index} logActions={logActions}/>
                        </div>
                    ))}
                </div>
                <div className='d-grid'>
                    <Button color='flat-success round mt-1' onClick={addNewLogWindow}>
                        <Plus size={14}/>
                    </Button>
                </div>
            </CardBody>
            <Modal
                isOpen={show}
                toggle={() => setShow(!show)}
                className='modal-dialog-centered modal-sm'
            >
                <UILoader blocking={blockWindow} loader={<Spinner/>}>
                    <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                    <ModalBody className='px-sm-5 mx-50 pb-5'>
                        <h1 className='text-center mb-3 '>{formattedDate}</h1>
                        <Form onSubmit={onSubmit}>
                            <Row className='mb-1'>
                                <Col lg='2' md='2' sm='2' xs='2'>
                                    <Label sm={2} for='min-input'>
                                        ساعت
                                    </Label>
                                </Col>
                                <Col lg='5' md='5' sm='5' xs='5'>
                                    <InputNumber id='min-input' max={59} min={0}
                                                 defaultValue={min && min}
                                                 onChange={value => setMin(value)}
                                                 upHandler={<Plus/>}
                                                 downHandler={<Minus/>}/>
                                </Col>
                                <Col lg='5' md='5' sm='5' xs='5'>
                                    <InputNumber id='hour-input' max={23} min={0}
                                                 defaultValue={hour && hour}
                                                 onChange={value => setHour(value)}
                                                 upHandler={<Plus/>}
                                                 downHandler={<Minus/>}/>
                                </Col>
                            </Row>
                            <Row>
                                <Input type='textarea' name='desc'
                                       onChange={(e) => setDesc(e.target.value)}
                                       rows='3'
                                       maxLength={10}
                                       defaultValue={desc && desc}
                                       placeholder='شرح کارکرد'/>
                            </Row>
                            <Row className='mt-1'>
                                <Col lg='6' md='6' sm='6' xs='6'>
                                    <Button type='submit' color='primary' block>
                                        ثبت
                                    </Button>
                                </Col>
                                <Col lg='6' md='6' sm='6' xs='6'>
                                    <Button color='secondary' block outline onClick={() => {
                                        setShow(false)
                                    }}>
                                        لغو
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </UILoader>
            </Modal>
        </Fragment>
    )
}

export default TimeCard

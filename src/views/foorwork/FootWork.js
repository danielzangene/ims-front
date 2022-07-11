import {useEffect, useState} from 'react'
import {ChevronLeft, ChevronRight, RefreshCcw} from 'react-feather'
import {Button, Card, CardBody, Col, Row} from 'reactstrap'
import TimeCard from '../component/footwork/TimeCard'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'

const FootWork = () => {
    const [data, setData] = useState(null)

    const refresh = () => {
        const oldData = data
        console.log(oldData)
        setData(null)
        setTimeout(function () {
            data.totalWeek = '05:55'
            setData(JSON.parse(JSON.stringify(data)))
        }, 2000)
    }

    const nextWeek = () => {
        refresh()
    }

    const previousWeek = () => {
        refresh()
    }

    useEffect(() => {
            const d = {
                toDay: '1401/04/15',
                firstDayOfWeek: '1401/04/15',
                totalMonth: '12:20',
                totalWeek: '05:00',
                persianMonth: 'تیر',
                fromTo: '11 تا 17 تیر',
                timeSheet: [
                    {
                        id: 1,
                        date: '1401/04/11',
                        workTime: '00:00',
                        formattedDate: 'شنبه 11 تیر',
                        off: false,
                        footWork: [
                            {
                                id: 15,
                                log: '08:30',
                                desc: 'desc'
                            },
                            {
                                id: 16,
                                log: '12:30',
                                desc: 'desc'
                            },
                            {
                                id: 17,
                                log: '13:40',
                                desc: 'desc'
                            },
                            {
                                id: 18,
                                log: '18:30',
                                desc: 'desc'
                            }
                        ]
                    },
                    {
                        date: '1401/04/12',
                        workTime: '00:00',
                        formattedDate: 'یک‌شنبه 12 تیر',
                        off: false,
                        footWork: [
                            {
                                id: 1,
                                log: '08:31',
                                desc: 'desc'
                            },
                            {
                                id: 2,
                                log: '12:31',
                                desc: 'desc'
                            },
                            {
                                id: 3,
                                log: '13:41',
                                desc: 'desc'
                            },
                            {
                                id: 5,
                                log: '14:51',
                                desc: 'desc'
                            },
                            {
                                id: 4,
                                log: '14:11',
                                desc: 'desc'
                            }
                        ]
                    },
                    {
                        date: '1401/04/13',
                        workTime: '00:00',
                        formattedDate: 'دوشنبه 13 تیر',
                        off: true,
                        footWork: [
                            {
                                id: 7,
                                log: '08:00',
                                desc: 'desc'
                            },
                            {
                                id: 8,
                                log: '17:30',
                                desc: 'desc'
                            }
                        ]
                    },
                    {
                        date: '1401/04/14',
                        workTime: '00:00',
                        formattedDate: 'سه‌شنبه 13 تیر',
                        off: false,
                        footWork: [
                            {
                                id: 9,
                                log: '09:11',
                                desc: 'desc'
                            },
                            {
                                id: 10,
                                log: '17:31',
                                desc: 'desc'
                            }
                        ]
                    },
                    {
                        date: '1401/04/15',
                        workTime: '00:00',
                        formattedDate: 'چهارشنبه 14 تیر',
                        off: false,
                        footWork: [
                            {
                                id: 11,
                                log: '08:32',
                                desc: 'desc'
                            },
                            {
                                id: 12,
                                log: '18:05',
                                desc: 'desc'
                            }
                        ]
                    },
                    {
                        date: '1401/04/16',
                        workTime: '00:00',
                        formattedDate: 'پنج‌شنبه 15 تیر',
                        off: false,
                        footWork: [
                            {
                                id: 13,
                                log: '08:33',
                                desc: 'desc'
                            },
                            {
                                id: 14,
                                log: '12:35',
                                desc: 'desc'
                            }
                        ]
                    },
                    {
                        date: '1401/04/17',
                        workTime: '00: 00',
                        formattedDate: 'جمعه 16 تیر',
                        off: true,
                        footWork: []
                    }
                ]
            }
            setTimeout(function () {
                setData(d)
            }, 1000)

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
                            <Col lg='6' md='8' sm='12'>
                                <Row>
                                    <Col className='text-end vertical-divider-left'>
                                        <div className='text-end'>
                                            <div>
                                                <h6>جمع هفته</h6>
                                                <small className='text-muted'>{data && data.totalWeek}</small>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col>
                                        <div>
                                            <div>
                                                <h6>جمع کل <small
                                                    className='text-muted pl-1'>( {data && data.persianMonth} ماه
                                                    )</small></h6>
                                                <small className='text-muted'>{data && data.totalMonth}</small>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg='3' md='4' sm='12' className='text-end'>
                                <Button className='btn-icon rounded-circle' color='flat-primary'
                                        onClick={previousWeek}>
                                    <ChevronRight size={24}/>
                                </Button>
                                {data && data.fromTo}
                                <Button className='btn-icon rounded-circle' color='flat-primary' onClick={nextWeek}>
                                    <ChevronLeft size={24}/>
                                </Button>
                            </Col>
                        </Row>
                    }
                </CardBody>
                <CardBody className='foot-work-week-sheet'>
                    <Row>
                        {data && data.timeSheet.map((item) => (
                            <Col key={item && `day-${item.date}${Math.floor(Math.random() * 100)}`}>
                                <TimeCard data={item && item} isToDay={item.date === data.toDay}/>
                            </Col>
                        ))}
                    </Row>
                </CardBody>
            </UILoader>
        </Card>
    )
}
export default FootWork

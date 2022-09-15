import {Fragment, useEffect, useState} from 'react'
import {Card, CardBody, Col, Row, Table} from 'reactstrap'
import Spinner from '@components/spinner/Loading-spinner'
import UILoader from '@components/ui-loader'
import netConfig from '@configs/netConfig'
import useFetchUrl from "../../utility/UseFetchUrl"
import {showErrorToast} from "../../utility/ToastUtils"
import useWindowSize from "../../utility/useWindowSize"

const FiscalPeriod = () => {

    const [data, setData] = useState(null)
    const windowSize = useWindowSize()


    const refresh = async () => {

        const d = await useFetchUrl("/api/v1/personnel/fiscal/month", "PATCH", {monthFromNow: 0})
        console.log(d)
        if (d.code === netConfig.okStatus) {
            setData(d)
        } else {
            showErrorToast(d.message)
        }
    }


    useEffect(async () => {
        await refresh()
    }, [])

    const renderData = () => {
        return data.resultData.days.map((item) => {
            const dayType = item.off ? "text-danger" : ""
            return (
                <tr className='' key={item.date}>
                    <td className={`text-center ${dayType}`}>{item.formattedDate}</td>
                    <td className='align-middle text-success'>{item.totalDayLog !== "00:00" ? item.totalDayLog : ""}</td>
                    <td className='align-middle text-warning'>{item.totalDayLeave !== "00:00" ? item.totalDayLeave : ""}</td>
                </tr>
            )
        })
    }

    return (
        <Card>
            <CardBody>
                {data &&
                    <Row className='pb-1'>
                        {/*
                        <Col className='text-start col-2'>
                            <Button className='btn-icon rounded-circle' color='flat-primary'
                                // onClick={previousWeek}
                            >
                                <ChevronRight size={24}/>
                            </Button>
                        </Col>
*/}
                        <Col className='col-12 my-auto text-center align-middle'>
                            <h4>{data && data.resultData.month}</h4>
                        </Col>
                        {/*
                        <Col className='text-end col-2'>
                            <Button className='btn-icon rounded-circle' color='flat-primary'
                                // onClick={nextWeek}
                            >
                                <ChevronLeft size={24}/>
                            </Button>
                        </Col>
*/}
                    </Row>
                }

                <UILoader blocking={!data} loader={<Spinner/>}>
                    {data &&
                        <div className='pb-2'>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th className='text-center'>تاریخ</th>
                                    <th className='align-middle'>کارکرد</th>
                                    <th className='align-middle'>مرخصی</th>
                                </tr>
                                </thead>
                                <tbody>{data && data.resultData && data.resultData.days && renderData()}</tbody>
                            </Table>
                        </div>
                    }
                    {windowSize.width > 768 && data &&
                        <Table responsive>
                            <thead>
                            <tr>
                                <th className='text-center'>استاندار دوره</th>
                                <th className='text-center'>جمع حضور</th>
                                <th className='text-center'>جمع مرخصی</th>
                                <th className='text-center'>کارکرد(روز)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className='text-center'>{data.resultData.standardWorkTime}</td>
                                <td className='text-center text-success'>{data.resultData.totalMonthHours}</td>
                                <td className='text-center text-warning'>{data.resultData.totalLeaveRequests}</td>
                                <td className='text-center text-success'>{data.resultData.totalMonthDays}</td>
                            </tr>
                            </tbody>
                        </Table>
                    }
                    {windowSize.width < 768 && data &&
                        <Fragment>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th className='text-center'>استاندار دوره</th>
                                    <th className='text-center'>جمع حضور</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className='text-center'>{data.resultData.standardWorkTime}</td>
                                    <td className='text-center text-success'>{data.resultData.totalMonthHours}</td>
                                </tr>
                                </tbody>
                            </Table>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th className='text-center'>جمع مرخصی</th>
                                    <th className='text-center'>کارکرد(روز)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className='text-center text-success'>{data.resultData.totalLeaveRequests}</td>
                                    <td className='text-center text-success'>{data.resultData.totalMonthDays}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Fragment>
                    }

                </UILoader>
            </CardBody>
        </Card>
    )
}
export default FiscalPeriod

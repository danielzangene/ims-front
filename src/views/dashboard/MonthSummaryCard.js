import {useEffect, useState} from 'react'
import {BarChart, LogOut} from 'react-feather'
import Avatar from '@components/avatar'
import {Card, CardBody, CardHeader, Col, Row} from 'reactstrap'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import {animated, useSpring} from 'react-spring'
import {useStartDay} from "@startUtils"
import useFetchUrl from "../../utility/UseFetchUrl"

const MonthSummaryCard = (isVisible) => {
    const [data, setData] = useState(null)

    const contentData = [
        {
            title: 'totalMonth',
            subtitle: 'کارکرد ماه',
            color: 'light-info',
            icon: <BarChart size={24}/>
        },
        // {
        //     title: 'totalMonthExtera',
        //     subtitle: 'اضافه کار',
        //     color: 'light-success',
        //     icon: <TrendingUp size={24}/>
        // },
        // {
        //     title: 'totalMonthLess',
        //     subtitle: 'کسری کار',
        //     color: 'light-danger',
        //     icon: <TrendingDown size={24}/>
        // },
        {
            title: 'totalMonthLeave',
            subtitle: 'مرخصی',
            color: 'light-warning',
            icon: <LogOut size={24}/>
        }
    ]

    const refresh = async () => {
        setData(await useFetchUrl("/api/v1/personnel/footwork/log/month/summary", "PATCH", null))
    }

    useStartDay('MonthSummaryCard', refresh)

    useEffect(async () => {
        await refresh()
    }, [])

    const styles = useSpring({
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 24
    })


    const renderData = () => {
        return contentData.map((item, index) => {
            return (
                <Col className='mb-1 d-flex text-center align-middle justify-content-center align-items-center' key={index} gl='6' md='6' sm='12' xs='12'>
                    <h5 className=' '>{item.subtitle}</h5>
                    <Avatar color={item.color} icon={item.icon} className='mx-2'/>
                    <h4 className='fw-bolder mb-0'>{data.resultData && data.resultData[item.title]}</h4>
                </Col>
            )
        })
    }

    return (
        <Card className='card-statistics'>
            <UILoader blocking={!data} loader={<Spinner/>}>
                {data &&
                    <animated.div style={styles}>
                        <CardHeader>
                            {/*<CardTitle tag='h4'>{data.resultData.name} ماه</CardTitle>*/}
                        </CardHeader>
                        <CardBody className='statistics-body'>
                            <Row>{renderData()}</Row>
                        </CardBody>
                    </animated.div>
                }
            </UILoader>
        </Card>
    )
}

export default MonthSummaryCard

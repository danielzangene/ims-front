import {useEffect, useState} from 'react'
import Chart from 'react-apexcharts'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import {animated, useSpring} from 'react-spring'
import {Card, CardBody} from 'reactstrap'
import {addStr} from "../../utility/Utils"
import useFetchUrl from "../../utility/UseFetchUrl"
import {useStartDay} from "@startUtils"

const MonthAllDayChart = (isVisible) => {
    const [data, setData] = useState(null)

    const daysOfMonth = 31
    const options = {
        chart: {
            toolbar: {show: false},
            zoom: {enabled: false},
            type: 'line',
            offsetX: -10
        },
        stroke: {
            curve: 'smooth',
            dashArray: [0, 12],
            width: [4, 3]
        },
        legend: {
            show: false
        },
        colors: ['#d0ccff', '#ebe9f1'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                inverseColors: false,
                gradientToColors: ['#7367f0', '#ebe9f1'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
            }
        },
        markers: {
            size: 0,
            hover: {
                size: 5
            }
        },
        xaxis: {
            labels: {
                style: {
                    colors: '#b9b9c3',
                    fontSize: '1rem'
                }
            },
            axisTicks: {
                show: false
            },
            categories: Array.from(Array(daysOfMonth + 1).keys()).filter(value => value > 0),
            axisBorder: {
                show: true
            },
            tickPlacement: 'on'
        },
        yaxis: {
            tickAmount: 5,
            labels: {
                style: {
                    colors: '#b9b9c3',
                    fontSize: '1rem'
                },
                formatter(val) {
                    return val === 0 ? '' : val < 999 ? addStr(`0${val}`, 2, ":") : addStr(`${val}`, 2, ":")
                }
            }
        },
        grid: {
            borderColor: '#e7eef7',
            padding: {
                top: -20,
                bottom: -10,
                left: 20
            }
        },
        tooltip: {
            x: {show: false}
        }
    }

    const refresh = async () => {
        const d = await useFetchUrl("/api/v1/personnel/footwork/log/month/alldays", "PATCH", null)
        setData(d)
    }

    useStartDay('MonthSummaryCard', refresh)


    const styles = useSpring({
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 24
    })

    useEffect(async () => {
        await refresh()
    }, [])

    return (
        <Card>
            <UILoader blocking={!data} loader={<Spinner/>}>
                <animated.div style={styles}>
                    <CardBody>
                        {data && data.resultData &&
                            <Chart className='mt-1 mb-0' options={data && options}
                                   series={data && data.resultData.series} type='line'
                                   height={330}/>}
                    </CardBody>
                </animated.div>
            </UILoader>
        </Card>
    )
}
export default MonthAllDayChart

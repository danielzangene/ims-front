import {useEffect, useState} from 'react'
import {Card, Table} from 'reactstrap'
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'
import {animated, useSpring} from 'react-spring'
import {Check, Minus, X} from 'react-feather'
import {useStartDay} from "@startUtils"
import {addStr} from '@utils'
import useFetchUrl from "../../utility/UseFetchUrl"

const WeekSummaryTable = (isVisible) => {

    let tomorrow = false

    const [data, setData] = useState(null)

    const refresh = async () => {
        setData(await useFetchUrl("/api/v1/personnel/footwork/log/week/summary", "PATCH", null))
    }

    const useStart = useStartDay('WeekSummaryTable', refresh)

    useEffect(async () => {
        await refresh()
        console.log(useStart)
    }, [])

    const styles = useSpring({
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 24
    })


    const renderData = () => {
        return data.resultData.daySummary.map(col => {
            const IconTag = col.withoutLog ? (
                <X className='text-danger'/>
            ) : (
            col.isCounting ? (
                <Minus className='text-warning'/>
            ) : (
                <Check className='text-success'/>
            )
        )
            tomorrow = tomorrow || col.date > data.resultData.toDay
            const trClass = col.date === data.resultData.toDay ? 'bg-light-info' : ""
            const offDaysClass = col.off ? 'text-danger' : ""
            const tomorrowClass = tomorrow ? 'mx-1 opacity-0' : "mx-1"
            return (
                <tr key={col.date} className={trClass}>
                    <td>
                        <div className='d-flex align-items-center'>
                            <div className={tomorrowClass}>
                                {IconTag}
                            </div>
                            <div>
                                <div className={offDaysClass}>{col.name}</div>
                                <div
                                    className='font-small-2 text-muted'>{col.formattedDate && col.formattedDate}</div>
                            </div>
                        </div>
                    </td>
                    <td className='text-nowrap text-success'>
                        <div className='d-flex flex-column'>
                            {!tomorrow &&
                                <span className='fw-bolder mb-25'>{col.totalDay && addStr(col.totalDay, 2, ":")}</span>}
                        </div>
                    </td>
                    <td className='text-nowrap text-danger'>
                        <div className='d-flex flex-column'>
                            {!tomorrow && <span
                                className='fw-bolder mb-25'>{col.totalLessDay && addStr(col.totalLessDay, 2, ":")}</span>}
                        </div>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Card className='card-company-table'>
            <UILoader blocking={!data} loader={<Spinner/>}>
                <animated.div style={styles}>
                    <Table responsive>
                        <tbody>{data && data.resultData && renderData()}</tbody>
                    </Table>
                </animated.div>
            </UILoader>
        </Card>
    )
}

export default WeekSummaryTable

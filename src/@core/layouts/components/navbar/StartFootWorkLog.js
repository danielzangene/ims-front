// ** React Imports
import {useEffect, useState} from 'react'
import {showErrorToast, showSuccessToast} from '@toastUtils'
import netConfig from '@configs/netConfig'

import {Pause, Play} from 'react-feather'
import {Button} from 'reactstrap'
import useFetchUrl from "../../../../utility/UseFetchUrl"
import {useStartDay} from "@startUtils"
import FootWorkTimer from "./FootWorkTimer"

const StartFootWorkLog = () => {

    const [start, setStart] = useState(false)
    const [counter, setCounter] = useState(-1)
    const [buttonClassNames, setButtonClassNames] = useState('rounded-circle waves-effect btn btn-outline-success')

    const getSeconds = (hours, minutes) => {
        return (hours * 60 * 60) + (minutes * 60)
    }

    const refresh = async () => {
        const res = await useFetchUrl("/api/v1/personnel/footwork/day/total", "PATCH", null)
        if (res.resultData && res.resultData.isCounting) {
            setStart(true)
            setButtonClassNames('round waves-effect btn btn-outline-success')
            const h = parseInt(res.resultData.totalDay.substring(0, 2))
            const m = parseInt(res.resultData.totalDay.substring(2, 4))
            const sec = getSeconds(h, m)
            setCounter(sec)
        } else {
            setButtonClassNames(('rounded-circle waves-effect btn btn-outline-success'))
            setStart(false)
        }
    }

    const useStart = useStartDay('StartFootWorkLog', refresh)

    const startCounting = async () => {
        const res = await useFetchUrl("/api/v1/personnel/footwork/log/current", "POST", null)
        if (!start) {
            setButtonClassNames('round waves-effect btn btn-outline-success')
            if (res.code === netConfig.okStatus) {
                setStart(true)
                const h = parseInt(res.resultData.totalDay.substring(0, 2))
                const m = parseInt(res.resultData.totalDay.substring(2, 4))
                const sec = getSeconds(h, m)
                setCounter(sec)
                useStart.refresh('StartFootWorkLog')
            } else {
                showErrorToast(res.message)
            }
        } else {
            if (res.code === netConfig.okStatus) {
                setStart(false)
                setButtonClassNames(('rounded-circle waves-effect btn btn-outline-success'))
                showSuccessToast("پایان")
                document.title = netConfig.app.appName
                useStart.refresh('StartFootWorkLog')
            } else {
                showErrorToast(res.message)
            }

        }

    }

    useEffect(async () => {
            // await refresh()
        }, []
    )

    return (
        <div onClick={startCounting} className='px-1'>
            <Button className={`btn-icon ${buttonClassNames}`} outline color='success'>
                {start ? <div ><FootWorkTimer start={counter}/><Pause size={18}/></div> : <Play size={18} className='text-success btn-play-icon'/>}
            </Button>
        </div>
    )
}

export default StartFootWorkLog

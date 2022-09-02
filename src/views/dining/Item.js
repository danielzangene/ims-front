import UILoader from '@components/ui-loader'
import {useEffect, useState} from 'react'
import {Input} from 'reactstrap'
// import {showSuccessToast} from "../../utility/ToastUtils"
import useFetchUrl from "../../utility/UseFetchUrl"
import {showErrorToast, showSuccessToast} from "../../utility/ToastUtils"
import netConfig from "../../configs/netConfig"

const DiningItem = (props) => {
    const {formattedDate, reserved, enable, date, foodType} = props
    const [classStyle, setClassStyle] = useState('')
    const [reservedId, setReservedId] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [data, setData] = useState(null)
    const reqBody = {date, foodType}


    const types = {
        0: "منو اصلی   ------------------------",
        1: "دسر   --------------------------------",
        2: "نوشیدنی   -------------------------"
    }


    const selectItem = async (e) => {
        e.preventDefault()
        setIsPending(true)
        const selectedId = e.target.value
        const firstChoice = reservedId
        setReservedId(selectedId)
        const d = await useFetchUrl("/api/v1/personnel/dining/food", "POST", {
            id: selectedId,
            date,
            foodType
        })
        if (d.code === netConfig.okStatus) {
            setData(d)
            if (d.resultData.reservedItem) {
                showSuccessToast(`${d.resultData.reservedItem.name} برای تاریخ ${formattedDate} رزور شد.`)
                setClassStyle('is-valid form-control border-success')
            } else {
                showSuccessToast(d.message)
                setClassStyle('')
            }
        } else {
            setReservedId(firstChoice)
            showErrorToast(d.message)
            if (firstChoice) {
                setClassStyle('is-valid form-control border-success')
            } else {
                setClassStyle('')
            }
        }
        setIsPending(false)

    }

    const loadData = async () => {
        if (!data) {
            setIsPending(true)
            const d = await useFetchUrl("/api/v1/personnel/dining/food", "PATCH", reqBody)
            if (d && d.resultData && d.resultData.reservedItem) {
                setReservedId(`${d.resultData.reservedItem.id}`)
                setClassStyle('is-valid form-control border-success')
            }
            setData(d)
            setIsPending(false)
        }
    }

    useEffect(async () => {
            if (reserved) {
                await loadData()
            }
        }, [reserved]
    )

    return (
        <UILoader blocking={isPending} className='pb-1'>
            <Input className={classStyle} type='select' disabled={!enable}
                   value={reservedId}
                   onClick={(e) => loadData(e)}
                   onChange={(e) => selectItem(e)}>
                <option value="">{types[foodType]}</option>
                {data && data.resultData && data.resultData.foods.map((element) => (
                    <option key={element.id} value={element.id}>{element.name}</option>
                ))}
            </Input>
        </UILoader>
    )
}

export default DiningItem

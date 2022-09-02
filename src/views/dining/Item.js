import UILoader from '@components/ui-loader'
import {useEffect, useState} from 'react'
import {Input, Dropdown} from 'reactstrap'
import {showSuccessToast} from "../../utility/ToastUtils"
import useFetchUrl from "../../utility/UseFetchUrl"

const DiningItem = (props) => {
    const {formattedDate, enable, date, foodType} = props
    const reqBody = {date, foodType}
    const [classStyle, setClassStyle] = useState('')
    const [isPending, setIsPending] = useState(false)
    const [data, setData] = useState(null)


    const types = {
        0: "منو اصلی   ------------------------",
        1: "دسر   --------------------------------",
        2: "نوشیدنی   -------------------------"
    }


    const selectItem = (e) => {
        e.preventDefault()
        const selectedId = e.target.value
        console.log(selectedId)
        if (selectedId) {
            const food = data.resultData.find(item => `${item['id']}` === selectedId)
            console.log(data.resultData)
            console.log(Object.keys(data.resultData[0]))
            console.log(typeof selectedId)
            showSuccessToast(`${food.name} برای تاریخ ${formattedDate} رزور شد.`)
            setClassStyle('is-valid form-control border-success')
        } else {
            setClassStyle('')
        }
    }

    const loadData = async () => {
        if (!data) {
            setIsPending(true)
            const d = await useFetchUrl("/api/v1/personnel/dining/food", "PATCH", reqBody)
            setData(d)
            setIsPending(false)
        }
    }

    useEffect(async () => {
        }, []
    )

    return (
        <UILoader blocking={isPending} className='pb-1'>
            <Input className={classStyle} type='select' disabled={!enable}
                   onClick={(e) => loadData(e)}
                   onChange={(e) => selectItem(e)}>
                <option value="">{types[foodType]}</option>
                {data && data.resultData.map((element) => (
                    <option key={element.id} value={element.id}>{element.name}</option>
                ))}
            </Input>
        </UILoader>
    )
}

export default DiningItem

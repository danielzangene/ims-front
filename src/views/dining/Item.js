import UILoader from '@components/ui-loader'
import {useEffect, useState} from 'react'
import {Input} from 'reactstrap'
import {animated, useSpring} from 'react-spring'

// import useFetchUrl from "../../utility/UseFetchUrl";
import useFetch from "../../utility/UseFetch"
import {showSuccessToast} from "../../utility/ToastUtils"

const DiningItem = (props) => {
    const {formattedDate, enable, date, foodType} = props
    const reqBody = {date, foodType}
    const [classStyle, setClassStyle] = useState('')
    const {data} = useFetch("/api/v1/personnel/dining/food", "PATCH", reqBody)


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

    useEffect(() => {
            // if (data.selected) {
            //     setClassStyle('is-valid form-control border-success')
            // }
        }, []
    )

    const styles = useSpring({
        opacity: data ? 1 : 0,
        y: data ? 0 : 24
    })

    return (
        <UILoader blocking={!data} className='pb-1'>
            <animated.div style={styles}>
                <Input className={classStyle} type='select' disabled={!enable}
                       onChange={(e) => selectItem(e)} /*defaultValue={data.selected}*/>
                    {data &&
                        <option value="">{types[foodType]}</option>
                    }
                    {data && data.resultData.map((element) => (
                        <option key={element.id} value={element.id}>{element.name}</option>
                    ))}
                </Input>
            </animated.div>
        </UILoader>
    )
}

export default DiningItem

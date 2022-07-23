import {useEffect, useState} from 'react'
import DatePicker from "react-multi-date-picker"
import opacity from "react-element-popper/animations/opacity"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import '@styles/react/libs/datepicker/datepicker.scss'
import {ChevronLeft, ChevronRight} from 'react-feather'
import "react-multi-date-picker/styles/layouts/mobile.css"

const CustomDatePicker = ({setValue, isValid}) => {

    const [inputClass, setInputClass] = useState('')

    useEffect(() => {
        if (isValid)    setInputClass('datepicker-custom w-100')
        else            setInputClass('datepicker-custom w-100 is-invalid')
    }, [isValid])

    return (
        <DatePicker
            scrollSensitive={false}
            inputClass={inputClass}
            className="custom-calendar rmdp-mobile "
            format={"YYYY/MM/DD"}
            renderButton={(direction, handleClick) => (
                (direction === 'right' ? (
                    <ChevronLeft className='my-0' onClick={handleClick} size={24}/>
                ) : (
                    <ChevronRight className='my-0' onClick={handleClick} size={24}/>
                ))
            )}
            onChange={(date) => {
                setValue(`${date.year}/${String(date.month.number).padStart(2, '0')}/${String(date.day).padStart(2, '0')}`)
            }}
            inputMode="none"
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            animations={[opacity({from: 0.1, to: 1, duration: 1000})]}
        />
    )
}

export default CustomDatePicker

import DatePicker from "react-multi-date-picker"
import opacity from "react-element-popper/animations/opacity"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import '@styles/react/libs/datepicker/datepicker.scss'
import {ChevronLeft, ChevronRight} from 'react-feather'
import "react-multi-date-picker/styles/layouts/prime.css"

const CustomDatePicker = () => {
    return (
        <DatePicker
            inputClass="datepicker-custom"
            className="custom-calendar rmdp-prime"
            format={"YYYY/MM/DD"}
            renderButton={(direction, handleClick) => (
                (direction === 'right' ? (
                    <ChevronLeft className='my-0' onClick={handleClick} size={24}/>
                ) : (
                    <ChevronRight  className='my-0' onClick={handleClick} size={24}/>
                ))
            )}
            inputMode="none"
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            animations={[opacity({from: 0.1, to: 1, duration: 1000})]}
        />
    )
}

export default CustomDatePicker

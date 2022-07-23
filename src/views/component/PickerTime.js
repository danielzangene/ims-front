import {useEffect, useState} from 'react'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const Timepickers = ({setValue, isValid}) => {

    const [inputClass, setInputClass] = useState('')

    useEffect(() => {
        if (isValid)    setInputClass('form-control')
        else            setInputClass('form-control is-invalid')
    }, [isValid])


    return (
        <Flatpickr
            className={inputClass}
            options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:m',
                time_24hr: true
            }}
            invalid={false}
            onChange={date => {
                const dateObj = new Date(date[0])
                setValue(`${String(dateObj.getHours()).padStart(2, '0')}${String(dateObj.getMinutes()).padStart(2, '0')}`)
                }
            }
        />
    )
}

export default Timepickers

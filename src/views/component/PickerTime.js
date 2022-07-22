import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'

const Timepickers = ({setValue}) => {

    return (
        <Flatpickr
            className='form-control'
            options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: 'H:m',
                time_24hr: true
            }}
            onChange={date => setValue(date)}
        />
    )
}

export default Timepickers

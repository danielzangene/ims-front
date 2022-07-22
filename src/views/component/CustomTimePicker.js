import TimePicker from "react-multi-date-picker/plugins/time_picker"
import DatePicker from "react-multi-date-picker"
import '@styles/react/libs/datepicker/datepicker.scss'

const CustomTimePicker = () => {
    return (
        <DatePicker
            inputClass="datepicker-custom w-100"
            className="custom-calendar"
            disableDayPicker
            format="HH:mm"
            plugins={[<TimePicker hideSeconds />]}
        />
    )
}

export default CustomTimePicker

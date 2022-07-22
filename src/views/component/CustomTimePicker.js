import TimePicker from "react-multi-date-picker/plugins/time_picker"
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import '@styles/react/libs/datepicker/datepicker.scss'
import "react-multi-date-picker/styles/layouts/mobile.css"

const CustomTimePicker = () => {
    return (
        <div>
            <DatePicker
                inputClass="datepicker-custom w-100"
                className="custom-calendar rmdp-mobile"
                disableDayPicker
                format="HH:mm"
                calendar={persian}
                locale={persian_fa}
                plugins={[<TimePicker hideSeconds/>]}
            />
        </div>
    )
}

export default CustomTimePicker

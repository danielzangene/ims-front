import {useEffect, useState} from "react"

function FootWorkTimer({start}) {

    const [counter, setCounter] = useState(0)
    const [seconds, setSeconds] = useState('00')
    const [minutes, setMinutes] = useState('00')
    const [hours, setHours] = useState('00')

    function pad(val) {
        return val > 9 ? val : `0${val}`
    }

    const countUp = (sec) => {
        setSeconds(pad(sec % 60))
        setMinutes(pad(parseInt(sec / 60, 10) % 60))
        setHours(pad(parseInt(sec / 3600, 10)))
    }

    useEffect(() => {
        const sec = start + counter + 1
        setTimeout(() => setCounter(counter + 1), 1000)
        countUp(sec)
        document.title = `${hours}:${minutes}:${seconds}`
    }, [counter])

    return (
        <span className='align-middle ms-25 mx-1'>
                        {hours && hours}:
            {minutes && minutes}:
            {seconds && seconds}
        </span>
    )
}

export default FootWorkTimer
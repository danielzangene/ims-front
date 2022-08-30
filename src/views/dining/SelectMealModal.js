import {Form, Input, Modal, ModalBody, ModalHeader, Row} from 'reactstrap'
// import netConfig from "../configs/netConfig"
import {useEffect, useState} from 'react'
import Spinner from '@components/spinner/Loading-spinner'
import UILoader from '@components/ui-loader'

const SelectMealModal = ({day}) => {

    // const [blockWindow, setBlockWindow] = useState(false)
    // const [hourly, setHourly] = useState('false')
    const [show, setShow] = useState(true)
    const [blockWindow] = useState(false)


    // const refresh = async (threshold) => {
    //     const d = await useFetchUrl("/api/v1/personnel/dining/month", "PATCH", {monthFromNow: threshold})
    //     console.log(d)
    //     if (d.code === netConfig.okStatus) {
    //         setData(d)
    //         return true
    //     } else {
    //         showErrorToast(d.message)
    //         return false
    //     }
    // }

    useEffect(async () => {
        // await refresh(monthFromNow)
        console.log(day)
    }, [])

    return (
        <Modal
            isOpen={show}
            toggle={() => setShow(!show)}
            className='modal-dialog-centered modal-sm'
        >
            <UILoader blocking={blockWindow} loader={<Spinner/>}>
                <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                <ModalBody className='px-sm-5 mx-50 pb-5'>
                    <h3 className='text-center mb-3 '>{day.formattedDate}</h3>
                </ModalBody>
            </UILoader>
        </Modal>
    )
}

export default SelectMealModal

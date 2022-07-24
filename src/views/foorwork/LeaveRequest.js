import {useEffect, useState} from 'react'
import {Button, Card, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row, Table} from 'reactstrap'
import {Check, Info, Trash, XCircle} from 'react-feather'
import Spinner from '@components/spinner/Loading-spinner'
import UILoader from '@components/ui-loader'
import {addStr} from '@utils'
import {showErrorToast, showSuccessToast} from '@toastUtils'
import netConfig from '@configs/netConfig'

import CustomPagination from "../component/CustomPagination"
import CustomDatePicker from "../component/CustomDatePicker"
import PickerTime from "../component/PickerTime"
import useFetchUrl from "../../utility/UseFetchUrl"

const LeaveRequest = () => {

    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
    const [blockWindow, setBlockWindow] = useState(false)
    const [hourly, setHourly] = useState('false')

    const [pageNumRequest, setPageNumRequest] = useState(1)
    const [perPagRequest, setPerPageRequest] = useState(10)

    const [fromDateRequest, setFromDateRequest] = useState('')
    const [toDateRequest, setToDateRequest] = useState('')
    const [fromTimeRequest, setFromTimeRequest] = useState('')
    const [toTimeRequest, setToTimeRequest] = useState('')
    const [requestReason, setRequestReason] = useState('')
    const [requestType, setRequestType] = useState(1)

    const [errors, setErrors] = useState({
        fromDateRequest: {is: false},
        toDateRequest: {is: false},
        fromTimeRequest: {is: false},
        toTimeRequest: {is: false}
    })

    const newRequest = {
        from: fromDateRequest,
        to: toDateRequest,
        fromTime: fromTimeRequest,
        toTime: toTimeRequest,
        reason: requestReason,
        type: requestType
    }

    const pageSearch = {
        pageNum: pageNumRequest,
        perPage: perPagRequest
    }
    const refresh = async (currentPage, maxPageSize) => {
        pageSearch.pageNum = currentPage
        pageSearch.perPage = maxPageSize
        const d = await useFetchUrl("/api/v1/personnel/leave/all", "PATCH", pageSearch)
        setData(d)
    }
    const validationCheck = () => {
        let result = true
        const newErrors = {...errors}

        if (fromDateRequest.length === 0) {
            newErrors.fromDateRequest.is = true
            result = false
        } else {
            newErrors.fromDateRequest.is = false
        }
        if (toDateRequest.length === 0) {
            newErrors.toDateRequest.is = true
            result = false
        } else {
            newErrors.toDateRequest.is = false
        }
        if (hourly === 'true' && fromTimeRequest.length === 0) {
            newErrors.fromTimeRequest.is = true
            result = false
        } else {
            newErrors.fromTimeRequest.is = false
        }
        if (hourly === 'true' && toTimeRequest.length === 0) {
            newErrors.toTimeRequest.is = true
            result = false
        } else {
            newErrors.toTimeRequest.is = false
        }
        setErrors(newErrors)

        return result
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (validationCheck()) {
            setBlockWindow(true)
            const res = await useFetchUrl("/api/v1/personnel/leave/log", "POST", newRequest)
            if (res.code === netConfig.okStatus) {
                showSuccessToast(res.message)
                setShow(false)
                await refresh(pageNumRequest, perPagRequest)
            } else {
                showErrorToast(res.message)
            }
            setBlockWindow(false)
        }
    }

    const deleteRequest = async (requestId) => {
        const res = await useFetchUrl("/api/v1/personnel/leave/log", "DELETE", {id: requestId})
        if (res.code === netConfig.okStatus) {
            showSuccessToast(res.message)
            await refresh(pageNumRequest, perPagRequest)
        } else {
            showErrorToast(res.message)
        }
    }

    const search = async (pageNum) => {
        setPageNumRequest(pageNum)
        setData(null)
        await refresh(pageNum, perPagRequest)
    }
    const selectOptions = ['10', '25', '50']

    const statusIcon = {
        REJECTED_REQUEST_STATUS: <XCircle className='text-danger'/>,
        CONFIRMED_REQUEST_STATUS: <Check className='text-success'/>,
        REGISTERED_REQUEST_STATUS: <Info className='text-warning'/>
    }

    useEffect(async () => {
        await refresh(pageNumRequest, perPagRequest)
    }, [])

    const renderData = () => {
        return data.resultData.requests.map((item) => {
            return (
                <tr key={item.id}>
                    <td className='px-1 mx-0'>
                        {item.canDelete &&
                            <Button color='flat-danger' className='btn-icon round' onClick={() => {
                                deleteRequest(item.id)
                            }}>
                                <Trash/>
                            </Button>
                        }

                        {!item.canDelete &&
                            <Button color='flat-danger' className=' btn-icon round' disabled onClick={() => {
                                deleteRequest(item.id)
                            }}>
                                {statusIcon[item.status.code]}
                            </Button>
                        }
                    </td>
                    <td className='text-nowrap ps-0'>
                        <div className='d-flex align-items-center'>
                            <div>
                                <span className='fw-bolder me-1'>از </span>
                                <span className='fw-bolder me-3'>{item.from}</span>
                                <span className='fw-bolder me-1'>تا </span>
                                <span className='fw-bolder'>{item.to} </span>
                            </div>
                        </div>
                    </td>
                    <td className='text-nowrap px-0'>
                        <div className='d-flex align-items-center'>
                            {item.fromTime &&
                                <div>
                                    <div
                                        className=''>از {addStr(item.fromTime, 2, ':')} تا {addStr(item.toTime, 2, ':')}</div>
                                </div>
                            }
                        </div>
                    </td>
                    <td className='text-nowrap'>
                        <div className='d-flex flex-column'>
                            {item.leaveType && item.leaveType.name}
                        </div>
                    </td>
                    <td colSpan={2} className='text-nowrap'>
                        <div className='d-flex flex-column'>
                            <p className='text-align-justify'>{item.reason && `${item.reason.substring(0, 20)}...`}</p>
                        </div>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <UILoader blocking={!data} loader={<Spinner/>}>
                {data &&
                    <div>
                        <Card>
                            <Table responsive>

                                <thead>
                                <tr>
                                    <th colSpan={3}>
                                        <Button color='success' className='' onClick={() => {
                                            setShow(true)
                                        }}>
                                            ثبت درخواست جدید
                                        </Button>
                                    </th>
                                    <th className='align-middle'>نوع</th>
                                    <th className='align-middle'>علت</th>
                                    <th className='align-middle'>
                                        <Input type="select"
                                               value={perPagRequest}
                                               onChange={(e) => {
                                                   setPerPageRequest(e.target.value)
                                                   refresh(pageNumRequest, e.target.value)
                                               }}
                                               className=''
                                               id="numParPage">
                                            {selectOptions && selectOptions.map((item) => {
                                                return (<option key={item}>{item}</option>)
                                            })}
                                        </Input>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>{data && data.resultData && data.resultData.requests && renderData()}</tbody>
                            </Table>

                        </Card>

                        {data && data.resultData && data.resultData.requests && data.resultData.requests.length === 0 &&
                            <span>درخواستی ثبت نشده.</span>
                        }
                        {data && data.resultData && data.resultData.requests && data.resultData.requests.length !== 0 &&
                            <CustomPagination
                                count={data.resultData.count}
                                current={data.resultData.current}
                                perPage={data.resultData.perPage}
                                searchFunc={search}
                            />
                        }
                    </div>
                }
                <Modal
                    isOpen={show}
                    toggle={() => setShow(!show)}
                    className='modal-dialog-centered modal-sm'
                >
                    <UILoader blocking={blockWindow} loader={<Spinner/>}>
                        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                        <ModalBody className='px-sm-5 mx-50 pb-5'>
                            <h3 className='text-center mb-3 '>ثبت درخواست مرخصی</h3>
                            <Form onSubmit={onSubmit}>
                                <Row className='mb-1'>
                                    <Input type='select' defaultChecked onChange={e => setHourly(e.target.value)}>
                                        <option value={false}>روزانه</option>
                                        <option value={true}>ساعتی</option>
                                    </Input>

                                </Row>
                                <Row className='mb-1'>
                                    <Input type='select' defaultChecked onChange={e => setRequestType(e.target.value)}>
                                        <option value={1}>استحقاقی</option>
                                        <option value={2}>جهت اطلاع</option>
                                        <option value={3}>استعلاجی</option>
                                    </Input>

                                </Row>
                                <Row className='m-0 p-0'>
                                    <Row className='mx-0 px-0'>
                                        <Label className='text-danger'> تاریخ </Label>
                                    </Row>
                                    <Row className='mx-0 px-0'>
                                        <Col className='d-flex align-items-center mx-0 px-0'>
                                            <span className='me-1'>از</span>
                                            <CustomDatePicker setValue={setFromDateRequest}
                                                              isValid={!errors.fromDateRequest.is}/>
                                        </Col>
                                        <Col className='d-flex align-items-center mx-0 px-0'>
                                            <span className='mx-1'>تا</span>
                                            <CustomDatePicker setValue={setToDateRequest}
                                                              isValid={!errors.toDateRequest.is}/>
                                        </Col>
                                    </Row>
                                </Row>
                                {hourly === 'true' &&
                                    <Row className='m-0 p-0 mt-1'>
                                        <Row className='mx-0 px-0'>
                                            <Label className='text-danger'> ساعت </Label>
                                        </Row>
                                        <Row className='mx-0 px-0'>
                                            <Col className='d-flex align-items-center mx-0 px-0'>
                                                <span className='me-1'>از</span>
                                                <PickerTime setValue={setFromTimeRequest}
                                                            isValid={!errors.fromTimeRequest.is}/>
                                            </Col>
                                            <Col className='d-flex align-items-center mx-0 px-0'>
                                                <span className='mx-1'>تا</span>
                                                <PickerTime setValue={setToTimeRequest}
                                                            isValid={!errors.toTimeRequest.is}/>
                                            </Col>
                                        </Row>
                                    </Row>
                                }
                                <Row className='mt-2'>
                                    <Col className='d-flex align-items-center'>
                                        <Input type='textarea' name='desc'
                                               onChange={(e) => setRequestReason(e.target.value)}
                                               rows='3'
                                               maxLength={250}
                                               defaultValue={requestReason}
                                               placeholder='علت مرخصی'/>
                                    </Col>
                                </Row>
                                <hr className='my-2'/>
                                <Row className='mt-1'>
                                    <Col lg='6' md='6' sm='6' xs='6'>
                                        <Button type='submit' color='primary' block>
                                            ثبت
                                        </Button>
                                    </Col>
                                    <Col lg='6' md='6' sm='6' xs='6'>
                                        <Button color='secondary' block outline onClick={() => {
                                            setShow(false)
                                        }}>
                                            لغو
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </ModalBody>
                    </UILoader>
                </Modal>
            </UILoader>
        </div>
    )
}
export default LeaveRequest

import {useEffect, useState} from 'react'
import {Button, Card, Col, Form, Input, Modal, ModalBody, ModalHeader, Row, Table} from 'reactstrap'
import {Check, Info, Trash, XCircle} from 'react-feather'
import Spinner from '@components/spinner/Loading-spinner'
import UILoader from '@components/ui-loader'
import {addStr} from '@utils'
import CustomPagination from "../component/CustomPagination"

const LeaveRequest = () => {

    const [data, setData] = useState(null)
    const [show, setShow] = useState(false)
    const [blockWindow, setBlockWindow] = useState(false)

    const testdata = [
        {
            id: 1,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'یک‌شنبه 26 مرداد',
            fromTime: '0830',
            toTime: '1100',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'ثبت شده',
            statusCode: 'registered'
        },
        {
            id: 2,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'یک‌شنبه 26 مرداد',
            fromTime: '0830',
            toTime: '1100',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'رد شده',
            statusCode: 'rejected'
        },
        {
            id: 3,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'یک‌شنبه 26 مرداد',
            fromTime: '0830',
            toTime: '1100',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'نایید شده',
            statusCode: 'confirmed'
        },
        {
            id: 4,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'یک‌شنبه 26 مرداد',
            fromTime: '',
            toTime: '',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'رد شده',
            statusCode: 'rejected'
        },
        {
            id: 5,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'یک‌شنبه 26 مرداد',
            fromTime: '0830',
            toTime: '1100',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'نایید شده',
            statusCode: 'confirmed'
        },
        {
            id: 6,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'یک‌شنبه 26 مرداد',
            fromTime: '0830',
            toTime: '1100',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'ثبت شده',
            statusCode: 'registered'
        },
        {
            id: 7,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'جمعه 26 مرداد',
            fromTime: '0830',
            toTime: '1100',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'رد شده',
            statusCode: 'rejected'
        },
        {
            id: 8,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'سه‌شنبه 26 مرداد',
            fromTime: '0830',
            toTime: '1100',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'نایید شده',
            statusCode: 'confirmed'
        },
        {
            id: 9,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'دو‌شنبه 26 مرداد',
            fromTime: '',
            toTime: '',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'رد شده',
            statusCode: 'rejected'
        },
        {
            id: 10,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'شنبه 26 مرداد',
            fromTime: '0830',
            toTime: '1100',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'نایید شده',
            statusCode: 'confirmed'
        },
        {
            id: 11,
            img: require('@src/assets/images/icons/toolbox.svg').default,
            from: 'شنبه 25 مرداد',
            to: 'یک‌شنبه 26 مرداد',
            type: 'استحقاقی',
            reason: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد',
            status: 'نایید شده',
            statusCode: 'confirmed'
        }
    ]

    const onSubmit = () => {

    }
    const search = (pageNum) => {
        alert(pageNum)
        setBlockWindow(false)
    }
    const selectOptions = ['10', '25', '50']
    const perPage = '25'

    const statusIcon = {
        rejected: <XCircle className='text-danger'/>,
        confirmed: <Check className='text-success'/>,
        registered: <Info className='text-warning'/>
    }

    useEffect(async () => {
        setTimeout(() => {
            setData(testdata)
        }, 3000)
    }, [])

    const renderData = () => {
        return data.map((item) => {

            return (
                <tr key={item.id} title={item.stat}>
                    <td className='pe-0'>
                        {'registered' === item.statusCode &&
                            <Button color='flat-danger' className='ps-0 opacity-50' onClick={() => {
                                alert(item.id)
                            }}>
                                <Trash/>
                            </Button>
                        }
                    </td>
                    <td className='px-1'>
                        {statusIcon[item.statusCode]}
                    </td>
                    <td className='text-nowrap ps-0'>
                        <div className='d-flex align-items-center'>
                            <div>
                                <span className='fw-bolder me-3'>از {item.from}</span>
                                <span className='fw-bolder'>تا {item.to}</span>
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
                            {item.type && item.type}
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
                                    <th colSpan={4}>
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
                                               value={perPage}
                                            // onChange={pageCount}
                                               className=''
                                               id="numParPage">
                                            {selectOptions && selectOptions.map((item) => {
                                                return (<option key={item}>{item}</option>)
                                            })}
                                        </Input>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>{data && renderData()}</tbody>
                            </Table>

                        </Card>
                        <CustomPagination
                            count={100}
                            current={3}
                            perPage={25}
                            searchFunc={search}
                        />
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
                                </Row>

                                <Row>
                                </Row>
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

import {useEffect, useState} from 'react'
import {Badge, Button, Card, Input, Table} from 'reactstrap'
import Spinner from '@components/spinner/Loading-spinner'
import UILoader from '@components/ui-loader'
import netConfig from '@configs/netConfig'
import {Check, X} from 'react-feather'
import CustomPagination from "../component/CustomPagination"
import useFetchUrl from "../../utility/UseFetchUrl"
import {showErrorToast, showSuccessToast} from "../../utility/ToastUtils"
import {useNotification} from "@notificationUtils"

const TeamRequests = () => {

    const [data, setData] = useState(null)

    const [pageNumRequest, setPageNumRequest] = useState(1)
    const [perPagRequest, setPerPageRequest] = useState(10)


    const pageSearch = {
        pageNum: pageNumRequest,
        perPage: perPagRequest
    }

    const useNotif = useNotification('TeamRequests', null)

    const refresh = async (currentPage, maxPageSize) => {
        pageSearch.pageNum = currentPage
        pageSearch.perPage = maxPageSize
        const d = await useFetchUrl("/api/v1/personnel/request/all", "PATCH", pageSearch)
        console.log(d)
        setData(d)
        useNotif.refresh('TeamRequests')
    }

    const acceptRequest = async (logId) => {
        const res = await useFetchUrl("/api/v1/personnel/request/accept", "POST", {id: logId})
        if (res.code === netConfig.okStatus) {
            await refresh(pageNumRequest, perPagRequest)
            showSuccessToast(res.message)
        } else {
            showErrorToast(res.message)
        }
    }
    const rejectRequest = async (logId) => {
        const res = await useFetchUrl("/api/v1/personnel/request/reject", "POST", {id: logId})
        if (res.code === netConfig.okStatus) {
            await refresh(pageNumRequest, perPagRequest)
            showSuccessToast(res.message)
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

    const statusClass = {
        REJECTED_REQUEST_STATUS: 'bg-light-danger',
        CONFIRMED_REQUEST_STATUS: 'bg-light-success',
        REGISTERED_REQUEST_STATUS: 'bg-light-warning'
    }

    useEffect(async () => {
        await refresh(pageNumRequest, perPagRequest)
    }, [])

    const renderData = () => {
        return data.resultData.requests.map((item, index) => {
            return (
                <tr key={item.id}>
                    <td className='row-num-td pe-0 mx-0'>{index + 1}</td>
                    <td className='text-nowrap ps-1'>
                        {item.canDoOperation &&
                            <div>
                                <Button color='flat-success'
                                        className='btn-icon round rounded-circle waves-effect btn btn-outline-success'
                                        onClick={() => {
                                            acceptRequest(item.id)
                                        }}>
                                    <Check size={12}/>
                                </Button>
                                <Button color='flat-danger'
                                        className='ms-1 btn-icon round rounded-circle waves-effect btn btn-outline-danger'
                                        onClick={() => {
                                            rejectRequest(item.id)
                                        }}>
                                    <X size={12}/>
                                </Button>
                            </div>
                        }
                    </td>
                    <td className='text-nowrap ps-0'>{item.userName}</td>
                    <td className='text-nowrap'>{item.requestDate.substring(0, 16)}</td>
                    <td className='text-nowrap'>{item.type.name}</td>
                    <td className='text-nowrap'>
                        <Badge pill className={statusClass[item.status.code]}>
                            {item.status.name}
                        </Badge>
                    </td>
                    <td colSpan={2} className='text-nowrap'>
                        {item.description && item.description.substring(0, 60)}
                        {item.description && item.description.length > 60 && `...`}
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
                                    <th className='row-num-td px-0 mx-0'></th>
                                    <th className='align-middle ps-0'></th>
                                    <th className='align-middle ps-0'>نام</th>
                                    <th className='align-middle'>تاریخ</th>
                                    <th className='align-middle'>نوع</th>
                                    <th className='align-middle'>وضعیت</th>
                                    <th className='align-middle'>توضیح</th>
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

            </UILoader>
        </div>
    )
}
export default TeamRequests

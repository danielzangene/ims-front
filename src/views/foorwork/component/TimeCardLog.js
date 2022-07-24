import {useState} from 'react'
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    PopoverBody,
    PopoverHeader,
    UncontrolledDropdown,
    UncontrolledPopover
} from 'reactstrap'
import {Check, ChevronsLeft, ChevronsRight, Edit3, Trash, X} from 'react-feather'
import {addStr} from '@utils'


const TimeCardLog = ({data, index, logActions}) => {
    const logTimeData = data
    const [popoverOpen, setPopoverOpen] = useState(false)

    const onHover = () => {
        setPopoverOpen(true)
    }

    const statusClassName = {
        REJECTED_REQUEST_STATUS: 'bg-danger',
        CONFIRMED_REQUEST_STATUS: 'bg-success',
        REGISTERED_REQUEST_STATUS: 'bg-warning'
    }
    const statusIcons = {
        REJECTED_REQUEST_STATUS: <div className='d-flex align-items-center' style={{marginLeft: '6px'}}>
            <X size={12} className='text-white opacity-25'/>
        </div>,
        CONFIRMED_REQUEST_STATUS: <div className='d-flex align-items-center' style={{marginLeft: '6px'}}>
            <Check size={12} className='text-white  opacity-25'/>
        </div>,
        REGISTERED_REQUEST_STATUS: <div className='d-flex align-items-center' style={{marginLeft: '10px'}}>
            <span className='text-white opacity-25'>!</span>
        </div>

    }

    const onHoverLeave = () => {
        setPopoverOpen(false)
    }
    return (
        <div className='time-card-log'
             onMouseEnter={onHover}
             onMouseLeave={onHoverLeave}
        >
            <UncontrolledDropdown className='time-card-log-dropdown w-100' id={`logtime-${data.time}${data.id}`}>
                <UncontrolledPopover
                    trigger='focus'
                    isOpen={popoverOpen}
                    placement='top'
                    target={`logtime-${data.time}${data.id}`}>
                    <PopoverHeader className={statusClassName[data.status.code]}>{data.status.name}</PopoverHeader>
                    {data && data.desc &&
                        <PopoverBody>
                            {data.desc}
                        </PopoverBody>
                    }
                </UncontrolledPopover>
                <DropdownToggle color=''
                                className={index % 2 === 0 ? 'bg-light-success round w-100 text-start p-0' : 'bg-light-danger round  w-100 text-start p-0'}>
                    <div className='d-flex justify-content-between'>
                        <div className='d-flex align-items-center'>
                            {index % 2 === 0 ? <ChevronsLeft size={20}/> : <ChevronsRight size={20}/>}
                            <small
                                className={index % 2 === 0 ? 'text-secondary text-success' : 'text-secondary text-danger'}>
                                {data && addStr(data.time, 2, ":")}
                            </small>
                        </div>
                        {statusIcons[data.status.code]}
                    </div>
                </DropdownToggle>
                <DropdownMenu end>
                    <DropdownItem key='edit' onClick={() => logActions.editLog(logTimeData.id)}>
                        <Edit3 className='opacity-50 text-info'/>
                    </DropdownItem>
                    <DropdownItem key='delete' onClick={() => logActions.deleteLog(logTimeData.id)}>
                        <Trash className='opacity-50 text-danger'/>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}
export default TimeCardLog

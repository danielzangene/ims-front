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
import {ChevronsLeft, ChevronsRight, Edit3, Trash} from 'react-feather'
import {addStr} from '@utils'


const TimeCardLog = ({data, index, logActions}) => {
    const logTimeData = data
    const [popoverOpen, setPopoverOpen] = useState(false)

    const onHover = () => {
        setPopoverOpen(true)
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
                {data && data.desc &&
                    <UncontrolledPopover
                        trigger='focus'
                        isOpen={popoverOpen}
                        placement='bottom'
                        target={`logtime-${data.time}${data.id}`}>
                        <PopoverHeader>شرح کارکرد</PopoverHeader>
                        <PopoverBody>
                            {data.desc}
                        </PopoverBody>
                    </UncontrolledPopover>
                }
                <DropdownToggle color=''
                                className={index % 2 === 0 ? 'bg-light-success round w-100 text-start p-0' : 'bg-light-danger round  w-100 text-start p-0'}>
                    <p className=' mb-0 pb-0'>
                        {index % 2 === 0 ? <ChevronsLeft size={20}/> : <ChevronsRight size={20}/>}
                        <small
                            className={index % 2 === 0 ? 'text-secondary text-success' : 'text-secondary text-danger'}>
                            {data && addStr(data.time, 2, ":")}
                        </small>
                    </p>
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
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from 'reactstrap'
import {ChevronsLeft, ChevronsRight, Edit3, Trash} from 'react-feather'


const TimeCardLog = ({data, index, logActions}) => {
    const logTimeData = data
    return (
        <div className='time-card-log'>
            <UncontrolledDropdown className='time-card-log-dropdown w-100'>
                <DropdownToggle color=''
                                className={index % 2 === 0 ? 'bg-light-success round w-100 text-start p-0' : 'bg-light-danger round  w-100 text-start p-0'}>
                    <p className=' mb-0 pb-0'>
                        {index % 2 === 0 ? <ChevronsLeft size={20}/> : <ChevronsRight size={20}/>}
                        <small
                            className={index % 2 === 0 ? 'text-secondary text-success' : 'text-secondary text-danger'}>
                            {data && data.log}
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

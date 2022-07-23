// ** React Imports
import {Fragment} from 'react'

// ** Dropdowns Imports
import UserDropdown from './UserDropdown'

// ** Third Party Components
import {Play, Moon, Sun} from 'react-feather'

// ** Reactstrap Imports
import {Button, NavItem, NavLink} from 'reactstrap'
import StartFootWorkLog from "./StartFootWorkLog"
import { useSkin } from '@hooks/useSkin'
import NotificationSidebar from "./NotificationSidebar"

const NavbarUser = () => {
    // ** Props
    const {skin, setSkin} = useSkin()

    // ** Function to toggle Theme (Light/Dark)
    const ThemeToggler = () => {
        if (skin === 'dark') {
            return <Sun className='ficon' onClick={() => setSkin('light')}/>
        } else {
            return <Moon className='ficon' onClick={() => setSkin('dark')}/>
        }
    }

    return (
        <Fragment>
            <div className='bookmark-wrapper d-flex align-items-right'>
                <NavItem className='d-flex align-item-center'>
                    <div className='d-flex align-items-center text-middle px-1'>
                        <ThemeToggler/>
                    </div>
                </NavItem>
            </div>

            <ul className='nav navbar-nav align-items-center ms-auto'>
                <StartFootWorkLog />
                <NotificationSidebar/>
                <UserDropdown/>
            </ul>
        </Fragment>
    )
}
export default NavbarUser

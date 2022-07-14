import {Fragment} from 'react'
import UserDropdown from './UserDropdown'
import {Moon, Sun} from 'react-feather'
import {NavItem, NavLink} from 'reactstrap'
import StartFootWorkLog from "./StartFootWorkLog"
import {useSkin} from "../../../../utility/hooks/useSkin"

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
                <NavItem className='d-none d-lg-block'>
                    <NavLink className='nav-link-style'>
                        <ThemeToggler/>
                    </NavLink>
                </NavItem>

            </div>

            <ul className='nav navbar-nav align-items-center ms-auto'>
                <NavItem className='d-none d-lg-block'>
                    <NavLink className='nav-link-style'>
                        <StartFootWorkLog/>
                    </NavLink>
                </NavItem>
                <UserDropdown/>
            </ul>
        </Fragment>
    )
}
export default NavbarUser

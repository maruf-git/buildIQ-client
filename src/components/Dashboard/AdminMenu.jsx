import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={BsGraphUp} label='Profile' address='/dashboard' />
            <MenuItem icon={FaUserCog} label='Manage Members' address='manage-members' />
            <MenuItem icon={BsGraphUp} label='Make Announcement' address='/make-announcement' />
            <MenuItem icon={BsGraphUp} label='Agreement Requests' address='/agreement-requests' />
            <MenuItem icon={BsGraphUp} label='Manage Coupons' address='/manage-coupons' />

        </>
    )
}

export default AdminMenu
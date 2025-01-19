import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={BsGraphUp} label='Profile' address='/dashboard' />
            <MenuItem icon={FaUserCog} label='Manage Members' address='manage-members' />
            <MenuItem icon={BsGraphUp} label='Agreement Requests' address='/dashboard/agreement-requests' />
            <MenuItem icon={BsGraphUp} label='Manage Coupons' address='/dashboard/manage-coupons' />
            <MenuItem icon={BsGraphUp} label='Make Announcement' address='/dashboard/make-announcement' />

        </>
    )
}

export default AdminMenu
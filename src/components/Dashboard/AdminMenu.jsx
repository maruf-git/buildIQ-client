import { FaHandshake, FaUser, FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { RiCoupon3Fill } from 'react-icons/ri'
import { GrAnnounce } from 'react-icons/gr'
const AdminMenu = () => {
    return (
        <>
            <MenuItem icon={FaUser} label='Profile' address='/dashboard' />
            <MenuItem icon={FaUserCog} label='Manage Members' address='manage-members' />
            <MenuItem icon={FaHandshake} label='Agreement Requests' address='/dashboard/agreement-requests' />
            <MenuItem icon={RiCoupon3Fill} label='Manage Coupons' address='/dashboard/manage-coupons' />
            <MenuItem icon={GrAnnounce} label='Make Announcement' address='/dashboard/announcements' />

        </>
    )
}

export default AdminMenu
import MenuItem from "./MenuItem";
import { FaUser } from "react-icons/fa";

import { GrAnnounce } from "react-icons/gr";


const UserMenu = () => {
    return (
        <div>
            <MenuItem icon={FaUser} label='Profile' address='/dashboard' />
            <MenuItem icon={GrAnnounce} label='Announcements' address='/dashboard/announcements' />
        </div>
    );
};

export default UserMenu;
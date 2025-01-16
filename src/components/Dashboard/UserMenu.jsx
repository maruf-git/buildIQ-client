import { BsGraphUp } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { FaUserCog } from "react-icons/fa";


const UserMenu = () => {
    return (
        <div>
            <MenuItem icon={BsGraphUp} label='Profile' address='/dashboard' />
            <MenuItem icon={FaUserCog} label='Announcements' address='/dashboard/announcements' />
        </div>
    );
};

export default UserMenu;
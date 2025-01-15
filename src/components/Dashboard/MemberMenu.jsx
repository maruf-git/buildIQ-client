import { BsGraphUp } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { FaUserCog } from "react-icons/fa";


const MemberMenu = () => {
    return (
        <div>
                   <MenuItem icon={BsGraphUp} label='Profile' address='/dashboard' />
                   
                   <MenuItem icon={BsGraphUp} label='Make Payment' address='/make-payment' />
                   <MenuItem icon={BsGraphUp} label='Payment History' address='/payment-history' />
                   <MenuItem icon={FaUserCog} label='announcements' address='/announcements' />
               </div>
    );
};

export default MemberMenu;
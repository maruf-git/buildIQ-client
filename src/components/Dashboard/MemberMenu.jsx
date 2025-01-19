import { BsGraphUp } from "react-icons/bs";
import MenuItem from "./MenuItem";
import { FaUserCog } from "react-icons/fa";


const MemberMenu = () => {
    return (
        <div>
                   <MenuItem icon={BsGraphUp} label='Profile' address='/dashboard' />           
                   <MenuItem icon={BsGraphUp} label='Make Payment' address='/dashboard/make-payment' />
                   <MenuItem icon={BsGraphUp} label='Payment History' address='/dashboard/payment-history' />
                   <MenuItem icon={FaUserCog} label='Announcements' address='/dashboard/announcements' />
               </div>
    );
};

export default MemberMenu;
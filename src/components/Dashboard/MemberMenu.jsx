
import MenuItem from "./MenuItem";
import { FaHistory, FaUser } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { MdPayments } from "react-icons/md";


const MemberMenu = () => {
    return (
        <div>
                   <MenuItem icon={FaUser} label='Profile' address='/dashboard' />           
                   <MenuItem icon={MdPayments} label='Make Payment' address='/dashboard/make-payment' />
                   <MenuItem icon={FaHistory} label='Payment History' address='/dashboard/payment-history' />
                   <MenuItem icon={GrAnnounce} label='Announcements' address='/dashboard/announcements' />
               </div>
    );
};

export default MemberMenu;
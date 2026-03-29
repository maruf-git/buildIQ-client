import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ label, address, icon: Icon }) => {
    return (
        <NavLink
            to={address}
            end
            className={({ isActive }) =>
                `group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden ${
                    isActive
                        ? 'bg-gradient-to-r from-green-500/20 to-green-500/5 text-green-400 border border-green-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                }`
            }
        >
            {({ isActive }) => (
                <>
                    {/* Active State Glowing Bar */}
                    <div 
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-green-400 rounded-r-lg shadow-[0_0_12px_rgba(74,222,128,0.8)] transition-all duration-300 ${
                            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
                        }`} 
                    />

                    {/* Icon container with subtle scale on hover */}
                    <div className="relative shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Icon size={18} className={isActive ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'text-gray-500 group-hover:text-gray-300'} />
                    </div>

                    {/* Label with slight slide on hover */}
                    <span className="truncate flex-1 group-hover:translate-x-1 transition-transform duration-300">
                        {label}
                    </span>
                </>
            )}
        </NavLink>
    )
}

MenuItem.propTypes = {
    label: PropTypes.string,
    address: PropTypes.string,
    icon: PropTypes.elementType,
}

export default MenuItem
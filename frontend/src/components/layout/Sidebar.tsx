import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  UserPlus,
  Users,
  Activity,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { logout } = useAuth();

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: {
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  const navItems = [
    { icon: <Home size={20} />, text: 'Dashboard', path: '/' },
    { icon: <UserPlus size={20} />, text: 'New Assessment', path: '/assessment/new' },
    { icon: <Users size={20} />, text: 'Patient Records', path: '/patients' },
    { icon: <Activity size={20} />, text: 'Diagnostics', path: '/diagnostics' },
    { icon: <Settings size={20} />, text: 'Settings', path: '/settings' }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 z-30 max-h-screen w-64 bg-white shadow-lg
                    ${isOpen ? '' : 'hidden'} 
                    lg:block lg:static `}
        initial={false}
        animate={isOpen || window.innerWidth >= 1024 ? 'open' : 'closed'}
        variants={sidebarVariants}
        role="navigation"
        aria-expanded={isOpen}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            {/* Mobile close button */}
            <div className="flex justify-end p-4 lg:hidden">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close sidebar"
              >
                <X size={20} className="text-neutral-600" />
              </button>
            </div>

            {/* Navigation links */}
            <nav className="px-4 py-6">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) toggleSidebar();
                      }}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-700 font-medium'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`
                      }
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.text}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Logout button at bottom */}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;

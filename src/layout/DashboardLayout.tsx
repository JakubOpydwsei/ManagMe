import { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import ThemeButton from '../components/ThemeButtin';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'react-bootstrap';

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const { theme } = useTheme()

    const { isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen">
            <div
                className={`fixed inset-0 z-30 md:hidden ${sidebarOpen ? '' : 'hidden'}`}
                onClick={toggleSidebar}
            ></div>
            <nav
                className={`z-40 bg-gray-400 dark:bg-gray-900 text-yellow-200 dark:text-green-400 w-64 xl:w-100 fixed top-0 bottom-0 left-0 p-5 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}
            >
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                </div>
                <ThemeButton />
                <ul className='p-0 m-0'>
                    <li><Link to="/projects" className="block py-2"><Button variant={theme} className='w-full'>Projects</Button></Link></li>
                    <li><Link to="/project/add" className="block py-2"><Button variant={theme} className='w-full'>Add project</Button></Link></li>
                    <li><Link to="/profile" className="block py-2"><Button variant={theme} className='w-full'>Profile</Button></Link></li>
                    {!isAuthenticated && <li><Link to="/login" className="block py-3"><Button variant={theme} className='w-full'>Login</Button></Link></li>}
                    {isAuthenticated && <li><Button variant={theme} onClick={logout} className='w-full my-2'>Logout</Button></li>}
                </ul>
            </nav>

            <div data-bs-theme={theme} className="flex-1 flex flex-col transition-all duration-300 md:ml-64 xl:ml-100">
                <header className=" p-4 shadow-md flex justify-between items-center md:hidden w-full">
                    <button onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                    <h1 className="text-2xl font-bold pr-3">ManagMe</h1>
                </header>

                <main className="p-4 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;

import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import ThemeButton from '../components/ThemeButtin';

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const {theme} = useTheme() 

    return (
        <div className="flex h-screen">
            <div
                className={`fixed inset-0 z-30 md:hidden ${sidebarOpen ? '' : 'hidden'}`}
                onClick={toggleSidebar}
            ></div>
            <nav
                className={`z-40 bg-gray-400 dark:bg-gray-900 text-yellow-200 dark:text-green-400 w-64 fixed top-0 bottom-0 left-0 p-5 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64`}
            >
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold">Dashboard</h2>
                </div>
                <ThemeButton/>
                <ul>
                    <li><Link to="/dashboard" className="block py-2">Przegląd</Link></li>
                    <li><Link to="/projects" className="block py-2">Projekty</Link></li>
                    <li><Link to="/stories" className="block py-2">Stories</Link></li>
                    <li><Link to="/tasks" className="block py-2">Zadania</Link></li>
                    <li><Link to="/profile" className="block py-2">Profil</Link></li>
                </ul>
            </nav>

            <div data-bs-theme={theme} className="flex-1 flex flex-col transition-all duration-300 md:ml-64">

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

import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function AdminLayout({ header, children }) {
    const admin = usePage().props.auth.admin;
    const {t} = useLaravelReactI18n();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="block md:flex h-screen">
            <aside className="hidden md:block w-64 bg-white border-r shadow-md p-4">
               <Link href={route('product.index')} className='flex items-center w-[140px] h-[130px] ml-8'>
                    <img src="/images/Ndiaye_Shoes_Logo.png"/>
                </Link>
                <nav className='space-y-2'>
                    <Link href={route('product.index')} className="block font-medium p-2 rounded hover:bg-blue-100">{t('Products')}</Link>
                    <Link href={route('size.index')} className="block font-medium p-2 rounded hover:bg-blue-100">{t('Sizes')}</Link>
                    <Link href={route('admin.users.index')} className="block font-medium p-2 rounded hover:bg-blue-100">{t('Users')}</Link>
                    <Link href={route('admin.orders.index')} className="block font-medium p-2 rounded hover:bg-blue-100">{t('Users Order')}</Link>
                </nav>
                <div className="absolute bottom-16 w-56">
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="w-full flex justify-between items-center rounded border border-transparent bg-gray-200 mr-1 p-2 text-sm font-medium"
                            >
                                {admin.name}
                                <svg
                                    className="-me-0.5 ms-2 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Link
                                href={route('admin.logout')}
                                method="post"
                                as="button"
                            >
                                {t('Log Out')}
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </aside>

            <div className='md:hidden flex justify-between bg-white shadow p-4'>
                <Link href={route('product.index')}>
                    <img src="/images/Ndiaye_Shoes_Logo.png" className='w-24 h-auto'/>
                </Link>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6"/>}
                </button>
            </div>

            {menuOpen && (
                <div className='fixed bg-black bg-opacity-50 z-40' onClick={() =>setMenuOpen(false)}>
                    <aside className="fixed left-0 top-0 h-full w-64 bg-white z-50 shadow-md p-4" >
                        <Link href={route('product.index')} className='flex items-center w-[140px] h-[130px] ml-8'>
                            <img src="/images/Ndiaye_Shoes_Logo.png"/>
                        </Link>
                        <nav className='space-y-2'>
                            <Link href={route('product.index')} className="block font-medium p-2 rounded hover:bg-blue-100">Product</Link>
                            <Link href={route('size.index')} className="block font-medium p-2 rounded hover:bg-blue-100">Size</Link>
                            <Link href={route('admin.users.index')} className="block font-medium p-2 rounded hover:bg-blue-100">User</Link>
                            <Link href={route('admin.orders.index')} className="block font-medium p-2 rounded hover:bg-blue-100">Order</Link>
                        </nav>
                        <div className="absolute bottom-16 w-56">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="w-full flex justify-between items-center rounded border border-transparent bg-gray-200 mr-1 p-2 text-sm font-medium"
                                    >
                                        {admin.name}
                                        <svg
                                            className="-me-0.5 ms-2 h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href={route('admin.logout')}
                                        method="post"
                                        as="button"
                                    >
                                        {t('Log Out')}
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </aside>
                </div>
            )}

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>     
    );
}

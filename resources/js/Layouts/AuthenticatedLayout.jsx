import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const  component  = usePage().component; 
    const {t} = useLaravelReactI18n();

    return (
        <div className="sm:ms-6 ">
            <div className="relative ms-3">
                {user ?  (
                    <Dropdown>
                        {component !== 'Profile/Edit' && (
                            <Dropdown.Trigger>
                                <span className="inline-flex rounded-md">
                                    <button
                                    type="button"
                                    className="inline-flex items-center rounded-md border border-transparent bg-white mr-1 px-3 pt-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                    >
                                    {user.name}
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
                                </span>
                            </Dropdown.Trigger>
                        )}
                        <Dropdown.Content>
                            <Dropdown.Link
                                href={route('profile.edit')}
                            >
                               {t('Profile')}
                            </Dropdown.Link>
                            <Dropdown.Link
                                href={route('logout')}
                                method="post"
                                as="button"
                            >
                                {t('Log Out')}
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ) : (
                    <Link href= {route('login')} className=" flex">
                        <img src="/images/user_icon.png" alt='login' className="w-[29px] mr-2 lg:w-[30px]"/>
                        <p className="hidden lg:block lg:mr-6 px-3 py-1 bg-black text-white rounded-lg">{t('Log In')}</p>
                    </Link>
                )}
            </div>
            
            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>     
    );
}

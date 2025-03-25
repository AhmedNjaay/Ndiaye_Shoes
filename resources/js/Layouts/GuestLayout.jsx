import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function GuestLayout({ children }) {
    const  component  = usePage().component; //Récupère la page actuelle
    const{t}= useLaravelReactI18n();
    
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-40 w-40 fill-current text-gray-500" />
                </Link>
            </div>
            {component === 'Auth/Login' && (
                <div>
                    <p className='text-xl font-medium'>{t('Enter your email address to log in')} <br /> {t('or sign up an account')}</p>
                </div>
            )}
            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}

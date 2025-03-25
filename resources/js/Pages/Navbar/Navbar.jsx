import { Link, useForm, usePage } from '@inertiajs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useLaravelReactI18n } from 'laravel-react-i18n'


export default function Navbar ({filters={}}) {
    console.log(filters);
    const user = usePage().props.auth.user;
    const {t} = useLaravelReactI18n();
 
    const  component  = usePage().component; //Récupère la page actuelle
    console.log('Page actuelle:', component);

    const { data, setData, post, processing, reset } = useForm({
    name: filters.name,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('home.search'), {
            onSuccess: () => reset(),
        });
    };

     
    const [cartCount, setCartCount] = useState(0);

    // Charger le nombre d'articles dans le panier au premier rendu
    useEffect(() => {
        fetch(route('cart.count')) // Adaptez la route pour récupérer le nombre d'articles
            .then((response) => response.json())
            .then((data) => setCartCount(data.count))
            .catch((error) => console.error('Erreur:', error));
    }, []); //s'exécute une seule fois, après le premier rendu

     
    return (

    <div>
       <div className='flex justify-between items-center mb-8'>
            <Link href={route('home')} className='flex items-center w-[140px] h-[130px] ml-8'>
                <img src="/images/Ndiaye_Shoes_Logo.png"/>
            </Link>
            {component !== 'Order/Order' && (
                <div className='mt-32 px-8 w-full absolute md:relative md:w-[400px] md:mt-0 md:mx-0 md:px-0'>
                    <form onSubmit={submit} className='w-full border rounded-full flex md:w-[400px]'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='self-center pl-4'/>    
                        <input
                            type="text" 
                            name='name'
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={t('Search')}
                            className='w-full border-0 outline-none shadow-none focus:bg-white focus:ring-0'
                            style={{
                                WebkitBoxShadow: '0 0 0 1000px white inset', // Fond blanc
                            }}
                        />  
                        <button disabled={processing} className='rounded-r-full self-center bg-black ml-4 text-white p-2'>{t('Search')}</button> 
                    </form>
                </div>
            )}

            <div className='flex items-center'>
                <div>
                    <AuthenticatedLayout/>
                </div>
                <Link href={route('cart.add')} className='flex mr-2'>
                    <img src="/images/icon_shop.png" alt='Logo de Ndiaye Shoes' className='relative w-[25px] mr-8' />
                    <span className={`absolute top-[56.5px] right-[48px] text-black text-md font-bold ${cartCount === 0 ? 'hidden' : cartCount >= 10 && 'top-[56px] right-[44px]'}`}>{cartCount}</span>
                </Link> 
            </div>
        </div> 
    </div>
  )
}

import { Head, Link, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useLaravelReactI18n } from 'laravel-react-i18n';


export default function Home ({products, filters}) {
    const{t} = useLaravelReactI18n();

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount);
    };
       
    const { flash } = usePage().props;
    
    const [showFlash, setShowFlash] = useState(false);
    useEffect(() => {
        if (flash.success) {
            setShowFlash(true);

            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 3000);

            // Nettoyer le timer si le composant est démonté (éviter des comportements inattendus ou des fuites de mémoire)
            return () => clearTimeout(timer);
        }
    }, [flash]); // Déclencher cet effet à chaque  changement de 'flash'

  return (
    <div>
        <Head>
            <title>{t('Home')}</title>
            <link rel="icon" type="image/png" href="images/icon.png" />
        </Head>

        <Navbar filters={filters}/>  

        {showFlash && (
            <div className='text-lg text-center p-1 md:p-4 bg-green-500'>
                {flash.success}
            </div>
        )}
        
        <div className='mt-20 mx-8 flex justify-center items-center gap-[30px] flex-wrap lg:mt-4 lg:mx-0'>
            {(Array.isArray(products.data) ? products.data : [] ).map((product) => {
                return(
                    <Link  key={product.id} href={route('detail.show', { slug: product.slug})} className='product-link'>
                        <div className='bg-gray-50 hover:bg-gray-200 shadow w-[300px] h-[300px] md:w-[400px] md:h-[400px]'>
                            <img 
                                src={product.image} 
                                className='w-full h-full'
                                loading="lazy"
                            />    
                        </div>
                        <div> 
                            <h1 className='text-lg font-medium pt-4'>{product.name}</h1>
                            <p className='text-base font-bold'>{formatCurrency(product.price)}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    
    </div>
  )
}

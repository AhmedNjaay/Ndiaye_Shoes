import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react'

export default function Summary ({ total }) {

    const {t} = useLaravelReactI18n();
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount);
    };
    
  return (
    
    <div>
        <div className='w-full text-xl font-medium mb-4 leading-10'>
            <div className='flex justify-between items-center lg:flex lg:justify-between lg:items-center'>
                <p className='text-lg'>{t('Subtotal')}</p>
                <p className='text-lg pl-2 lg:pl-12'>{formatCurrency(total)}</p>
            </div>
            <p className='text-yellow-500 font-bold'>{t('Free shipping')}</p>
            <hr />
            <div className='flex justify-between items-center my-2'>
                <p className='text-lg'>Total</p>
                <p className='text-lg pl-2 font-bold lg:pl-12'>{formatCurrency(total)}</p>
            </div>
            <hr /> 
        </div>
    </div>
  )
}
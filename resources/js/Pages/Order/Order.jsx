import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Head, useForm } from '@inertiajs/react'
import Summary from '../Summary/Summary';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Order ({cartItems = [], total, auth }) {
  console.log("Auth Data:", auth);
  console.log("CartItems:", cartItems);

  const {t} = useLaravelReactI18n();
  
  const { data, setData, post, processing, reset, errors } = useForm({
    user_id: auth.user.id,
    first_name: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    cartItems:  cartItems.reduce((acc ,item) => {
      const productMapped = item.products.map(product => ({
        product_id: product.pivot.product_id,
        size_id: item.size_id,
        quantity: item.quantity,
        total: item.total,
      }))

      return acc.concat(productMapped);
    }, [])
      
  });

  const [showCart, setShowCart] = useState(true);

  const submit = (e) => {
    e.preventDefault(); 
    console.log("Données soumises :", data); 
    post(route('order.store'), { 
      onSuccess: () => {
        reset();
      },
      onError: (errors) => console.error("Erreur lors de la soumission :", errors),
    });
  };


  return (
    <div>
      <Head>
        <title>{t('Order')}</title>
      </Head>
      <Navbar/>

      <h3 className='text-lg mb-4 md:text-2xl text-center font-medium'>{t('Order')}</h3>
      <div className='flex flex-col-reverse md:flex md:flex-row  md:ml-4 md:justify-between overflow-hidden'>
        <form onSubmit={submit} className='mx-8 lg:flex flex-col'>
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-base font-bold text-black'>{t('Email')}</label>
            <input
              id="email"
              type="email"
              placeholder={t('email address')}
              className='mb-4 p-2 w-full lg:w-[460px] border-1 border-gray-400 rounded-[4px] focus:ring-0 focus:border-black border-2'
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              style={{
                WebkitBoxShadow: '0 0 0 1000px white inset',
              }}
            />
            {errors.email && <div>{errors.email}</div>}
          </div>

          <div className='flex flex-col lg:gap-x-[20px] lg:flex-row'>
            <div className='flex flex-col'>
              <label htmlFor="first_name" className='text-base font-bold text-black'>{t('First name')}</label>
              <input
                id="first_name"
                type="text"
                placeholder={t('First name')}
                className='mb-4 p-2  w-full lg:w-[220px] border-1 border-gray-400 rounded-[4px] focus:ring-0 focus:border-black border-2'
                value={data.first_name}
                onChange={(e) => setData('first_name', e.target.value)}
                style={{
                    WebkitBoxShadow: '0 0 0 1000px white inset',
                }}
                />
              {errors.first_name && <div>{errors.first_name}</div>}
            </div>

            <div className='flex flex-col'>
              <label htmlFor="nom" className='text-base font-bold text-black'>{t('Name')}</label>
              <input
                id="name"
                type="text"
                placeholder={t('Name')}
                className='mb-4 p-2 w-full lg:w-[220px] border-gray-400 rounded-[4px] focus:ring-0 focus:border-black border-2'
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                style={{
                  WebkitBoxShadow: '0 0 0 1000px white inset',
                }}
              />
              {errors.name && <div>{errors.name}</div>}
            </div>
          </div>
              
          <div className='flex flex-col'>
            <label htmlFor="address" className='text-base font-bold text-black'>{t('Address')}</label>
            <input
              id="address"
              type="text"
              className='mb-4 p-2 w-full lg:w-[460px] border-1 border-gray-400 rounded-[4px] focus:ring-0 focus:border-black border-2'
              value={data.address}
              placeholder={t('Enter your address')}
              onChange={(e) => setData('address', e.target.value)}
              style={{
                WebkitBoxShadow: '0 0 0 1000px white inset',
              }}
            />
            {errors.address && <div>{errors.address}</div>}
          </div>

          <div className='flex flex-col'>
            <label htmlFor="phone"  className='text-base font-bold text-black'>{t('Phone number')}</label>
            <input
              id="phone"
              type="tel"
              placeholder={t('Phone number')}
              className='mb-4 p-2 w-full lg:w-[220px] border-1 border-gray-400 rounded-[4px] focus:ring-0 focus:border-black border-2'
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
              style={{
                WebkitBoxShadow: '0 0 0 1000px white inset',
              }}
            />
            {errors.phone && <div>{errors.phone}</div>}
          </div>

          <button type="submit" disabled={processing} 
            className={'text-lg text-white w-full lg:w-[220px] font-bold bg-black rounded-full mr-60 mt-4 p-4'}
          >
           {t('Send')}
          </button>
        </form>

        <div className='mx-0 w-full md:w-[350px] md:mx-8 md:flex flex-col'>
          <div className='flex flex-col'>
            <div className='flex justify-between mb-8 pr-8 w-full' onClick={() =>setShowCart(!showCart)}>
              <h3 className='cursor-pointer text-xl font-medium mt-8 ml-8 md:mt-3 md:ml-16 md:hidden'>{t('Show your cart')}</h3>
              <div className='cursor-pointer block md:hidden'> 
                {showCart ? (<img src="/images/up_arrow_icon.png" alt="up-icon" className='w-[40px] pl-2 pt-8'/>
                
                ) : (<img src="/images/down_arrow_icon.png" alt="down-icon" className='w-[40px] pl-2 pt-8'/>

                )}
              </div>
            </div>
            <div className='w-full px-8 md:px-0 md:flex md:flex-col'>
              {showCart && (
                <div>
                  <h3 className='text-xl font-medium mb-4'>{t('Summary')}</h3>
                  <div className='mb-16 block md:hidden'>
                    <Summary total={total}/>
                  </div>
                </div>
              )}

              <div className='hidden md:block'>
                <Summary total={total}/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

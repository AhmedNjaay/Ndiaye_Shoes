import { Head, Link } from '@inertiajs/react'
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useLaravelReactI18n } from 'laravel-react-i18n';


export default function Detail ({productDetail, filters, sizes = []}) {
  console.table(productDetail); 
  console.table( sizes); 

  const {t} = useLaravelReactI18n();
  
  const [selectSize, setSelectSize] = useState(null);
  const [detail, setDetail] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount);
  };
 
  return (
    <div>
      <Head>
        <title>{productDetail.name}</title>   
      </Head>
      <Navbar filters={filters}/>

      <div key={productDetail.id} className='mx-0 px-0 lg:flex justify-around mx-12'>
        <div className='flex flex-col'>
          <div className='w-full mt-20 lg:mt-4 lg:prod-item mt-2 bg-gray-50 rounded-xl p-2 flex justify-center'>
            <img src={productDetail.image}/>    
          </div>
        </div>

        <div className='pt-4 flex flex-col items-center lg:w-[400px] lg:flex lg:flex-col lg:items-start'>
          <h1 className='pt-10 pl-12 absolute top-[130px] left-[0px] text-xl lg:pl-0 lg:pt-0 lg:static text-xl font-medium '>{productDetail.name}</h1>  
          <p className='text-lg font-bold '>{formatCurrency(productDetail.price)}</p>
          <p className='text-lg text-gray-600 font-medium'>{t('Select size')}</p>

          <div className='grid grid-cols-3 gap-[8px] w-full'> 
            {(Array.isArray(sizes) ? sizes : []).map((size) => {
              return (
              <div 
                key={size.id} 
                className={`border-2 rounded-[8px] outline-none cursor-pointer hover:border-black ${selectSize === size.id ? 'border-black' : 'border-gray-200'}`}
                onClick={() => setSelectSize(size.id)} 
              >
                <p className='text-lg text-center p-2'>{size.numberSize}</p>
              </div>
              )
            })}
          </div>
        
          <Link 
            href={route('cart.index')} 
            method="post"
            data={{ 
              product_id: productDetail.id, 
              size_id: selectSize, 
              quantity: 1 
            }} 
            as='button' 
            className='w-full text-sm md:text-lg text-white font-bold bg-black rounded-full mt-4 lg:px-0 py-4'
          >
            {t('Add to cart')}
          </Link>
          <div className={`w-full flex justify-between items-center cursor-pointer ${detail ? 'text-black font-bold' : '' }`} 
            onClick={() => setDetail(!detail)}
          >
            <div>
              <p className='text-black text-base md:text-lg font-medium mt-4'>{t('Show details :name', { name: productDetail.name })}</p>
            </div>
            <div>
             {detail ? (<img src="/images/up_arrow_icon.png" alt="up-icon" className='w-[40px] pl-2 pt-4'/>
              
              ) : (<img src="/images/down_arrow_icon.png" alt="down-icon" className='w-[40px] pl-2 pt-4'/>

              )}
            </div>
          </div>
          

          <div className='w-full text-base  lg:w-[400px] pt-2'>
            {detail &&(
              <p>{productDetail.description}</p>
            )}
          </div>
        </div> 
      </div> 
    </div>                                  
  )
}
      

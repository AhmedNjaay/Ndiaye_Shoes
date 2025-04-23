import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react'

export default function Product ({products = []}) {

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount);
  };

  const {t} = useLaravelReactI18n();
  
  return (
    <AdminLayout>
      <Head>
        <title>{t('Product')}</title>
      </Head>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('Products')}</h1>
        <Link href={route('product.create')} className='text-white px-4 py-2  rounded bg-blue-500'>{t('Add')}</Link>
      </div>

      <table className='hidden lg:table bg-red-500 w-full shadow rounded text-left overflow-hidden bg-white'>
        <thead className='bg-gray-100'> 
          <tr className=''> 
            <th className='p-4'>id</th>
            <th>{t('Name')}</th>
            <th className='pl-6'>{t('Price')}</th>
            <th>{t('Stock quantity')}</th>
            <th>Description</th>              
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(products.data) ? products.data : []).map((product) => {
            return(
              <tr key={product.id} >
                <td className='p-4'>{product.id}</td>
                <td>{product.name}</td>
                <td className='pl-6'>{formatCurrency(product.price)}</td>
                <td className='pl-6'>{product.stock_quantity}</td>
                <td>{product.description}</td>
                <td className='w-[200px]'><img src={product.image} /></td>
                <td className="flex space-x-2 mt-20 mr-2">
                  <Link href={route('product.edit', product.id)} as='button' className='text-white p-2 rounded bg-blue-500'>{t('Edit')}</Link>
                  <Link href={route('product.destroy', product.id)} as='button' method='delete' className='text-white p-2 rounded bg-red-500'>{t('Delete')}</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="lg:hidden">
        {products.data?.map(product => (
          <div  key={product.id}  className="border rounded shadow p-4">
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>{t('Name')}:</strong> {product.name}</p>
            <p><strong>{t('Price')}:</strong> {formatCurrency(product.price)}</p>
            <p><strong>{t('Stock Quantity')}:</strong> {product.stock_quantity}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <img src={product.image} className='max-w-[250px]'/>
            <div className='flex space-x-2 mt-20'>
              <Link href={route('product.edit', product.id)} as='button' className='text-white p-2 rounded bg-blue-500'>{t('Edit')}</Link>
              <Link href={route('product.destroy', product.id)} as='button' method='delete' className='text-white p-2 rounded bg-red-500'>{t('Delete')}</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end flex-wrap items-center gap-2 mt-2">
          {products.links?.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className={`inline-block py-2 px-4 border-2 border-gray-300 rounded-[4px] text-blue-600 hover:bg-blue-600 hover:text-white ${link.active ? 'bg-blue-600 !text-white border-blue-600' : link.url ? '' : 'cursor-not-allowed !text-gray-400 pointer-events-none border-gray-100'}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
          ))}
      </div>
      
    </AdminLayout>
  )
}

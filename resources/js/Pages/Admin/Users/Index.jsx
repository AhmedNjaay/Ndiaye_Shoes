import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import React from 'react'

export default function Index ({ orders }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount);
  };

  const {t} = useLaravelReactI18n();
  
  return (
     <AdminLayout>
      <Head>
        <title>{t('Users')}</title>
      </Head>

      <h1 className="text-2xl font-bold mb-6">{t('Users')}</h1>
      
      <table className='hidden lg:table w-full shadow rounded text-left overflow-hidden bg-white'>
        <thead className='bg-gray-100'> 
            <tr>
              <th className='p-4'>id</th>
              <th>{t('Email')}</th>
              <th>{t('First name')}</th>
              <th>{t('Name')}</th>
              <th>{t('Address')}</th>              
              <th>{t('Phone number')}</th>
              <th>{t('Total')}</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {(Array.isArray(orders.data) ? orders.data : []).map((order) => {
            return(
              <tr key={order.id}>
                <td className='p-4'>{order.id}</td>
                <td className=''>{order.email}</td>
                <td>{order.first_name}</td>
                <td >{order.name}</td>
                <td >{order.address}</td>
                <td>{order.phone}</td>
                <td>{formatCurrency(order.total)}</td>
                <td><Link href={route('admin.users.destroy', order.id)} as='button' method='delete' className='text-white p-2 rounded bg-red-500'>Delete</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="lg:hidden">
        {orders.data?.map(order => (
          <div  key={order.id}  className="border rounded shadow p-4">
            <p><strong>ID:</strong> {order.id}</p>
            <p><strong>Email:</strong> {order.name}</p>
            <p><strong>First Name:</strong> {order.first_name}</p>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Total:</strong> {formatCurrency(order.total)}</p>
            <td><Link href={route('admin.users.destroy', order.id)} as='button' method='delete' className='text-white mt-4 p-2 rounded bg-red-500'>Delete</Link></td>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end flex-wrap items-center gap-2 mt-2">
        {orders.links?.map((link, index) => (
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

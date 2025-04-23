import AdminLayout from '@/Layouts/AdminLayout'
import { Head, Link } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react'

export default function Size ({sizes = []}) {

  const {t} = useLaravelReactI18n();
  
  return (
    <AdminLayout>
      <Head>
        <title>{t('Size')}</title>
      </Head>

      <div className="flex justify-between items-center mb-6"> 
        <h1 className="text-2xl font-bold">{t('Sizes')}</h1>
        <Link href={route('size.create')}  className='text-white px-4 py-2  rounded bg-blue-500'>{t('Add')}</Link>
      </div>
       
      <table className='w-full shadow rounded text-left bg-white'>
        <thead className='bg-gray-100'>
            <tr>
              <th className='p-4'>id</th>
              <th>{t('Name')}</th>
              <th className='text-right pr-4'>Actions</th>
            </tr>
        </thead>
        <tbody>
          {(Array.isArray(sizes.data) ? sizes.data : []).map((size) => {
            return(
              <tr key={size.id}>
                <td className='p-4'>{size.id}</td>
                <td>{size.numberSize}</td>
                <td className='flex justify-end space-x-2 mt-4 pr-4'>
                  <Link href={route('size.edit', size.id)} as='button' className='text-white p-2 rounded bg-blue-500'>{t('Edit')}</Link>
                  <Link href={route('size.destroy', size.id)} as='button' method='delete' className='text-white p-2 rounded bg-red-500'>{t('Delete')}</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </AdminLayout>
  )
}

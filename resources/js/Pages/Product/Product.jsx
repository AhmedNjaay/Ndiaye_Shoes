import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function Product ({products = []}) {

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount);
  };
  
  console.log('ed', products);
  return (
    <div>
      <Head>
        <title>Products</title>
        <link rel="icon" type="image/png" href="images/icon.png" />
      </Head>
      <div className= "ml-4"> 
        <Link href={route('product.create')} className='text-white p-2 m-4 rounded-[8px] bg-blue-500' as='button'>Add Produit</Link>
        <Link href={route('size.index')} className='text-white p-2 m-4 rounded-[8px] bg-blue-500'>Size</Link>
      </div>
       
      <table className='w-full'>
        <thead className='shadow' > 
            <tr>
              <th className='pr-6'>Name</th>
              <th className='pl-1'>Price</th>
              <th className='pr-2'>Stock quantity</th>
              <th>Description</th>              
              <th>Image</th>
              <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {(Array.isArray(products.data) ? products.data : []).map((product) => {
            return(
              <tr key={product.id}>
                <td className='p-8'>{product.name}</td>
                <td>{formatCurrency(product.price)}</td>
                <td className='pl-6'>{product.stock_quantity}</td>
                <td>{product.description}</td>
                <td className='w-[200px]'><img src={product.image} /></td>
                <div className='flex flex-col items-center gap-y-2 mt-14'>
                  <td><Link href={route('product.edit', product.id)} as='button' className='text-white p-2 rounded-[8px] bg-blue-500'>Edit</Link></td>
                  <td><Link href={route('product.destroy', product.id)} as='button' method='delete' className='text-white p-2 rounded-[8px] bg-red-500'>Delete</Link></td>
                </div>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex justify-end flex-wrap items-center gap-2 mr-6">
          {products.links?.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className={`inline-block py-2 px-4 border-2 border-gray-300 rounded-[4px] text-blue-600 hover:bg-blue-600 hover:text-white ${link.active ? 'bg-blue-600 !text-white border-blue-600' : link.url ? '' : 'cursor-not-allowed !text-gray-400 pointer-events-none border-gray-100'}`}
            dangerouslySetInnerHTML={{ __html: link.label }}
          />
          ))}
      </div>
      
    </div>
  )
}

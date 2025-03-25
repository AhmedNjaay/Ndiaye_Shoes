import { Head, Link } from '@inertiajs/react'
import React from 'react'

export default function Size ({sizes = []}) {
  return (
    <div>
      <Head>
        <title>Size</title>
        <link rel="icon" type="image/png" href="images/icon.png" />
      </Head>

      <div className= "ml-4"> 
        <Link href={route('product.index')} className='text-white p-2 m-4 rounded-[8px] bg-blue-500' as='button'>Product</Link>
        <Link href={route('size.create')} className='text-white p-2 m-4 rounded-[8px] bg-blue-500'>Add Size</Link>
      </div>
       
      <table className='ml-4'>
        <thead className='shadow'>
            <tr>
              <th className='p-8'>Name</th>
            </tr>
        </thead>
        <tbody>
          {(Array.isArray(sizes.data) ? sizes.data : []).map((size) => {
            return(
              <tr key={size.id}>
                <td>{size.numberSize}</td>
                  <div className='flex flex-col items-center mt-8'>
                      <td><Link href={route('size.edit', size.id)} as='button' className='text-white p-2 rounded-[8px] bg-blue-500'>Edit</Link></td>
                      <td><Link href={route('size.destroy', size.id)} as='button' method='delete' className='text-white p-2 rounded-[8px] bg-red-500'>Delete</Link></td>
                  </div>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

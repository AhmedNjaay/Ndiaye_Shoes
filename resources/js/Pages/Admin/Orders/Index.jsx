import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react'

export default function Index ({ orderItems }) {
   return (
      <AdminLayout>
       <Head>
         <title>Orders</title>
       </Head>
 
       <h1 className="text-2xl font-bold mb-6">Orders</h1>
       
       <table className='w-full shadow rounded text-left overflow-hidden bg-white'>
         <thead className='bg-gray-100'> 
            <tr>
                <th className='p-4'>id</th>
                <th>User OrderId</th>
                <th>ProductId</th>
                <th>SizeId</th>
                <th>Quantity</th>
            </tr>
         </thead>
         <tbody>
           {(Array.isArray(orderItems.data) ? orderItems.data : []).map((order) => {
             return(
               <tr key={order.id}>
                <td className='p-4'>{order.id}</td>
                <td>{order.order_id}</td>
                <td className=''>{order.product_id}</td>
                <td>{order.size_id}</td>
                <td >{order.quantity}</td>
               </tr>
             )
           })}
         </tbody>
       </table>
      
       <div className="flex justify-end flex-wrap items-center gap-2 mt-2">
        {orderItems.links?.map((link, index) => (
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
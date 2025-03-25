import { Head, useForm } from '@inertiajs/react';
import React from 'react'

export default function Edit (sizes){
       
    const { data, setData, patch, processing, reset, errors } = useForm({
        numberSize: sizes.sizes.numberSize,
    });

    const submit = (e) => {
        e.preventDefault(); 
          console.log("Données du test:", sizes); 
        patch(route('size.update', sizes.sizes.id), {
            onSuccess: () => reset() });
     };
         
  return (
    <div>
        <Head>
            <title>{sizes? 'Edit Size':'Create Size'}</title>
        </Head>
        <div className="text-center text-xl font-bold my-6">  
            <h1>{sizes? 'Edit Size':'Create Size'}</h1>
        </div>
           <form onSubmit={submit} className='flex items-center flex-col flex-wrap gap-4'>
            <div className="flex flex-col pl-4 max-w-[300px] gap-x-4"> 
            <label htmlFor='size' className='text-base font-weight text-black'>Size</label>
            <input id='size' type='text' className='p-2 text-base border-2 border-gray-500 rounded-[4px] focus:ring-0 focus:border-gray-500' value={data.numberSize} onChange={e =>setData('numberSize', e.target.value )} />
            {errors.name && <div>{errors.name}</div>} 

            <button type='submit' disabled={processing} className='m-4 p-2 bg-blue-600 text-white rounded-[10px] w-[200px]'>
                {sizes? 'Edit':'Create'}
            </button>
            </div>
        </form>         
    </div>
  )
}

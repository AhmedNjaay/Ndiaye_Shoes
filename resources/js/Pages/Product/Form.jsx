import { Head, useForm } from '@inertiajs/react'
import React from 'react'

export default function Form ({products = null, sizes = []}) {
    console.table(sizes);

    const {data, setData, post, processing, reset, errors} = useForm ({
    name: '',
    price: '',
    stock_quantity: '',
    description: '',
    image: null,
    size_ids: [],
  });

   const submit = (e) => {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('stock_quantity', data.stock_quantity);
        formData.append('description', data.description);
        formData.append('image', data.image);
        formData.append('size_ids[]', data.size_ids);
        
        post(route('product.store'), { 
            data: formData,
            onSuccess: () => reset(),
            onError: (errors) => console.error("Erreur lors de la soumission :", errors),
        });
    };
  
    return (
    <div> 
        <Head>
            <title>{products? 'Editer un produit':'Créer un produit'}</title>
        </Head>
        <div className="text-center text-xl font-bold my-6">
            <h1>{products? 'Editer un produit':'Créer un produit'}</h1>
        </div>
        <form onSubmit={submit} className='flex items-center flex-col flex-wrap gap-4'>
            <div className="flex flex-col pl-4 max-w-[300px] gap-x-4">   
                     
                <label htmlFor='name' className='text-base font-weight text-black'>Name</label>
                <input id='name' type='text' className='p-2 text-base border-2 border-gray-500 rounded-[4px] focus:ring-0 focus:border-gray-500' value={data.name} onChange={e =>setData('name', e.target.value )} />
                {errors.name && <div>{errors.name}</div>}
            
                <label htmlFor='price' className='text-base font-weight text-black'>Price</label>
                <input id='price' type='number' className='p-2 text-base border-2 border-gray-500 rounded-[4px] focus:ring-0 focus:border-gray-500' value={data.price} onChange={e =>setData('price', e.target.value )} />
                {errors.price && <div>{errors.price}</div>}

                <label htmlFor='stock' className='text-base font-weight text-black'>Stock quantity</label>
                <input id='stock' type='number'  className='p-2 text-base border-2 border-gray-500 rounded-[4px] focus:ring-0 focus:border-gray-500' value={data.stock_quantity} onChange={e =>setData('stock_quantity', e.target.value )} />
                {errors.stock_quantity && <div>{errors.stock_quantity}</div>}

                <label htmlFor='size' className='text-base font-weight text-black'>Size</label>
                <select 
                    id="size" 
                    value={data.size_ids} 
                    multiple
                    className='p-2 text-base border-2 border-gray-500 rounded-[4px] focus:ring-0 focus:border-gray-500'
                    onChange={e =>setData('size_ids', Array.from(e.target.selectedOptions).map((option)=> option.value))}
                >
                    {Array.isArray(sizes) && sizes.map((size) => {
                    return(
                        <option key={size.id} value={size.id}>
                            {size.numberSize}
                        </option>
                        )
                    })}
                </select>
                {errors.size_ids && <div>{errors.size_ids}</div>}

                <label htmlFor='description' className='text-base font-weight text-black'>Description</label>
                <textarea 
                    id='description' 
                    className='p-2 text-base border-2 border-gray-500 rounded-[4px] focus:ring-0 focus:border-gray-500'
                    value={data.description} 
                    onChange={e =>setData('description', e.target.value )} 
                />
                {errors.description && <div>{errors.description}</div>}
                
                <div>
                    <label htmlFor='image' className='text-base font-weight text-black'>Image</label>
                    <input id='image' type='file' className='p-2 text-base border-2 border-gray-500 rounded-[4px] focus:ring-0 focus:border-gray-500' onChange={e =>setData('image', e.target.files[0] )} />
                    {errors.image && <div>{errors.image}</div>}
                </div>
                
                <button type='submit' disabled={processing} className='m-4 p-2 bg-blue-600 text-white rounded-[10px] w-[200px]'>
                    {products? 'Update':'Create'} 
                </button>
            </div>  
        </form>    
    </div>
  )
}

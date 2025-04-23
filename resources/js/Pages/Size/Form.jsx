import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import React from 'react'
export default function Form ({sizes = null}) {

    console.log("Contenu de sizes dans Form:", sizes);
        const { data, setData, post, processing, reset, errors } = useForm({
        numberSize: '',
    });

    const submit = (e) => {
        e.preventDefault(); 
        post(route('size.store'), { onSuccess: () =>{
                reset();
        },
        onError: (errors) => {
            console.error("Erreur lors de la soumission :", errors);
        }
        });
    };

    const {t} = useLaravelReactI18n();

  return (
    <AdminLayout>
        <Head>
            <title>{sizes? 'Editer une taille':'Créer une taille'}</title>

        </Head>
        <div className='text-center text-xl font-bold my-8'>
          <h1>{sizes? 'Editer une taille':'Créer une taille'}</h1>
        </div>
        <form onSubmit={submit} className='flex items-center flex-col flex-wrap gap-4'>
            <div className='flex flex-col pl-4 max-w-[300px] gap-x-4'> 
                
                <label htmlFor='size' className='text-base font-weight text-black'>{t('Size')}</label>
                <input id='size' type='text' className='p-2 text-base border-2 border-gray-500 rounded-[4px] focus:ring-0 focus:border-gray-500' value={data.numberSize} onChange={e =>setData('numberSize', e.target.value )} />
                {errors.name && <div>{errors.name}</div>}    
                             
                <button type='submit' disabled={processing} className='m-4 p-2 bg-blue-600 text-white rounded-[10px] w-[200px]'>
                    {sizes? 'Mettre à jour':'Créer'}
                </button>
            </div>
        </form>            
    </AdminLayout>
  )
}

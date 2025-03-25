import { Head, Link, router, usePage } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar';
import Summary from '../Summary/Summary';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function Cart ({products = [], filters, cartItems=[], sizes, total}) {

    console.table(sizes);
    console.table(cartItems); 
    console.log('Total', total);

    const { flash } = usePage().props;
    console.log(usePage().props);

    const {t} = useLaravelReactI18n();
    

    const [showFlash, setShowFlash] = useState(false); // Etat pour contrôller la visibilité du message
    const [flashMessage, setFlashMessage] = useState(''); // Etat pour stocker le message
    const [flashType, setFlashType] = useState(''); // Etat pour stocker le type du message

    useEffect(() => {
        if (flash.success || flash.error) {
            setShowFlash(true);
            setFlashMessage(flash.success || flash.error)
            setFlashType(flash.success ? 'success' : 'error');

            const timer = setTimeout(() => {
                setShowFlash(false);
            }, 3000);

             // Nettoyer le timer si le composant est démonté (éviter des comportements inattendus ou des fuites de mémoire)
            return () => clearTimeout(timer);
        }
    }, [flash]); // Déclencher cet effet à chaque  changement de 'flash'

    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, cart) => {
            cart.products.forEach((product) => {
                const key = `${product.id}-${cart.size_id}`; // Clé unique : productId-sizeId
                acc[key] = cart.quantity; // Utilise la clé unique
            });
            return acc;
        }, 
        {})
    );

    const updateQuantity = (cartId, productId, quantity) => {
        router.patch(route('cart.updateQuantity'), {
            cart_id: cartId,
            product_id: productId,
            quantity: quantity,
        }, {
            preserveState: false, // Force le rechargement des données depuis le backend
            onSuccess: () => {
                setQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [`${productId}-${cartId}`]: quantity,
                }));
            },
            onError: (errors) => console.error(errors),
        });
    };

    const increment = (cartId, productId, sizeId) => {
        const key = `${productId}-${sizeId}`; 
        const currentQuantity = quantities[key]; // Quantité actuelle
        
        const cartItem = cartItems.find(cart => cart.id === cartId);
        const product = cartItem.products.find(product => product.id === productId);
        const maxStock = product.stock_quantity;

        if (currentQuantity + 1 <= maxStock) {
            const newQuantity = currentQuantity + 1;
            updateQuantity(cartId, productId, newQuantity);
        } else {
            alert('Insufficient stock!');
        }
    };

    const decrement = (cartId, productId, sizeId) => {
        const key = `${productId}-${sizeId}`;
        const currentQuantity = quantities[key];
        const newQuantity = Math.max(1, currentQuantity - 1);
        updateQuantity(cartId, productId, newQuantity);
    };
    
    const handleDelete = (cartId) => {
        router.delete(route('cart.destroy', cartId), {
            preserveState: false,
            onSuccess: () => console.log('Supprimé avec succès'),
            onError: (errors) => console.error(errors),
        })
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount);
    };

    return (
    <div>
        <Head>
            <title>{t('Shopping cart')}</title>
        </Head>
        <Navbar filters={filters}/>
        
        <div className='grid grid-cols-1 w-full' >
            {showFlash && (
                <div className={`m-2 p-1 text-lg text-center md:p-4 ${flashType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {flashMessage}
                </div>
            )}
            <div className='mx-8 md:flex md:mx-8 md:justify-between'>
                <div className="ml-8 lg:flex flex-col gap-y-[40px]">
                    <h3 className='pt-8 py-1 text-xl lg:text-2xl font-medium'>{t('Shopping cart')}</h3>
                    {cartItems.length > 0 ? (
                        cartItems.map((cart) => (
                            <div key={cart.id}>
                                {cart.products.map((product) => {
                                    const productId = product.id;
                                    const sizeId = cart.size_id;
                                    const key = `${productId}-${sizeId}`

                                    return(
                                        <div key={key} className=" mb-8 md:flex relative">
                                            <div>
                                                <img src={product.image} className=' mt-10 lg:mt-0 bg-gray-100 w-[150px] h-[150px] mb-2'/>
                                                <div className='pb-8 lg:pb-0 flex md:justify-center items-center '>
                                                    <button 
                                                        className={`bg-black text-white text-xl w-7 mr-1.5 rounded 
                                                                ${quantities[key] === 1 ? 'bg-transparent border-0 p-0' : ''}`
                                                            }
                                                        onClick={() => {
                                                            if(quantities[key] === 1) {
                                                                handleDelete(cart.id);
                                                            } else {
                                                                decrement(cart.id, productId, sizeId)
                                                            }
                                                        }}
                                                    >
                                                        {quantities[key] === 1 ? 
                                                            (
                                                            <img src="images/icon_delete.png" alt="delete_logo" className='w-[22px]'/>
                                                            ) : ('-')
                                                        } 
                                                    </button>
                                                    <p className='px-9 text-2xl font-bold'>{quantities[key]}</p>
                                                    <button 
                                                        className='bg-black text-white text-xl w-7 ml-0.5 rounded' 
                                                        onClick={() =>increment(cart.id, productId, sizeId)}
                                                    >
                                                        +
                                                    </button>                                           
                                                </div>                                                                      
                                            </div>
                                            
                                            <div className='ml-4 mt-2 md:mt-16 lg:mt-0'>
                                                <h3 className='absolute left-[0px] bottom-[280px] md:absolute md:left-[0px] md:bottom-[220px] lg:static lg:text-lg font-bold'>{product.name}</h3>
                                                <p>{t('Size: :name', { name:cart.size.numberSize })}</p>
                                                <p>{t('Only left :name', {name: product.stock_quantity} )}</p>
                                            </div>
                                            <p className='absolute left-[16px] top-[200px] md:absolute md:text-base md:left-[165px] md:top-[35px] lg:static lg:ml-32 lg:mt-1 text-lg font-medium'>{formatCurrency(cart.total)}</p>
                                        </div>                            
                                    )
                                })}
                            </div>
                        ))
                    ) : (
                        <p className='text-2xl mt-8 w-full'>{t('Your cart is empty.')}</p>
                    )}
                </div>
                
                {cartItems[0] && ( 
                    <div className='w-full px-8 md:w-[400px] md:flex md:flex-col md:pt-16 md:mt-5 lg:mt-8'>
                        <h3 className='text-xl font-medium mt-16 md:mt-3 mb-4'>{t('Summary')}</h3>
                        <Summary total={total}/>
                    
                        <Link 
                            href={route('order.index')}
                            as='button' 
                            className='w-full text-sm md:text-lg text-white font-bold bg-black rounded-full  py-4'
                        >
                          {t('Order')}
                        </Link>
                    </div> 
                )}
                
            </div>
            <div className='ml-16 lg:ml-16'>
                <h3 className='mt-16 mb-8  text-2xl font-medium'>{t('You might like these shoes')}</h3>
                <div className='flex gap-[15px]  overflow-x-auto'>
                    {(Array.isArray(products.data) ? products.data : [] ).map((product) => {
                        return(
                        <Link  key={product.id} href={route('detail.show', { slug: product.slug})}>
                            <div>
                            <div className='min-w-[320px] md:min-w-[400px] bg-gray-100 hover:bg-gray-200 shadow'>
                                <img src={product.image} className='w-[320px] md:w-[400px] md:h-[400px]'/>
                            </div>
                            <div>
                                <h3 className='pt-4 text-lg font-medium'>{product.name}</h3>
                                <p className='text-base font-bold'>{formatCurrency(product.price)}</p>
                            </div>
                            </div>
                        </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}

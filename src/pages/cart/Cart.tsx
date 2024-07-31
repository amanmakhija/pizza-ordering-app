import { useMutation, useQuery } from '@tanstack/react-query';
import { checkout, get } from '../../utils/cartRequests';
import './cart.css';
import { Cart, Order } from '../../utils/type';
import { toast } from 'react-toastify';
import Card from '../../components/cart-item/Card';
import { create } from '../../utils/orderRequests';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
    const navigate = useNavigate();

    const { data, refetch, error, isLoading } = useQuery<Cart, Error>({
        queryKey: ['cart'],
        queryFn: get
    });

    const orderMutation = useMutation({
        mutationFn: create,
        onSuccess: () => {
            checkoutMutation.mutate();
        },
        onError: (error: any) => {
            toast.error(`${error.response.data.message} (${error.response.status})`);
        }
    })

    const checkoutMutation = useMutation({
        mutationFn: checkout,
        onSuccess: () => {
            toast.success('Order placed successfully');
            navigate('/profile')
        },
        onError: (error: any) => {
            toast.error(`${error.response.data.message} (${error.response.status})`);
        }
    })

    if (isLoading) return <h1>Loading...</h1>;

    if (error) {
        toast.error(error.message);
        return <h1>Error</h1>;
    }

    if (!data) return <h1>No data available</h1>;

    const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const order = {
            ingredients: data?.ingredients.map((ingredient) => ingredient.id),
            total: data?.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0),
            paymentMethod: 'COD'
        }
        orderMutation.mutate(order);
    }

    return (
        <div className='cart'>
            <h1>Cart</h1>
            {data.ingredients.length !== 0 ? data.ingredients.map((ingredient) => (
                <Card key={ingredient.id} data={ingredient} refetch={refetch} />
            )) : <h1 className='empty'>No ingredients in cart</h1>}
            {data.ingredients.length !== 0 && <button onClick={handleCheckout} className='checkout-btn'>Checkout</button>}
        </div>
    );
};

export default CartPage;

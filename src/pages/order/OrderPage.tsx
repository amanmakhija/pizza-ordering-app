import { useMutation, useQuery } from '@tanstack/react-query';
import './order.css';
import { cancel, get } from '../../utils/orderRequests';
import { Order } from '../../utils/type';
import Loading from '../../components/loading/Loading';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import React from 'react';
import { format, parseISO } from 'date-fns';

const OrderP: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, refetch, error, isLoading } = useQuery<Order, Error>({
        queryKey: ['order'],
        queryFn: () => get(+id!),
        enabled: !!id
    });

    const cancelMutation = useMutation({
        mutationFn: cancel,
        onSuccess: () => {
            toast.success('Order cancelled successfully');
            refetch();
        },
    })

    const cancelBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        cancelMutation.mutate(+id!);
    }

    if (isLoading) return <Loading />;

    if (error) {
        toast.error(error.message);
        return <h1>Error</h1>;
    }

    if (!data) return <h1>No data available</h1>;

    return (
        <div className='order'>
            <div className="order-page">
                <h1>Order Details</h1>
                <div className="order-details">
                    <p><strong>Order ID:</strong> {data.order.id}</p>
                    <p><strong>Placed At:</strong> {format(parseISO(data.order.orderedAt), 'PPpp')}</p>
                    <p><strong>Status:</strong> {data.order.status}</p>
                    <p><strong>Total Price:</strong> ₹ {data.order.total}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        {data.ingredients && data.ingredients.map((ingredient) => (
                            <li key={ingredient.id}>
                                <p><strong>Name:</strong> {ingredient.name}</p>
                                <p><strong>Price:</strong> ₹ {ingredient.price}</p>
                                <p><strong>Type:</strong> {ingredient.type}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {data.order.status !== 'CANCELLED' && <button onClick={cancelBtn} className='cancel-btn'>Cancel</button>}
        </div>
    );
};

export default OrderP;

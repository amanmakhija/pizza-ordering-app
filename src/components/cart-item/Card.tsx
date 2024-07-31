import React from 'react';
import './card.css';
import { Ingredient } from '../../utils/type';
import { useMutation } from '@tanstack/react-query';
import { remove } from '../../utils/cartRequests';
import { toast } from 'react-toastify';

type CardProps = {
    data: Ingredient;
    refetch?: () => void;
};

const Card: React.FC<CardProps> = ({ data, refetch }) => {
    const removeFromCartMutation = useMutation({
        mutationFn: remove,
        onSuccess: () => {
            refetch && refetch();
        },
        onError: (error: any) => {
            toast.error(`${error.response.data.message} (${error.response.status})`);
        }
    });

    const removeFromCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        removeFromCartMutation.mutate({ ingredientId: data.id });
    };

    return (
        <div className='cart-card'>
            <div className='cart-card-thumbnail' style={{ backgroundImage: `url(/assets/${data.image}.jpg)` }}></div>
            <div className='cart-card-details'>
                <h1>{data.name}</h1>
                <p>₹ {data.price}</p>
                <span>{data.type}</span>
            </div>
            <div className='cart-card-remove'>
                <button onClick={removeFromCart}>Remove</button>
            </div>
        </div>
    );
};

export default Card;

import React from 'react';
import './card.css';
import { Ingredient } from '../../utils/type';
import { useMutation } from '@tanstack/react-query';
import { add } from '../../utils/cartRequests';
import { toast } from 'react-toastify';

type CardProps = {
    data: Ingredient;
};

const Card: React.FC<CardProps> = ({ data }) => {
    const addToCartMutation = useMutation({
        mutationFn: add,
        onError: (error: any) => {
            toast.error(`${error.response.data.message} (${error.response.status})`);
        }
    });

    const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addToCartMutation.mutate({ ingredients: [data.id] });
    };

    return (
        <div className='card'>
            <div className='card-thumbnail' style={{ backgroundImage: `url(/assets/${data.image}.jpg)` }}></div>
            <div className='card-details'>
                <h1>{data.name}</h1>
                <button onClick={addToCart}>₹ {data.price}</button>
            </div>
        </div>
    );
};

export default Card;

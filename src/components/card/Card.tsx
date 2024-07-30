import React from 'react';
import './card.css';
import { Ingredient } from '../../utils/type';

type CardProps = {
    data: Ingredient;
};

const Card: React.FC<CardProps> = ({ data }) => {
    return (
        <div className='card'>
            <div className='card-thumbnail' style={{ backgroundImage: `url(${data.image})` }}></div>
            <div className='card-details'>
                <h1>{data.name}</h1>
            </div>
        </div>
    );
};

export default Card;

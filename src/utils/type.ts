export type User = {
    id: number;
    name: string;
    email: string;
    profilePicture: string;
}

export type Ingredient = {
    id: number;
    name: string;
    price: number;
    type: 'BREAD' | 'SAUCE' | 'VEGETABLE' | 'CHEESE' | 'MEAT' | 'SPICE';
    image: string;
}

export type Cart = {
    ingredients: Ingredient[];
}

export type Order = {
    id?: number;
    ingredients: Ingredient[];
    total: number;
    paymentMethod: 'COD' | 'CARD';
}
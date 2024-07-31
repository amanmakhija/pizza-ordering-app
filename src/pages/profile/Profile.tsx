import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import OrderPage from '../../components/order/Order';
import { getAll } from '../../utils/orderRequests';
import { Order, Orders } from '../../utils/type';
import './profile.css';

export default function Profile() {
    const navigate = useNavigate();

    const { data, error, isLoading } = useQuery<Orders, Error>({
        queryKey: ['orders'],
        queryFn: getAll
    });

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error('You must be logged in to view this page');
            navigate('/register');
        }
    }, [navigate]);

    if (isLoading) return <Loading />;

    if (error) {
        toast.error(error.message);
        return <h1>Error</h1>;
    }

    if (!data) return <h1>No data available</h1>;

    console.log(data);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    console.log(data);

    return (
        <>
            {user ? (
                <div className='profile'>
                    <button onClick={logout} className='logout-btn'>Logout</button>
                    <div className='user-info'>
                        <div>
                            <span>Name: </span>
                            <h1>{user.name}</h1>
                        </div>
                        <div>
                            <span>Email: </span>
                            <h2>{user.email}</h2>
                        </div>
                    </div>
                    <div className='orders'>
                        <h1>Orders</h1>
                        {data && data.length > 0 ? (
                            data.map((o: Order['order']) => (
                                <OrderPage data={o} key={o.id} />
                            ))
                        ) : (
                            <p>No orders found</p>
                        )}
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

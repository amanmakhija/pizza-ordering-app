import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/Loading';
import './profile.css';

export default function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            toast.error('You must be logged in to view this page')
            navigate('/register')
        }
    }, [navigate]);

    const userString = localStorage.getItem('user')
    const user = userString && JSON.parse(userString)

    const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <>
            {user ? (
                <div className='profile'>
                    <button onClick={(e) => logout(e)} className='logout-btn'>Logout</button>
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
                </div>
            ) : <Loading />}
        </>
    )
}

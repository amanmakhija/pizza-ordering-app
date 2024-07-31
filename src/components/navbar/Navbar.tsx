import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { User } from '../../utils/type';

const Navbar: React.FC = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const userDetails = localStorage.getItem('user')
        userDetails && setUser(JSON.parse(userDetails))
    }, [])

    const search = (e: React.FormEvent) => {
        e.preventDefault()
        navigate(`/search/${searchValue}`)
    }

    return (
        <nav className='navbar'>
            <h1 onClick={() => navigate('/')} className='navbar-hero'>PizzaStore</h1>
            <div>
                <div className='hidden'>
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type='text' placeholder='Search by Name / Ingredient' className='navbar-search' />
                    <button onClick={search} className='navbar-search-btn'><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <ul className='navbar-options'>
                    <li>{user && <a href='/cart'>Cart</a>}</li>
                    <li>{user ? <a href='/profile'>Hi, {user.name}</a> : <a href='/register'>Register</a>}</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

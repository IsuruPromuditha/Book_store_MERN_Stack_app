import React from 'react'
import { Link } from 'react-router-dom';
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";

import avatarImg from '../assets/avatar.png'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Orders', href: '/order' },
    { name: 'Cart Page', href: '/cart' },
    { name: 'Check Out', href: '/chectout' },
]

const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);

    const {currentUser, logout} = useAuth()

    const habdleLogOut = () => {
        logout()
    }

    return (
        <div>
            <header className='max-w-screen-2xl mx-auto px-4 py-6'>
                <nav className='flex justify-between items-center'>
                    {/* left side of the navbar */}
                    <div className='flex items-center md:gap-16 gap-4'>
                        <Link to="/">
                            <HiBars3CenterLeft className='size-6' />
                        </Link>

                        {/* search input */}
                        <div className='relative sm:w-72 w-40 space-x-2'>
                            <IoSearchOutline className='absolute inline-block left-3 inset-y-2' />
                            <input type='text' placeholder='What are you looking for ?'
                                className='bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none'
                            />
                        </div>
                    </div>


                    {/* right side of the nav bar */}
                    <div className='relative flex items-center md:space-x-3 space-x-2'>
                        <div className=''>
                            {
                                currentUser ? <>
                                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        <img src={avatarImg} alt='' className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-blue-500' : ''}`} />
                                    </button>
                                    {/* show dropdown */}
                                    {
                                        isDropdownOpen && (
                                            <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md to-zinc-400'>
                                                <ul className='py-2'>
                                                    {
                                                        navigation.map((item) => (
                                                            <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                                                                <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100 '>
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))
                                                    }
                                                    <li>
                                                        <button
                                                        onClick={habdleLogOut}
                                                        className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 '>LogOut</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    }
                                </> : <Link to='/login'><HiOutlineUser className='size-6' /></Link>
                            }
                        </div>

                        <button className='hidden sm:block'>
                            <HiOutlineHeart className='size-6' />
                        </button>

                        <Link to='/cart' className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                            <HiOutlineShoppingCart className='size-6' />
                            {
                                cartItems.length > 0 ? <span className='text-sm font-semibold 
                                sm:ml-1'>{cartItems.length}</span> : <span className='text-sm font-semibold sm:ml-1'>0</span>
                            }

                        </Link>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;

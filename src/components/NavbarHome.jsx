

import React, { useEffect, useState } from 'react';
import '../styles/navbarHome.scoped.scss';

import logo from '/randolympics_logo.png';

const NavbarHome = () => {


    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

            {/* {!scrolled && <img src={logo} alt="Logo" className="navbar-logo" />} */}


            <div className="navbar-first-content">
                <img src={logo} alt="Logo" />


                <div className=' flex '>
                    <a className='flex justify-center items-center gap-2' href="#login">Login<img width={"15px"} height={"15px"} src="home/login.svg" /></a>
                    <a href="#support">Support</a>
                </div>

            </div>

            <div className="navbar-content">
                <a href="#home">Home</a>
                <a href="#games">The Games</a>
                <a href="#iwga">The IWGA</a>
                <a href="#sports">Sports</a>
                <a href="#news">News</a>
                <a href="#media">TWG Media</a>
                <a href="#athletes">Athletes & Clean Sport</a>
            </div>
        </nav>
    );

}

export { NavbarHome }
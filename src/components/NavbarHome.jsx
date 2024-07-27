

import React, { useEffect, useState, useRef } from 'react';
import '../styles/navbarHome.scoped.scss';

import logo from '/randolympics_logo.png';
import { SportsDropDownMenu } from './NavbarHome/SportsDropDownMenu';

const NavbarHome = () => {


    const [scrolled, setScrolled] = useState(false);


    const [isDropdownSportsVisible, setDropdownSportsVisible] = useState(true);  // false default


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

                <div>
                    <a id="sports-link" href="#sports" onMouseEnter={() => {setDropdownSportsVisible(true);}}/*  onMouseLeave={() => {setDropdownSportsVisible(false);}}  */ >Sports</a>

                    {isDropdownSportsVisible &&
                            <SportsDropDownMenu scrolled={scrolled} />
                    }

                    

                </div>

                <a href="#beliefs">Our beliefs</a>
                <a href="#economics">Economics</a>
                <a href="#FAQ">FAQ</a>
                <a href="#news">News</a>
                <a href="#join">Join now</a>
               
            </div>
        </nav>
    );

}

export { NavbarHome }
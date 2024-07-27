

import React, { useEffect, useState, useRef } from 'react';
import '../styles/navbarHome.scoped.scss';

import logo from '/randolympics_logo.png';
import { SportsDropDownMenu } from './NavbarHome/SportsDropDownMenu';
import { BeliefsDropDownMenu } from './NavbarHome/BeliefsDropDownMenu';
import { EconomicsDropDownMenu } from './NavbarHome/EconomicsDropDownMenu';

const NavbarHome = () => {


    const [scrolled, setScrolled] = useState(false);


    const [isDropdownSportsVisible, setDropdownSportsVisible] = useState(false);  // false default

    const [isDropdownBeliefsVisible, setDropdownBeliefsVisible] = useState(false);  // false default


    const [isDropdownEconomicsVisible, setDropdownEconomicsVisible] = useState(true);  // false default




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
                    <a id="sports-link" href="#sports" onMouseEnter={() => { setDropdownSportsVisible(true); }}/*  onMouseLeave={() => {setDropdownSportsVisible(false);}}  */ >Sports</a>

                    {isDropdownSportsVisible &&
                        <SportsDropDownMenu scrolled={scrolled} />
                    }



                </div>

                <div>
                    <a href="#beliefs" onMouseEnter={() => { setDropdownBeliefsVisible(true); }}/*  onMouseLeave={() => {setDropdownBeliefsVisible(false);}}  */>Our beliefs</a>
                 
                    {isDropdownBeliefsVisible &&
                            <BeliefsDropDownMenu scrolled={scrolled} />
                    }
                
                </div>


                <div>
                        <a href="#economics" onMouseEnter={() => { setDropdownEconomicsVisible(true); }}/*  onMouseLeave={() => {setDropdownEconomicsVisible(false);}}  */>Economics</a>
             
                        {isDropdownEconomicsVisible &&


                            <EconomicsDropDownMenu scrolled={scrolled} />
                    }
                </div>




                <a href="#FAQ">FAQ</a>
                <a href="#news">News</a>
                <a href="#join">Join now</a>

            </div>
        </nav>
    );

}

export { NavbarHome }
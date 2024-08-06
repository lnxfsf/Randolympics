// NavBar, only for collapsed style



import React, { useEffect, useState, useRef } from 'react';
import '../styles/navbarHome.scoped.scss';

import logo from '/randolympics_logo.png';
import { SportsDropDownMenu } from './NavbarHome/SportsDropDownMenu';
import { BeliefsDropDownMenu } from './NavbarHome/BeliefsDropDownMenu';
import { EconomicsDropDownMenu } from './NavbarHome/EconomicsDropDownMenu';

import { useNavigate } from "react-router-dom";


const NavbarHomeCollapsed = () => {



    const [scrolled, setScrolled] = useState(true);


    const [isDropdownSportsVisible, setDropdownSportsVisible] = useState(false);  // false default

    const [isDropdownBeliefsVisible, setDropdownBeliefsVisible] = useState(false);  // false default


    const [isDropdownEconomicsVisible, setDropdownEconomicsVisible] = useState(false);  // false default



    const navigate = useNavigate();



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
        <nav className={`navbar scrolled`}>

            {/* {!scrolled && <img src={logo} alt="Logo" className="navbar-logo" />} */}


            <div className="navbar-first-content">
                <img src={logo} alt="Logo" />


                <div className=' flex '>
                    <a className='flex justify-center items-center gap-2 cursor-pointer select-none' onClick={() => { navigate("/login"); }}>Login<img width={"15px"} height={"15px"} src="home/login.svg" /></a>
                    <a href="#support">Support</a>
                </div>

            </div>

            <div className="navbar-content ">



                <div className="drop">



                    <a className='flex justify-center items-center' id="sports-link" href="#sports">Sports</a>



                    <div className={`sports-dropdown-menu ${scrolled ? 'scrolled' : ''} `}>
                        <SportsDropDownMenu scrolled={scrolled} />


                    </div>

                </div>




                <div className="dropBeliefs">
                    <a className='flex justify-center items-center' href="#beliefs"  >Our beliefs</a>

                    <div className={`beliefs-dropdown-menu ${scrolled ? 'scrolled' : ''} `}>
                        <BeliefsDropDownMenu scrolled={scrolled} />
                    </div>

                </div>


                <div className="dropEconomics">
                    <a className='flex justify-center items-center' href="#economics" onMouseEnter={() => { setDropdownEconomicsVisible(true); }} onMouseLeave={() => { setDropdownEconomicsVisible(false); }}  >Economics</a>


                    <div className={`economics-dropdown-menu ${scrolled ? 'scrolled' : ''} `}>

                        <EconomicsDropDownMenu scrolled={scrolled} />
                    </div>
                </div>





                <a className='flex justify-center items-center' href="#FAQ" onClick={() => { navigate("/"); }} >FAQ</a>



                <a className='flex justify-center items-center select-none cursor-pointer' onClick={() => { navigate("/news"); }}>News</a>



                <a className='flex justify-center items-center select-none cursor-pointer' onClick={() => { navigate("/register"); }}>Join now</a>

            </div>
        </nav>
    );

}

export { NavbarHomeCollapsed }
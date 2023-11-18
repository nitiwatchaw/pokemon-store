import React from 'react'
import img from '../img/pokemon-icon.png'
import bgHome from '../img/pokebg.png'
import './Home.css'
import ball from '../img/pokeball.png'
import dec2 from '../img/dec-2.png'
import { IoStorefrontSharp } from "react-icons/io5";
import { faBraille } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <div className='home-container'>
            <nav>
                <Link to="/">
                    <img src={img} alt="" width={150} />
                </Link>

                <div className='dot'>
                    <FontAwesomeIcon icon={faBraille} />
                </div>
            </nav>

            <div className="content">
                <div className="wrap">
                    <h1>Gotta Catch 'Poke Store!</h1>
                    <p>This is API Pokemon Store that use for test Web Developement Alpaca media and technology solutions co. ltd</p>

                    <Link to="/store/list" >Go to Store <span><IoStorefrontSharp /></span></Link>

                    <img src={bgHome} alt="" />
                </div>
            </div>
            <img src={ball} alt="" width={60} className='dec-1' />
            <img src={dec2} alt="" width={70} className='dec-2' />
        </div>
    )
}

export default Home
import React from 'react'
import './Card.css'
import { MdAddCircle } from "react-icons/md";
import { toast } from 'react-toastify';
import PokemonType from '../util/PokemonType'



const Card = ({ pokemon, setCart }) => {



    const addToCart = () => {
        const newPoke = { ...pokemon }
        newPoke.idn = Date.now().toString()
        setCart((prevState) => [...prevState, newPoke])

        toast.success('Added Pokemon'
            , {
                position: "top-right",

            });
    };



    return (
        <>
            <div className='Card'>
                <img src={pokemon.sprites.front_default} alt="" />
                <div className="content-card">
                    <div className='name'>  {pokemon.name}</div>
                    <div className="wrap-grid">
                        <div className='type'> Type:</div>
                        <div className='type-des'>
                            {pokemon.types.map((type, i) => {
                                return (
                                    <div className="type-box" style={{ backgroundColor: PokemonType[type.type.name] }} key={i}>
                                        {type.type.name}
                                    </div>
                                )
                            })}
                        </div>

                        <div className="abil">Ability:</div>
                        <div className="abil-des">
                            {pokemon.abilities.map((abil, i) => {
                                return (
                                    <div className="abil-box" key={i}>
                                        {abil.ability.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="wrap-button">
                        <div className="wrap-cost">
                            Cost <span>  ${pokemon.id}</span>
                        </div>

                        <button onClick={() => addToCart(pokemon.id)}>Add <span><MdAddCircle /></span></button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default Card
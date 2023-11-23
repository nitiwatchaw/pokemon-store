import React, { useEffect } from 'react'
import Card from '../Card/Card'
import GridLoader from "react-spinners/GridLoader";
import './Store.css'
const Store = ({ loading, poke, prev, next, prevUrl, nextUrl, setCart, cart }) => {

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])
    return (
        <div className='store-container'>
            <div className="btn-wrap">
                <button disabled={!prevUrl} onClick={prev}>Prev</button>
                <button disabled={!nextUrl} onClick={next}>Next</button>
            </div>
            {loading ?
                <GridLoader
                    color="rgb(255 207 77"
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className='loader'
                /> :


                <>
                    <div className="card-container">
                        {poke.map((pokemon) => {
                            return <Card key={pokemon.id} pokemon={pokemon} setCart={setCart} />
                        })}
                    </div>
                    <div className="btn-wrap">
                        <button disabled={!prevUrl} onClick={prev}>Prev</button>
                        <button disabled={!nextUrl} onClick={next}>Next</button>
                    </div>
                </>


            }

        </div>
    )
}

export default Store
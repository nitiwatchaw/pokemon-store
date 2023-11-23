import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import GridLoader from "react-spinners/GridLoader";
import './Store.css'
import { MdOutlineLocationSearching } from "react-icons/md";
const Store = ({ loading, poke, prev, next, prevUrl, nextUrl, setCart, cart }) => {
    const [search, setSearch] = useState("")


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])
    return (
        <div className='store-container'>
            <div className="header">
                <div className="btn-wrap">
                    <button disabled={!prevUrl} onClick={prev}>Prev</button>
                    <button disabled={!nextUrl} onClick={next}>Next</button>
                </div>
                <div className="search">
                    <input type="search" placeholder='Poke Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <MdOutlineLocationSearching onClick={() => { setSearch("") }} style={{ cursor: "pointer" }} />
                </div>
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
                        {poke.filter(val => val.name.toLowerCase().includes(search.toLocaleLowerCase())).map((pokemon) => {
                            return <Card key={pokemon.id} pokemon={pokemon} setCart={setCart} />

                        })}
                        {poke.filter((val) => val.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
                            <p>Can't find any Pokémon.</p>
                        )}
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
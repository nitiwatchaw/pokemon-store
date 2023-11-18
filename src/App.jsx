import { useState, useEffect } from 'react'
import Home from './Home/Home'
import Store from './Store/Store'
import Header from './header/Header'
import Cart from './Cart/Cart'
import { Route, Routes } from 'react-router-dom'
import { getAllPokemon, getPokemon } from './services/pokemon'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'



function App() {
  const [poke, setPoke] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [nextUrl, setNextUrl] = useState("")
  const [prevUrl, setPrevUrl] = useState("")
  const initialUrl = "https://pokeapi.co/api/v2/pokemon"


  useEffect(() => {

    const loadData = async () => {
      try {
        setLoading(true)
        let res = await getAllPokemon(initialUrl)
        setNextUrl(res.next)
        setPrevUrl(res.previous)
        await loadingPokemon(res.results)

      }
      catch (err) {
        setError("Something went wrong ", err)
      }
      finally {
        setLoading(false);
      }
    }
    loadData();

  }, [])


  const loadingPokemon = async (data) => {
    let _Poke = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url)
        return pokemonRecord
      }));

    setPoke(_Poke)

  }


  const next = async () => {
    if (!nextUrl) {
      return setLoading(false)
    }
    setLoading(true)
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
    setLoading(false)
  }

  const prev = async () => {
    if (!prevUrl) {
      return setLoading(false)
    }
    setLoading(true)
    let data = await getAllPokemon(prevUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
    setLoading(false)
  }


  const [cart, setCart] = useState([])

  const [cartTotal, setCartTotal] = useState(0)

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/store' element={<Header cart={cart} />} >
          <Route path='/store/list' element={<Store loading={loading} poke={poke} next={next} prev={prev} prevUrl={prevUrl} nextUrl={nextUrl} setCart={setCart} />} />
          <Route path='/store/cart' element={<Cart setCart={setCart} cart={cart} cartTotal={cartTotal} setCartTotal={setCartTotal} />} />
        </Route >
      </Routes >
    </>
  )
}

export default App

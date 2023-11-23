import { useState, useEffect } from 'react'
import Home from './Home/Home'
import Store from './Store/Store'
import Header from './header/Header'
import Cart from './Cart/Cart'
import { Route, Routes } from 'react-router-dom'
import { getAllPokemon, getPokemon } from './services/pokemon'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'



function App() {
  const [poke, setPoke] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [nextUrl, setNextUrl] = useState("")
  const [prevUrl, setPrevUrl] = useState("")
  const initialUrl = "https://pokeapi.co/api/v2/pokemon"


  // fetch data
  useEffect(() => {

    const loadData = async () => {
      try {
        setLoading(true)
        let res = await getAllPokemon(initialUrl)
        setNextUrl(res.next)
        setPrevUrl(res.previous)
        await loadingPokemon(res.results)
        console.log("intial", res)
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

  // fecth data from fetched 
  const loadingPokemon = async (data) => {
    let _Poke = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await getPokemon(pokemon.url)
        return pokemonRecord
      }));
    console.log("second", _Poke)
    setPoke(_Poke)

  }

  //  next data
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
    console.log("next", data.results)

  }

  // back data
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


  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");

      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {

      return [];
    }
  });


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
          <Route
            path='/store/list'
            element={<Store loading={loading} poke={poke} next={next} prev={prev} prevUrl={prevUrl} nextUrl={nextUrl} setCart={setCart} cart={cart} />} />
          <Route
            path='/store/cart'
            element={<Cart setCart={setCart} cart={cart} />} />
        </Route >
      </Routes >
    </>
  )
}

export default App

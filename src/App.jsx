import { useState, useEffect } from 'react'
import './App.css'

const Api_fact = 'https://catfact.ninja/fact'
const Api_key = 'TjiDd893IR0OnDomrhrLAZaL6C3qdGxl'

function App() {
  const [fact, setFact] = useState("")
  const [gif, setGif] = useState()

  useEffect(() => {
    fetch(Api_fact)
    .then(res => {
      if (!res.ok) {throw new Error('Error fetching cats')}
      return res.json()})
    .then((data) => {
      setFact(data.fact);
      console.log(data.fact)
    })

  },[])

  useEffect(() => {
    if (!fact) return 

    const threeFirstWord = fact.split(" ").slice(0, 3).join(" ")

    fetch(`https://api.giphy.com/v1/gifs/search?q=${threeFirstWord}&api_key=${Api_key}`)
    .then(res => {
      if (!res.ok) {throw new Error('Error fetching Gifs')}
      return res.json()
    })
    .then(data => {
      setGif(data.data[0].images.original.url)
    })
  }, [fact])

  return (
    <main>
      <h2>Prueba Tecnica</h2>
      <section>
      {gif && <img src={gif} alt="" />}
      {fact && <p>{fact}</p>}
      </section>
    </main>
  )
}
export default App

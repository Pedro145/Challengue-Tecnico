import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home () {

    const [input, setInput] = useState("")
    const [peliculas, setPeliculas] = useState([])
    const [generos, setGeneros] = useState([])



    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=314dd2fd158d1a156815bfda6f2037c3")
        .then(res => setGeneros(res.data.genres.map(e => e)))
        .catch(error => console.log(error))
    })
    const handleOnchage = (e) => {
        if(e.target.value.length > 3){
         axios.get("https://api.themoviedb.org/3/search/movie?api_key=314dd2fd158d1a156815bfda6f2037c3&query=" + e.target.value)
         .then(res => setPeliculas(res.data.results))
         .catch(error => console.log(error))
        }
        e.preventDefault()
        setInput(e.target.value)
    }
    return (
        <div>
          <nav class="navbar navbar-light bg-light">
          <form class="form-inline">
          <input class="form-control mr-sm-2"
           type="search"
            placeholder="Search"
            aria-label="Search"
            value={input}
            onChange={handleOnchage}/>
            <div>
            {peliculas?.map(peli => {
                    return(
                    <div key={peli.id}>
                    <p>{peli.original_title}</p>
                    <p>{peli.release_date}</p>
                    <img src={peli.backdrop_path} alt="" />
                    </div>
                    )})}
            </div>
         </form>
          </nav>
        </div>
    )
}
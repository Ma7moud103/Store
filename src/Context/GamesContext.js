import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export let GamesContext = createContext()

export default function GamesContextProvider({ children }) {


    const [Games, setGames] = useState([])

    async function gitGames() {
        return await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`, {
            headers: {
                "X-RapidAPI-Key": "1c2656d96cmshbf7665d69cd1504p1c5330jsn34bdd63044b4",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            }
        }).then((data) => {

            if (data.status === 200) {
                setGames(data.data)
            }
        }

        ).catch((err) => err)
    }


    function gitCategories(catego) {
        return axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${catego}`, {
            headers: {
                "X-RapidAPI-Key": "1c2656d96cmshbf7665d69cd1504p1c5330jsn34bdd63044b4",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            }
        }).then(data => data).catch(err => err)
    }


    useEffect(() => {
        gitGames()
    }, [])
    return (
        <GamesContext.Provider value={{ Games, gitCategories, setGames }}>
            {children}

        </GamesContext.Provider>
    )
}


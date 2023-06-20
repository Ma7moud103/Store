import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import axios from 'axios';
import { GamesContext } from '../../Context/GamesContext';
import $ from "jquery"
import { Link, useNavigate } from 'react-router-dom';

export default function Categories() {

    let { Games, gitCategories, setGames } = useContext(GamesContext)

    async function getcatego(ca) {
        let res = await gitCategories(ca)
        if (res.status === 200) {
            setGames(res.data)
        }
    }

    let navigate = useNavigate()




    useEffect(() => {
        // handling sidebar
        $("#icon").click(function () {
            $(".sidebarMenu").toggleClass("shown")
        })

        $(".sidebarMenu #sidbar ul li").click(function (e) {
            let value = e.target.innerHTML.toLocaleLowerCase()
            getcatego(value)
        })

        // handling active class
        $(".categories .sidebarMenu .links li").click((e) => {
            let ele = e.target
            if (!ele.hasAttribute("active")) {
                let lis = $(".categories .sidebarMenu .links li")
                for (let i = 0; i < lis.length; i++) {
                    lis[i].classList.remove("active")
                }
                ele.classList.add("active")
            }
        })
    }, [])
    return (
        <div className='d-flex justify-content-between categories'>
            <div className="d-flex hidden sidebarMenu position-fixed">
                <div id='sidbar' className="sidbar  bg-main-light">
                    <ul className='links'>
                        <li className='active'>All Games</li>
                        <li>MMORPG</li>
                        <li>SHOOTER</li>
                        <li>SAILING</li>
                        <li>PERMADEATH</li>
                        <li>SUPERHERO</li>
                        <li>PIXEL</li>
                    </ul>
                </div>
                <div className='menu d-flex align-items-center justify-content-center bg-main-light'>
                    <i id='icon' className="fa-solid fa-bars cursor-pointer"></i>
                </div>
            </div>
            <div className="container p-5">
                <div className="row">
                    {Games.map((game) => {
                        return <Link to={"/gamedetails"} key={game.id} className="game col-md-6 col-sm-12 col-lg-4 my-3  p-3">
                            <img className='w-100' src={game.thumbnail} alt="" />
                            <h5 className='text-center py-2 fw-bold'>{game.title.split(" ").splice(0, 3).join(" ")}</h5>
                            <div className='d-flex justify-content-between align-items-center py-2'>
                                <span className='platform'>{game.platform}</span>
                                <span className=' bg-main text-white genre '>{game.genre}</span>

                            </div>
                        </Link>
                    })}
                </div>
            </div>
        </div>
    )
}

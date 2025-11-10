import React, { useContext, useEffect, useRef, useState } from 'react'
import "./style.css"
import { GamesContext } from '../../Context/GamesContext';
import $ from "jquery"
import { Link } from 'react-router-dom';

export default function Categories() {

    let { Games, gitCategories, setGames } = useContext(GamesContext)
    const [searchinput, setsearchinput] = useState("")
    let input = useRef()
    function handlingInput() {
        $("form").on("submit", (e) => {
            e.preventDefault()
        })
        input.current.focus()
    }
    // "".includes
    useEffect(() => {
        async function getcatego(ca) {
            let res = await gitCategories(ca)
            if (res.status === 200) {
                setGames(res.data)
            }
        }
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
        handlingInput()
    }, [gitCategories])

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
                <h4 className='fw-bold py-2' >Search For Game : </h4>
                <form>
                    <input onChange={(e) => {
                        setsearchinput(e.target.value)
                    }} ref={input} type="text" className='form-control' />
                </form>
                {/* <div className="row">
                    {Games.filter((game) => {
                        if (searchinput == "") {
                            return game
                        } else if (game.title.toLowerCase().includes(searchinput.toLowerCase())) {
                            return game
                        }
                    }).map((data) => {
                        return (
                            <Link to={"/gamedetails"} key={data.id} className="game col-md-6 col-sm-12 col-lg-4 my-3  p-3">
                                <img className='w-100' src={data.thumbnail} alt="" />
                                <h5 className='text-center py-2 fw-bold'>{data.title.split(" ").splice(0, 3).join(" ")}</h5>
                                <div className='d-flex justify-content-between align-items-center py-2'>
                                    <span className='platform'>{data.platform}</span>
                                    <span className=' bg-main text-white genre '>{data.genre}</span>

                                </div>
                            </Link>)
                    })
                    }
                </div> */}
            </div>
        </div>
    )
}

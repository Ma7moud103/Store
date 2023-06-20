import React, { useContext } from 'react';
import "./GameDetails.css"
import { GamesContext } from '../../Context/GamesContext';
export default function GameDetails() {


    let { Games } = useContext(GamesContext)

    console.log(Games);
    return (
        <>
            <div className="container box">
                <div className="row">
                    <div className="col-md-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum deserunt vero et dolore sed quisquam. Nemo sit doloremque, saepe porro nihil officia accusamus earum maiores incidunt amet! Quo, deleniti corporis!
                    </div>
                    <div className="col-md-5">

                    </div>
                    <div className="col-md-5">

                    </div>
                </div>
            </div>
        </>
    )
}

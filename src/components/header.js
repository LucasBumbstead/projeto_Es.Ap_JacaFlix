import React, { useState } from 'react';
import'./header.css';

import Logo from "./img/logo.png"
import User from "./img/user.png"

export default({black}) => {
    const [searchKey, setSearchKey] = useState("")

    const searchMovies = (e) =>{
        e.preventDefault()
        

    }
    return(
        <header className={black ? 'black' : '' }>
            <div className="header--logo">
                <a href="/">
                    <img src={Logo} alt="Logo jacaFlix" title="Logo jacaFlix"/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={User} alt="Usuario jacaFlix" title="User"/>

                </a>
            </div>
            <form className="Search--button" onSubmit={searchMovies}>
                <input type="text" onChange={(e) => setSearchKey(e.target.value)}/>
                <button type={"submit"}>Search!</button>            
                </form>
                
            
                
        </header>
        

    );
}
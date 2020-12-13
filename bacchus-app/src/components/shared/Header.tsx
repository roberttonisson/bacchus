import React from "react";
import { Link } from "react-router-dom";


const Header = () => {


    function home() {
        return (
            <li className="nav-item" style={{ paddingRight: "10px" }}>
                <Link to="/">Home</Link>
            </li>
        );
    }


    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex flex-sm-row-reverse">

                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item" style={{ paddingRight: "10px" }}>
                                <Link to="/pastAuctions">Past Auctions</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            {home()}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
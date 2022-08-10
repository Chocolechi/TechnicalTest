/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

class Header extends React.Component {
    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <h4> <a className="nav-link" href="/">MyBooks<span class="sr-only"></span></a></h4>
                        </li>

                    </ul>
                </div>
            </nav>

        );
    }
}
export default Header
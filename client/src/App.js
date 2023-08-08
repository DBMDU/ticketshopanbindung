import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Ticketfetch from "./ticketentry.js";
import TicketfetchKindergarten from "./ticketentry2.js";
import TicketfetchTheaterKinder from "./ticketentry3.js";
import TicketfetchErwachsene from "./ticketentry4.js";
import TicketfetchEventGastspiel from "./ticketentry5.js";

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Spielplan</Link>
                        </li>
                        <li>
                            <Link to="/kindergarten-schulen">
                                Kindergarten- & Schulvorstellung
                            </Link>
                        </li>
                        <li>
                            <Link to="/theater-kinder">Theater für Kinder</Link>
                        </li>
                        <li>
                            <Link to="/theater-Erwachsene">
                                Theater für Erwachsene
                            </Link>
                        </li>
                        <li>
                            <Link to="/event-gastspiel">Event & Gastspiel</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={<Ticketfetch />} />
                    <Route
                        path="/kindergarten-schulen"
                        element={<TicketfetchKindergarten />}
                    />
                    <Route
                        path="/theater-kinder"
                        element={<TicketfetchTheaterKinder />}
                    />
                    <Route
                        path="/theater-erwachsene"
                        element={<TicketfetchErwachsene />}
                    />
                    <Route
                        path="/event-gastspiel"
                        element={<TicketfetchEventGastspiel />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

//Router

import React from 'react';
import Header from "./Elements/Header";
import Navbar from "./Elements/Navbar";
import Tickets from "./Elements/Tickets";
import Dashboard from "./Dashboard";
import Footer from "./Elements/Footer";

const GestionTickets = () => {
    return (
        <>
            <div id="page-container" className="page-header-dark main-content-boxed">
                <Header />
                <Navbar />
                {/* Tickets list */}
                <Tickets />
                {/* END - Tickets list */}
                <Footer />
            </div>
        </>
    )
}

export default GestionTickets;
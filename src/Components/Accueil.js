import React from 'react';
import Header from "./Elements/Header";
import Navbar from "./Elements/Navbar";
import Footer from "./Elements/Footer";
import Dashboard from "./Dashboard";
const Accueil = () => {
    return (
        <>
            {/* Container principal */}
            <div id="page-container" className="page-header-dark main-content-boxed">
                <Header />
                <Navbar />
                <Dashboard />
                <Footer />
            </div>
            {/* Fin - container */}
        </>
    )
}

export default Accueil;
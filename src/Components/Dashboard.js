import React, {useEffect, useState} from 'react';
import GestionUsers from "./GestionUsers";
import GestionSujets from "./GestionSujets";
import GestionTags from "./GestionTags";
const Accueil = () => {

    let mounted = false

    const [loading, setLoading] = useState(true)
    const [listUser, setListUser] = useState([])
    const [listTicket, setListTicket] = useState([])
    const [listsubject, setListSubject] = useState([])
    const [listTag, setListTag] = useState([])


    {/**
     * @Description Récupérer la liste des sujets.
     * */}
    const getSubject = () => {
        fetch('http://localhost:8080/subject/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setListSubject(response)
                setLoading(false)
            })
            .catch(err => console.log('subject', err))
    }
    {/**
     * @Description
     *      Récupérer la liste des utilisateurs.
     * */}
    const getUsers = () => {
        fetch('http://localhost:8080/user/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setListUser(response)
                setLoading(false)
            })
            .catch(err => console.log('user', err))
    }

    {/**
     * @Description Récupérer la liste des tags.
     * */}
    const getTags = () => {
        fetch('http://localhost:8080/tag/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setListTag(response)
                setLoading(false)
            })
            .catch(err => console.log('subject', err))
    }

    {/**
     * @Description Récupérer la liste des tickets.
     * */}
    const getTicket = () => {
        fetch('http://localhost:8080/ticket/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setListTicket(response)
                setLoading(false)
            })
            .catch(err => console.log('ticket', err))
    }

    useEffect(() => {
        if (!mounted) {
            getUsers()
            getSubject()
            getTags()
            getTicket()
        }
        return () => mounted = true
    }, [])

    return (
        <>
            {/* Container principal */}
            <main id="main-container">
                <div className="content">
                    <div className="row">
                        <div className="col-6 col-md-3 col-lg-6 col-xl-3">
                            <a className="block block-rounded block-link-pop" href="javascript:void(0)">
                                <div className="block-content block-content-full">
                                    <div className="font-size-sm font-w600 text-uppercase text-muted">Utilisateurs</div>
                                    <div className="font-size-h2 font-w400 text-dark">{listUser.length}</div>
                                </div>
                            </a>
                        </div>

                        <div className="col-6 col-md-3 col-lg-6 col-xl-3">
                            <a className="block block-rounded block-link-pop" href="javascript:void(0)">
                                <div className="block-content block-content-full">
                                    <div className="font-size-sm font-w600 text-uppercase text-muted">Tickets</div>
                                    <div className="font-size-h2 font-w400 text-dark">{listTicket.length}</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-6 col-md-3 col-lg-6 col-xl-3">
                            <a className="block block-rounded block-link-pop" href="javascript:void(0)">
                                <div className="block-content block-content-full">
                                    <div className="font-size-sm font-w600 text-uppercase text-muted">Sujets</div>
                                    <div className="font-size-h2 font-w400 text-dark">{listsubject.length}</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-6 col-md-3 col-lg-6 col-xl-3">
                            <a className="block block-rounded block-link-pop" href="javascript:void(0)">
                                <div className="block-content block-content-full">
                                    <div className="font-size-sm font-w600 text-uppercase text-muted">Tags</div>
                                    <div className="font-size-h2 font-w400 text-dark">{listTag.length}</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* TOPIC - Block Tabs Content Animation */}
                    <div class="row">
                        {/* TOPIC - Block Tabs Animated Fade */}
                        <GestionSujets />
                        <GestionTags />
                        {/* END TOPIC - Block Tabs Animated Fade */}
                    </div>
                    {/* END Block Tabs Content Animation */}

                    <div className="row row-deck">
                        <GestionUsers />
                    </div>



                </div>
            </main>
            {/* Fin - container */}
        </>
    )
}

export default Accueil;
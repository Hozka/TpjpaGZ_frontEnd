import React, {useEffect, useState} from 'react';

const Tickets = () => {

    const [user, setUsers] = useState([]);
    const [tags, setTags] = useState([]);
    const [subject, setSubjects] = useState([]);

    const initial = {
        //subject : '',
        //user:{},
        description : ''
    }

    let mounted = false

    const [data, setdata] = useState({... initial})
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [erreur, setErreur] = useState(false)

    {/**
     * @Description Récupérer la liste des tickets.
     * */}
    const getTicket = () => {
        fetch('http://localhost:8080/ticket/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setList(response)
                setLoading(false)
            })
            .catch(err => console.log('ticket', err))
    }

    {/**
     * @Description Récupérer la liste des utilisateurs.
     * */}
    const getUsers = () => {
        fetch('http://localhost:8080/user/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setUsers(response)
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
                setTags(response)
            })
            .catch(err => console.log('tag', err))
    }

    {/**
     * @Description Récupérer la liste des sujets.
     * */}
    const getSubject = () => {
        fetch('http://localhost:8080/subject/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setSubjects(response)
                setLoading(false)
            })
            .catch(err => console.log('subject', err))
    }

    {/**
     * @Description Ajouter un nouveau ticket.
     * */}
    const addTicket = e =>{
        e.preventDefault()
        fetch('http://localhost:8080/ticket/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                getTicket();
                setdata({...initial});
            })
            .catch(err => console.log('add', err));
    }

    {/**
     * @Description   Supprimer un ticket de la liste.
     * */}
    const deleteTicket = ticket => {
        fetch('http://localhost:8080/ticket/'+ticket.ticketId, {
            method: 'DELETE'
        })
            .then(() => {
                getTicket()
                setErreur(false)
            })
            .catch(err => console.log('del', err))
    }

    useEffect(() => {
        if (!mounted) {
            getTicket();
            getUsers();
            getTags();
            getSubject();
        }
        return () => mounted = true
    }, []);



    return (
        <>
            {/* Tickets list */}

            <main id="main-container">
                <div className="content">
                    <div className={""}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="block block-rounded">
                                    <div className="block-header">
                                        <h3 className="block-title">
                                            <i className={"fa fa-plus-square mr-3"}></i>
                                            Ajouter Ticket
                                        </h3>
                                        <div className="block-options">
                                            <button type="button" className="btn btn-sm btn-alt-primary"
                                                    data-toggle="block-option" data-action="content_toggle">
                                            </button>
                                        </div>
                                    </div>
                                    <div className="block-content">
                                        {/* Add users form */}
                                        <div>
                                            <form noValidate action="#" onSubmit={e => addTicket(e)}>
                                                <div className="row push ml-2 mr-2">
                                                    <div className="col-lg-3 col-xl-3">
                                                        <div className="form-group">
                                                            <label htmlFor="example-select-input">Sujet</label>
                                                            <select className="custom-select" required
                                                                    id="example-select-input"
                                                                    value={data.subject}
                                                                    onChange={e => setdata({...data,subject: e.target.value})}>
                                                                    {
                                                                        subject.map(subject => (
                                                                            <option key={subject.subjectId} value={subject.subjectId}>
                                                                                {subject.text}
                                                                            </option>
                                                                        ))
                                                                    }
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-xl-3">
                                                        <div className="form-group">
                                                            <label htmlFor="example-select-input2">Tag</label>
                                                            <select className="custom-select" required
                                                                    id="example-select-input2"
                                                                    >
                                                                {
                                                                    tags.map(tags => (
                                                                        <option key={tags.id} value={tags.id}>
                                                                            {tags.value}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-xl-3">
                                                        <div className="form-group">
                                                            <label htmlFor="example-select-input3">Responsable</label>
                                                            <select className="custom-select"
                                                                    id="example-select-input3"
                                                                    value={data.user}
                                                                    onChange={e => setdata({...data,user: e.target.value})}>
                                                                {
                                                                    user.map(user => (
                                                                        <option key={user.id} value={user.id}>
                                                                            {user.lastName +' '+user.firstName}
                                                                        </option>
                                                                    ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-xl-3">
                                                        <div className="form-group">
                                                            <label htmlFor="example-select-input4">Etat</label>
                                                            <select className="custom-select" required
                                                                    id="example-select-input4"
                                                                    value={data.state}
                                                                    onChange={e => setdata({...data,state: e.target.value})}>
                                                                <option value={"A faire"}>A faire</option>
                                                                <option value={"Fait"}>Fait</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-xl-12">
                                                        <div className="form-group">
                                                            <label htmlFor="description">Description</label>
                                                            <textarea name="description" value={""} className="form-control"
                                                                      placeholder="Description du ticket"
                                                                      rows={1}
                                                                      required
                                                                      value={data.description}
                                                                      onChange={e => setdata({...data,description: e.target.value})}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-0 text-center mb-4">
                                                    <button type="reset" className="btn btn-sm btn-danger mr-3">
                                                        <i className="fa fa-fw fa-trash mr-1"></i> Annuler
                                                    </button>
                                                    <button type="submit" className="btn btn-sm btn-success mr-1">
                                                        <i className="fa fa-fw fa-check mr-1"></i> Valider
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Tickets list */}
                    <div className="">

                        <div className="block block-rounded">
                            <ul className="nav nav-tabs nav-tabs-block" data-toggle="tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" href="Elements#btabs-static-tickets">Liste tickets</a>
                                </li>
                                <li className="nav-item ml-auto">
                                    <a className="nav-link" href="javascipt:void(0)" data-toggle="block-option"
                                       data-action="state_toggle" data-action-mode="demo">
                                        <i className="si si-refresh"></i>
                                    </a>
                                </li>
                            </ul>

                            <div className="block-content tab-content">
                                <div className="tab-pane active" id="btabs-static-tickets" role="tabpanel">
                                    <div className="block-content block-content-full">
                                        <table className="table table-striped table-hover table-borderless table-vcenter font-size-sm mb-0">
                                            <thead>
                                                <tr className="text-uppercase">
                                                    <th className="font-w700">ID</th>
                                                    <th className="d-none d-sm-table-cell font-w700">Sujet</th>
                                                    <th className="d-none d-sm-table-cell font-w700">Description</th>
                                                    <th className="d-none d-sm-table-cell font-w700">Tag</th>
                                                    <th className="font-w700">Statut</th>
                                                    <th className="d-none d-sm-table-cell font-w700 text-right">Responsable</th>
                                                    <th className="font-w700 text-center">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    list.map((item, cle) => (
                                                        <tr key={cle}>
                                                            <td><span className="font-w600">#{++cle}</span></td>
                                                            <td className="font-w600">{}</td>
                                                            <td className="font-w600">{item.description}</td>
                                                            <td className="font-w600">{item.tag}</td>
                                                            <td className="font-w600">{item.state}</td>
                                                            <td className="font-w600">{item.user}</td>
                                                            <td className="text-center">
                                                                <a href="#" data-toggle="tooltip" data-placement="left"
                                                                   title="Edit">
                                                                    <i className="fa fa-fw fa-pencil-alt"></i>
                                                                </a>

                                                                <a href="#" data-toggle="tooltip" data-placement="left"
                                                                   title="Edit" onClick={() => deleteTicket(item)}>
                                                                    <i className="fa fa-fw fa-trash-alt text-danger ml-2"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END - Tickets list */}
                </div>
            </main>

        </>
    )
}

export default Tickets;
import React, { useEffect, useState }  from 'react';

const GestionUsers = () => {

    const [users, setUsers] = useState([]);

    const initial = {
        firstName: '',
        lastName: '',
        type: ''
    }

    let mounted = false

    const [data, setdata] = useState({... initial})
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [erreur, setErreur] = useState(false)

    {/**
     * @Description
     *      Récupérer la liste des utilisateurs.
     * */}
    const getUsers = () => {
        fetch('http://localhost:8080/user/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setList(response)
                setLoading(false)
            })
            .catch(err => console.log('user', err))
    }

    {/**
     * @Description
     *      Ajouter un nouvel utilisateur.
     * */}
    const addUsers = e => {
        e.preventDefault()
        fetch('http://localhost:8080/user/add',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                getUsers();
                setdata({...initial});
            }).catch(err => console.log('add', err));
    }

    const deleteUser = user => {
        fetch('http://localhost:8080/user/'+user.idUser, {
            method: 'DELETE'
        })
            .then(() => {
                getUsers()
                setErreur(false)
            })
            .catch(err => console.log('add', err))
    }

    const updateUser = user => {
        fetch('http://localhost:8080/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.idUser,
                name: data.name,
                pseudo : data.pseudo,
                email: data.email
            })
        })
            .then(() => {
                getUsers()
                setdata({...initial})
            })
            .catch(err => console.log('update', err))
    }

    useEffect(() => {
        if (!mounted) getUsers();
        return () => mounted = true
    }, []);

    return (
        <>
            {/* Users form */}
            <div className="col-md-12">
                <div className="block block-mode-hidden">
                    <div className="block-header">
                        <h3 className="block-title">
                            <i className={"fa fa-plus-circle mr-3"}></i>
                            Ajouter un utilisateur
                            <small> - formulaire</small>
                        </h3>
                        <div className="block-options">
                            <button type="button" className="btn-block-option" data-toggle="block-option"
                                    data-action="content_toggle"></button>
                        </div>
                    </div>
                    <div className="block-content">
                        <form noValidate action="#" onSubmit={e => addUsers(e)}>
                            <div className="row push ml-2 mr-2">
                                <div className="col-lg-4 col-xl-4">
                                    <div className="form-group">
                                        <label htmlFor="example-text-input">Nom</label>
                                        <input type="text" className="form-control" id="example-text-input"
                                               name="example-text-input" placeholder="Nom" value={data.lastName}
                                               onChange={e => setdata({...data,lastName: e.target.value})} />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-4">
                                    <div className="form-group">
                                        <label htmlFor="example-email-input">Prénom</label>
                                        <input type="text" className="form-control" id="example-email-input"
                                               name="example-email-input" placeholder="Prénom" value={data.firstName}
                                               onChange={e => setdata({...data,firstName: e.target.value})} />
                                    </div>
                                </div>
                                <div className="col-lg-4 col-xl-4">
                                    <div className="form-group">
                                        <label htmlFor="example-select">Type</label>
                                        <select className="form-control" id="example-select" name="example-select"
                                                value={data.type}
                                                onChange={e => setdata({...data,type: e.target.value})}>
                                            <option disabled>Choisir le type</option>
                                            <option value={"0"}>Normal</option>
                                            <option value={"1"}>Support</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4 text-center">
                                <button type="reset" className="btn btn-sm btn-danger mr-1 mb-3">
                                    <i className="fa fa-fw fa-trash mr-1"></i> Annuler
                                </button>
                                <button type="submit" className="btn btn-sm btn-success mr-1 mb-3">
                                    <i className="fa fa-fw fa-check mr-1"></i> Ajouter
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            {/* END - Users form*/}

            {/* Users list */}
            <div className="col-lg-12">
                <div className="block block-rounded">
                    <ul className="nav nav-tabs nav-tabs-block" data-toggle="tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" href="Elements#btabs-static-home">Liste utilisateurs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="Elements#btabs-static-profile">Ajouter utilisateur</a>
                        </li>
                        <li className="nav-item ml-auto">
                            <span className="nav-link" href="Elements#btabs-static-settings">
                                <i className="si si-user"></i>
                            </span>
                        </li>
                    </ul>

                    <div className="block-content tab-content">
                        <div className="tab-pane active" id="btabs-static-home" role="tabpanel">
                            <div className="block-content block-content-full">
                                <table
                                    className="table table-striped table-hover table-borderless table-vcenter font-size-sm mb-0">
                                    <thead>
                                    <tr className="text-uppercase">
                                        <th className="font-w700">ID</th>
                                        <th className="d-none d-sm-table-cell font-w700 text-center">Photo</th>
                                        <th className="font-w700">Nom</th>
                                        <th className="font-w700">Prenom</th>
                                        <th className="d-none d-sm-table-cell font-w700 text-center">Fonction</th>
                                        <th className="font-w700 text-center">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            list.map((item, cle) => (
                                                <tr key={cle}>
                                                    <td><span className="font-w600">#{++cle}</span></td>
                                                    <td className="d-none d-sm-table-cell text-center">
                                                        <img className="img-avatar img-avatar32"
                                                             src="assets/media/avatars/avatar9.jpg" alt=""/>
                                                    </td>
                                                    <td className="font-w600">{item.lastName}</td>
                                                    <td className="font-w600">{item.firstName}</td>
                                                    <td className="font-w600 text-center text-primary">{item.type}</td>
                                                    <td className="text-center">
                                                        <a href="#" data-toggle="tooltip" data-placement="left"
                                                           title="Edit">
                                                            <i className="fa fa-fw fa-pencil-alt"></i>
                                                        </a>
                                                        <i className="fa fa-fw fa-trash-alt text-danger ml-2" onClick={() => deleteUser(item)}></i>
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
            {/* END - Users list */}
        </>
    )
}

export default GestionUsers;
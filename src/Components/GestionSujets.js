import React, { useEffect, useState } from 'react';
const GestionSujets = () => {

    const [subjects, setSubjects] = useState([]);

    const initial = {
        text: ''
    }

    let mounted = false

    const [data, setdata] = useState({... initial})
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [erreur, setErreur] = useState(false)

    {/**
     * @Description Récupérer la liste des sujets.
     * */}
    const getSubject = () => {
        fetch('http://localhost:8080/subject/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setList(response)
                setLoading(false)
            })
            .catch(err => console.log('subject', err))
    }

    const addSubject = e => {
        e.preventDefault()
        fetch('http://localhost:8080/subject/add',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                getSubject();
                setdata({...initial});
            }).catch(err => console.log('addSubject', err));
    }

    const deleteSubject = subjects => {
        fetch('http://localhost:8080/subject/'+subjects.subjectId, {
            method: 'DELETE'
        })
            .then(() => {
                getSubject()
                setErreur(false)
            })
            .catch(err => console.log('deleteSubject', err))
    }

    const updateSubject = user => {
        fetch('http://localhost:8080/subject/all', {
            method: 'PATCH',
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
                getSubject()
                setdata({...initial})
            })
            .catch(err => console.log('update', err))
    }

    useEffect(() => {
        if (!mounted) getSubject();
        return () => mounted = true
    }, []);

    return (
        <>
            {/* TOPIC - Block Tabs Content Animation */}
            <div className="col-lg-6">
                {/* TOPIC - Block Tabs Animated Fade */}
                <div className="block block-rounded">
                    <ul className="nav nav-tabs nav-tabs-block" data-toggle="tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" href="#btabs-animated-fade-home">
                                <i className={""}></i>
                                Liste des <span className={"text-primary"}>sujets</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#btabs-animated-fade-profile">
                                <i className={"si si-plus mr-3"}></i>
                                Ajouter un <span className={"text-primary"}>sujet</span>
                            </a>
                        </li>
                    </ul>
                    <div className="block-content tab-content overflow-hidden">
                        <div className="tab-pane fade show active" id="btabs-animated-fade-home"
                             role="tabpanel">

                            <div className="block-content block-content-full">
                                <table
                                    className="table table-striped table-hover table-borderless table-vcenter font-size-sm mb-0">
                                    <thead>
                                    <tr className="text-uppercase text-muted">
                                        <th className="font-w700">ID</th>
                                        <th className="font-w700">Sujet</th>
                                        <th className="font-w700 text-center">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            list.map((item, cle) => (
                                                <tr key={cle}>
                                                    <td>{++cle}</td>
                                                    <td className="pt-4">{item.text}</td>
                                                    <td className="text-center">
                                                        <a href="javascript:void(0)" data-toggle="tooltip" data-placement="left"
                                                           title="Edit" onClick={() => updateSubject(item)}>
                                                            <i className="fa fa-fw fa-pencil-alt" ></i>
                                                        </a>

                                                        <a href="javascript:void(0)" data-toggle="tooltip" data-placement="left"
                                                           title="Edit" onClick={() => deleteSubject(item)}>
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
                        <div className="tab-pane fade" id="btabs-animated-fade-profile" role="tabpanel">
                            <form noValidate action="#" onSubmit={e => addSubject(e)}>
                                <div className="d-flex flex-row add-comment-section mt-1 mb-4">
                                    <input
                                        type="text"
                                        className="form-control mr-3"
                                        placeholder="Saisissez votre sujet"
                                        value={data.text}
                                        onChange={e => setdata({...data,text: e.target.value})}
                                    />
                                    <button className="btn btn-primary" type="submit">
                                        <i className="fa fa-check font-size-14"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* END TOPIC - Block Tabs Animated Fade */}
            </div>
            {/* END Block Tabs Content Animation */}
        </>
    )
}

export default GestionSujets;
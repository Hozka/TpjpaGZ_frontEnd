import React, {useEffect, useState} from 'react';
import GestionUsers from "./GestionUsers";
const GestionTags = () => {

    const [tag, setTag] = useState([]);

    const initial = {
        value: ''
    }

    let mounted = false

    const [data, setdata] = useState({... initial})
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState([])
    const [erreur, setErreur] = useState(false)

    {/**
     * @Description Récupérer la liste des sujets.
     * */}
    const getTags = () => {
        fetch('http://localhost:8080/tag/all',
            {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                setList(response)
                setLoading(false)
            })
            .catch(err => console.log('subject', err))
    }

    const addTag = e => {
        e.preventDefault()
        fetch('http://localhost:8080/tag/add',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                getTags();
                setdata({...initial});
            }).catch(err => console.log('addTags', err));
    }

    const deleteTag = tag => {
        fetch('http://localhost:8080/tag/'+tag.tagId, {
            method: 'DELETE'
        })
            .then(() => {
                getTags()
                setErreur(false)
            })
            .catch(err => console.log('deleteTag', err))
    }

    const updateTag = tag => {
        fetch('http://localhost:8080/tag/all', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data.tagId,
                name: data.value
            })
        })
            .then(() => {
                getTags()
                setdata({...initial})
            })
            .catch(err => console.log('update', err))
    }

    useEffect(() => {
        if (!mounted) getTags();
        return () => mounted = true
    }, []);

    return (
        <>
            {/* TAGS - Block Tabs Content Animation */}
            <div className="col-lg-6">
                {/* Block Tabs Animated Slide Up */}
                <div className="block block-rounded">
                    <ul className="nav nav-tabs nav-tabs-block" data-toggle="tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" href="#btabs-animated-slideup-home">
                                <i className={""}></i>
                                Liste des <span className={"text-danger"}>tags</span>
                                </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#btabs-animated-slideup-profile">
                                <i className={"si si-plus mr-3"}></i>
                                Ajouter un <span className={"text-danger"}>tag</span>
                            </a>
                        </li>
                    </ul>
                    <div className="block-content tab-content overflow-hidden">
                        <div className="tab-pane fade fade-up show active" id="btabs-animated-slideup-home"
                             role="tabpanel">
                            <div className="block-content block-content-full">
                                <table
                                    className="table table-striped table-hover table-borderless table-vcenter font-size-sm mb-0">
                                    <thead>
                                    <tr className="text-uppercase text-muted">
                                        <th className="font-w700 text-muted">ID</th>
                                        <th className="font-w700">Tag</th>
                                        <th className="font-w700 text-center">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        list.map((item, cle) => (
                                            <tr key={cle}>
                                                <td>{++cle}</td>
                                                <td className="pt-4">{item.value}</td>
                                                <td className="text-center">
                                                    <i className="fa fa-fw fa-pencil-alt text-primary" data-toggle="tooltip"
                                                       data-placement="left"
                                                       title="Edit"
                                                       onClick={() => updateTag(item)}></i>
                                                    <i className="fa fa-fw fa-trash-alt text-danger ml-2"
                                                       data-toggle="tooltip"
                                                       data-placement="left"
                                                       title={"Supprimer"}
                                                       onClick={() => deleteTag(item)}></i>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="tab-pane fade fade-up" id="btabs-animated-slideup-profile" role="tabpanel">
                            <form noValidate action="#" onSubmit={e => addTag(e)}>
                                <div className="d-flex flex-row add-comment-section mt-1 mb-4">
                                    <input
                                        type="text"
                                        className="form-control mr-3"
                                        placeholder="Saisissez votre sujet"
                                        value={data.value}
                                        onChange={e => setdata({...data,value: e.target.value})}
                                    />
                                    <button className="btn btn-primary" type="submit">
                                        <i className="fa fa-check font-size-14"/>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* END TAGS - Block Tabs Content Animation */}
        </>
    )
}

export default GestionTags;
import React from 'react';

const Header = () => {
    return (
        <>
            {/* Header*/}
            <header id="page-header">
                {/* Header Content */}
                <div className="content-header">
                    {/* Left Section */}
                    <div className="d-flex align-items-center">
                        {/* Logo */}
                        <a className="font-w600 font-size-h5 tracking-wider text-dual mr-3" href="index.html">
                            Todo<span className="font-w400">SIR</span>
                        </a>
                        {/* END Logo */}
                    </div>
                    {/* END Left Section */}

                    {/* Right Section */}
                    <div className="d-flex align-items-center">

                        <button type="button" className="btn btn-sm btn-dual d-md-none" data-toggle="layout"
                                data-action="header_search_on">
                            <i className="fa fa-fw fa-search"></i>
                        </button>
                    </div>
                </div>

                <div id="page-header-search" className="overlay-header bg-white">
                    <div className="content-header">
                        <form className="w-100" action="" method="POST">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button type="button" className="btn btn-alt-danger" data-toggle="layout"
                                            data-action="header_search_off">
                                        <i className="fa fa-fw fa-times-circle"></i>
                                    </button>
                                </div>
                                <input type="text" className="form-control" placeholder="Search or hit ESC.."
                                       id="page-header-search-input" name="page-header-search-input"/>
                            </div>
                        </form>
                    </div>
                </div>

                <div id="page-header-loader" className="overlay-header bg-primary-lighter">
                    <div className="content-header">
                        <div className="w-100 text-center">
                            <i className="fa fa-fw fa-circle-notch fa-spin text-primary"></i>
                        </div>
                    </div>
                </div>
            </header>
            {/* Fin - Header */}
        </>
    )
}

export default Header;
import React from 'react';

const Footer = () => {
    return (
        <>
            {/* Footer */}
            <footer id="page-footer" className="bg-white">
                <div className="content py-3">
                    <div className="row font-size-sm">
                        <div className="col-sm-6 order-sm-2 py-1 text-center text-sm-right">
                            with <i className="fa fa-heart text-danger"></i> by <a className="font-w600"
                            href="https://1.envato.market/ydb"
                            target="_blank">PTZ & 11K</a>
                        </div>
                        <div className="col-sm-6 order-sm-1 py-1 text-center text-sm-left">
                            <a className="font-w600" href="https://1.envato.market/AVD6j" target="_blank">TodoSIR
                                0.1</a> &copy; <span data-toggle="year-copy"></span>
                        </div>
                    </div>
                </div>
            </footer>
            {/* Fin - Footer */}
        </>
)
}

export default Footer;
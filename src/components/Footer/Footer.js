import React from 'react';
import './Footer.css';

const Footer = () => {

    return (
        <div className='myfootecss'>
            <div className="">
                <div className="card ">
                    <div className="row mb-2">
                        <div className="col-md-4 col-sm-4 col-xs-4">
                            <div className="footer-text pull-left">
                                <div className="d-flex">
                                    <h2 style={{ color: "#8ca3ba" }}> <img style={{ width: "40px", height: "40px", marginRight: "10px" }}
                                        src="https://res.cloudinary.com/dmfljlyu1/image/upload/v1698612919/logolistened_gahh2l.png" />
                                        ListenEd</h2>
                                </div>
                                <p className="card-text">
                                    ListenEd is a Audio Book system web application that allows users to listen to audio books. The system is designed to be user friendly and easy to use. The system is designed to be user friendly and easy to use.

                                </p>
                                <div className="social mt-2 mb-3">
                                    <i className="fa fa-facebook-official fa-lg" onClick={() => { window.location.replace("https://www.facebook.com/profile.php?id=100007444869672&mibextid=LQQJ4d") }}></i>
                                    <i className="fa fa-instagram fa-lg" onClick={() => { window.location.replace("https://instagram.com/k_a_m_i_n_d_u_") }}></i>
                                    <i className="fa fa-twitter fa-lg" onClick={() => { window.location.replace("https://twitter.com/k_a_m_i_n_d_u_") }}></i>
                                    <i className="fa fa-linkedin-square fa-lg" onClick={() => { window.location.replace("https://www.linkedin.com/in/kamindu-gayantha-4693661b5") }}></i>
                                    <i className="fa fa-github" onClick={() => { window.location.replace("https://github.com/Kamindu99") }}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-2"></div>
                        <div className="col-md-2 col-sm-2 col-xs-2">
                            <h5 className="heading">Services</h5>
                            <ul>
                                <li>User Management</li>
                                <li onClick={() => { window.location.replace('/trainsList') }}>Play Book</li>
                                <li>See Books</li>
                                <li>Payment</li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-2">
                            <h5 className="heading">Terms Condition</h5>
                            <ul className="card-text">
                                <li>Copy Write</li>
                                <li>Privacy Policy</li>
                                <li>End to End</li>
                                <li> Agreement</li>
                            </ul>
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-2">
                            <h5 className="heading">Contact Us</h5>
                            <ul className="card-text">
                                <li>ListenEd</li>
                                <li>Colombo 2</li>
                                <li>Sri Lanka</li>
                                <li>071 5273881</li>
                            </ul>
                        </div>
                    </div>
                    <div className="divider mb-4"> </div>
                    <div className="row" style={{ fontSize: "10px", textAlign: "center", letterSpacing: '2px' }}>
                        <div>
                            Designed and Developed by ListenEd Team <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
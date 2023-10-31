# ListenED_AudioBook_System
ListenED_AudioBook_System

A Voice-Controlled Audiobook Platform for Visually Impaired Students in Sri Lanka

The main objective of the proposed voice-controlled audio book system is to provide visually impaired
university students in Sri Lanka with access to educational materials, such as audio books, in a
convenient and user-friendly format. This will help overcome the barriers these students face in
accessing traditional learning materials and provide them with the tools they need to complete their
higher studies. The ultimate goal is to support the educational development of visually impaired
university students in Sri Lanka and provide them with equal opportunities for learning and
academic success.

        <section className='mt-5 meetteam' id='aboutus'>
            <h1 style={{ marginLeft: '8%' }}>Meet Our Team !</h1>
            <div className="container mt-5">
                <div className="row">
                    {ourTeamPanl.map((ourTeamm) => (
                        <div className="col-xs-12 col-sm-3">
                            <div className="card d-flex flex-column h-100">
                                <a className="img-card">
                                    <img src={ourTeamm?.image} alt='' />
                                </a>
                                <div className="card-content">
                                    <h4 className="card-title mb-3"> {ourTeamm?.name}</h4>
                                    <img className='mb-2' src={`https://img.shields.io/badge/-${ourTeamm?.position}-807e7e`} />
                                    <p style={{ fontSize: '14px' }}>
                                        Sri Lanka Institute of Information Technology
                                    </p>
                                    <p style={{ fontSize: '14px' }}>
                                        <span style={{ fontWeight: '700' }}>Department</span>
                                        <br />
                                        {ourTeamm?.department}
                                    </p>
                                </div>
                                <div className="card-read-more">
                                    <a href="/" style={{ fontSize: '14px', color: 'green' }} className="btn btn-link btn-block ms-2">
                                        <i className="fab fa-google me-1"></i> G-Scholar
                                    </a>
                                    <a href="/" style={{ fontSize: '14px', color: 'green' }} className="btn btn-link btn-block">
                                        <i className="fas fa-envelope-open-text me-1"></i> E-Mail
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row mt-5">
                    {ourTeamMem.map((ourTeamm) => (
                        <div className="col-xs-12 col-sm-3">
                            <div className="card d-flex flex-column h-100">
                                <a className="img-card">
                                    <img src={ourTeamm?.image} alt='' />
                                </a>
                                <div className="card-content">
                                    <h4 className="card-title mb-3"> {ourTeamm?.name}</h4>
                                    <img className='mb-2' src={`https://img.shields.io/badge/-${ourTeamm?.position}-807e7e`} />
                                    <p style={{ fontSize: '14px' }}>
                                        Sri Lanka Institute of Information Technology
                                    </p>
                                    <p style={{ fontSize: '14px' }}>
                                        <span style={{ fontWeight: '700' }}>Department</span>
                                        <br />
                                        {ourTeamm?.department}
                                    </p>
                                </div>
                                <div className="card-read-more">
                                    <a href="/" style={{ fontSize: '14px', color: 'green' }} className="btn btn-link btn-block ms-2">
                                        <i className="fab fa-google me-1"></i> G-Scholar
                                    </a>
                                    <a href="/" style={{ fontSize: '14px', color: 'green' }} className="btn btn-link btn-block">
                                        <i className="fas fa-envelope-open-text me-1"></i> E-Mail
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

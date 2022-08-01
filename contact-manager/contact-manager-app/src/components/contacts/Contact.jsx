import { CURRENTLINE, CYAN, ORANGE, PURPLE , RED } from '../../helpers/colors';

const Contact = ()=>{
    return (
        <div className="col-md-6">
                        <div style={{
                            backgroundColor:CURRENTLINE
                        }} className="card my-2">
                            <div className="card-body">
                                <div className="row align-items-center d-flex justify-content-around">
                                    <div class="col-md-4 col-sm-4">
                                        <img alt="" src="https://via.placeholder.com/200" style={{
                                            border:`1px solid ${PURPLE}`
                                        }}
                                        className="img-fluid rounded"/>
                                    </div>
                                    <div className="col-md-7 col-sm-7">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-dark">
                                                نام و نام خانوادگی :{"  "}
                                                <span className="fw-bold">
                                                    یونس قربانی
                                                </span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                شماره موبایل :{"  "}
                                                <span className="fw-bold">
                                                    ۰۹۱۵۹۵۲۹۸۷۵
                                                </span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                آدرس ایمیل :{"  "}
                                                <span className="fw-bold">
                                                    SaeedNabati@hotmail.com
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                                        <button className="btn my-1" style={{backgroundColor:ORANGE}}>
                                            <i className="fa fa-eye" />
                                        </button>
                                        <button className="btn my-1" style={{backgroundColor:CYAN}}>
                                            <i className="fa fa-pen" />
                                        </button>
                                        <button className="btn my-1" style={{backgroundColor:RED}}>
                                            <i className="fa fa-trash" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}
export default Contact;
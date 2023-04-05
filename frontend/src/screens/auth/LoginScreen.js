import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    //get user from state
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, error, loading } = userLogin;
    console.log(`User`)

    useEffect(() => {
        //if user is logged
        if (userInfo) {
            history.push("/dashboard");
            console.log(userInfo)
        }
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    const style = { background: "hsla(245, 35%, 51%, 1)",

    background: "linear-gradient(90deg, hsla(245, 35%, 51%, 1) 0%, hsla(204, 78%, 58%, 1) 100%)",
    
    background: "-moz-linear-gradient(90deg, hsla(245, 35%, 51%, 1) 0%, hsla(204, 78%, 58%, 1) 100%)",
    
    background: "-webkit-linear-gradient(90deg, hsla(245, 35%, 51%, 1) 0%, hsla(204, 78%, 58%, 1) 100%)",
    
    filter: 'progid: DXImageTransform.Microsoft.gradient( startColorstr="#5C55AD", endColorstr="#42A5E8", GradientType=1 )' }
    return (
        <div
            className="row justify-content-center align-items-center vh-100"
            style={style}
        >
            <div className="login-box">
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-header ">
                        <div className="login-logo">
                            <b className="bold" style={{fontSize:"70px",fontFamily:"Gabriola", color:"hsla(245, 35%, 51%, 1)"}}>Menulize</b>
                            <div className="text-center">
                                <img
                                    className="profile-user-img img-fluid img-circle"
                                    src={"/favicon.png"}
                                    alt="App logo"
                                    style={{width:"152px"}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-body login-card-body">
                        {loading && <Loader variable={loading} />}
                        {error && <Message message={error} color={"danger"} />}
                        <form onSubmit={submitHandler}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-end">
                                <div className="col-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                            <br />
                        </form>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;

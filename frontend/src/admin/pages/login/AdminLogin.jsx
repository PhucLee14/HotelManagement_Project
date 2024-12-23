import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../../redux/auth/authAction";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const auth = useSelector((state) => state.auth);
    const nav = useNavigate();

    const onclickLogin = (e) => {
        e.preventDefault();
        console.log(username, password);

        dispatch(handleLogin(username, password, nav));
    };
    return (
        <div className="h-screen w-screen bg-slate-200 flex justify-center items-center">
            <div className="border border-gray-200 rounded-2xl p-8 bg-slate-100 shadow-2xl">
                <h1 className="text-3xl font-semibold text-center text-gray-600">
                    Login
                </h1>
                <form onSubmit={onclickLogin}>
                    <div className="mt-4 mb-4">
                        <span className="text-base label-text text-gray-500">
                            User Name
                        </span>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập username"
                            className="w-full input input-bordered h-10 mt-2"
                        />
                    </div>
                    <div className="mt-4 mb-4">
                        <label>
                            <span className="text-base label-text text-gray-500">
                                Password
                            </span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            className="w-full input input-bordered h-10 mt-2"
                        />
                    </div>
                    <div>
                        <button
                            id="submit"
                            type="submit"
                            className="btn btn-block bg-indigo-700 btn-sm mt-2 hover:bg-indigo-400 text-white"
                            onClick={onclickLogin}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

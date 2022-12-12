import {useContext, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {AuthContext} from "../store/auth-context";
import {ToastContext} from "../store/toastContext";
import {USER_ROLES} from "../constants";

type FormValues = {
    email: string;
    password: string;
    username: string;
    role: 'Admin' | 'Manager' | 'Developer';
};

export default function AuthPage(props: any) {
    const [authType, setAuthType] = useState('login');
    const [errors, setErrors] = useState<string[]>([]);
    const {register, handleSubmit} = useForm<FormValues>();
    const toastCtx = useContext(ToastContext);
    const authCtx = useContext(AuthContext);

    const onSubmit: SubmitHandler<FormValues> = data => {
        let hasError = false;
        if (!data.email.includes('@')) {
            setErrors((errors) => [...errors, 'Invalid Email'])
            hasError = true;
        }
        if (data.email.length < 8 || data.email.length > 100) {
            setErrors((errors) => [...errors, 'Email must be 8-100 characters long'])
            hasError = true;
        }
        if (data.password.length < 8 || data.password.length > 100) {
            setErrors((errors) => [...errors, 'Password must be 8-100 characters long'])
            hasError = true;
        }
        if (hasError) {
            toastCtx.setToastState({
                type: 'danger',
                message: errors[0]
            })
        }
        if (!hasError) {
            if (authType === 'login') {
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/user/login',
                    data: data
                }).then(response => {
                    authCtx.onLogin(response.data);
                    toastCtx.setToastState({
                        type: 'success',
                        message: 'Login Successful'
                    })
                }).catch(error => {
                    toastCtx.setToastState({
                        type: 'danger',
                        message: error.response.data.message
                    })
                });
            } else {
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/user/register',
                    data: data
                }).then(response => {
                    if (response.status === 201) {
                        toastCtx.setToastState({
                            type: 'success',
                            message: 'User Created Successfully'
                        })
                    }
                }).catch(error => {
                    toastCtx.setToastState({
                        type: 'danger',
                        message: error.response.data.message
                    })
                });
            }

        }
    };

    let buttonTitle = 'Login';
    let buttonText = <p>
        If you do not have an account.
        <a className="link link-accent" onClick={() => setAuthType('register')}>Register Now</a>
    </p>;
    if (authType === 'register') {
        buttonTitle = 'Register';
        buttonText = <p>
            If you have an account.
            <a className="link link-accent" onClick={() => setAuthType('login')}>Login Now</a>
        </p>;
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">{buttonTitle} now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {authType === 'register' && <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username*</span>
                                </label>
                                <input {...register("username")} type="text" placeholder="username"
                                       className="input input-bordered"/>
                            </div>}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email*</span>
                                </label>
                                <input {...register("email")} type="text" placeholder="email"
                                       className="input input-bordered"/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password*</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="password"
                                       className="input input-bordered"/>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {authType === 'register' && <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select {...register("role")} className="select select-bordered">
                                    <option disabled selected>Pick one</option>
                                    {USER_ROLES.map(role => <option value={role} key={role}>{role}</option>)}
                                </select>
                            </div>}
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type="submit">{buttonTitle}</button>
                                <div className="mt-3">
                                    {buttonText}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

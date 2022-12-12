import {useContext, useState} from "react";
import {AuthContext} from "../store/auth-context";
import {USER_ROLES} from "../constants";
import {ToastContext} from "../store/toastContext";
import {updateUser, updateUserPassword} from "../services/user.service";

export default function ProfilePage(props: any) {
    const authCtx = useContext(AuthContext);
    const toastCtx = useContext(ToastContext);
    const user = authCtx.user as any;
    const [saving, setSaving] = useState(false);
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [role, setRole] = useState(user?.role || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const onSave = () => {
        setSaving(true);
        if (!username || username.length < 6 || username.length > 100) {
            showErrorMessage('Usermame must be 6-100 characters long.')
            setSaving(false);
            return;
        }
        if (!email || !email.includes('@') || email.length < 6 || email.length > 100) {
            showErrorMessage('Email must be a valid email and 6-100 characters long.')
            setSaving(false);
            return;
        }
        if (!role) {
            showErrorMessage('Role is required')
            setSaving(false);
            return;
        }
        const payload = {
            email,
            role,
            username
        }
        updateUser(user.id, payload)
            .then((response) => {
                toastCtx.setToastState({
                    type: 'success',
                    message: 'Saved Successfully'
                });
                authCtx.onUpdateUser(response.data);
                setSaving(false);
            })
            .catch(error => {
                if (error.response.status === 401) {
                    showErrorMessage('Unauthorized');
                    authCtx.onLogout();
                } else {
                    showErrorMessage(error.response.data.message);
                }
                setSaving(false);
            })

    }
    const onSavePassword = () => {
        setPasswordSaving(true);
        if (!oldPassword) {
            showErrorMessage('Old Password is required')
            setPasswordSaving(false);
            return;
        }
        if (!newPassword || newPassword.length < 6 || newPassword.length > 100) {
            showErrorMessage('New Password must be 6-100 characters long.')
            setPasswordSaving(false);
            return;
        }
        const payload = {
            oldPassword,
            newPassword,
        }
        updateUserPassword(payload)
            .then((response) => {
                toastCtx.setToastState({
                    type: 'success',
                    message: 'New Password Saved Successfully'
                });
                authCtx.onUpdateUser(response.data);
                setPasswordSaving(false);
                setOldPassword('');
                setNewPassword('');
            })
            .catch(error => {
                if (error.response.status === 401) {
                    showErrorMessage('Unauthorized');
                    authCtx.onLogout();
                } else {
                    showErrorMessage(error.response.data.message);
                }
                setPasswordSaving(false);
            })

    }
    const showErrorMessage = (message: string) => {
        toastCtx.setToastState({
            type: 'error',
            message: message
        })
    }
    return (
        <div className="flex flex-col justify-center py-5 border-secondary-content/20 items-center">
            <div className="flex flex-col gap-3">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-5">Profile</h1>
                </div>
                <div className="form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Username</span>
                    </label>
                    <input value={username} type="text" onChange={($event) => setUsername($event.target.value)}
                           className="input input-bordered text-lg"/>
                </div>
                <div className="form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Email</span>
                    </label>
                    <input value={email} type="email" onChange={($event) => setEmail($event.target.value)}
                           className="input input-bordered text-lg"/>
                </div>
                <div className=" form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Assignee</span>
                    </label>
                    <select value={role} className="select select-bordered text-lg"
                            onChange={($event) => setRole($event.target.value)}>
                        <option value="">Select one</option>
                        {USER_ROLES.map(role => <option value={role} key={role}>{role}</option>)}
                    </select>
                </div>
                <div className="form-control mt-6">
                    {!saving && <button className="btn btn-secondary" onClick={onSave}>Save</button>}
                    {saving && <button className="btn btn-secondary loading">saving</button>}
                </div>
                <div className="divider m-10">Password Update</div>
                <div className="form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Old Password</span>
                    </label>
                    <input value={oldPassword} type="password" placeholder="Type here"
                           onChange={($event) => setOldPassword($event.target.value)}
                           className="input input-bordered text-lg"/>
                </div>
                <div className="form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">New Password</span>
                    </label>
                    <input value={newPassword} type="password" placeholder="Type here"
                           onChange={($event) => setNewPassword($event.target.value)}
                           className="input input-bordered text-lg"/>
                </div>
                <div className="form-control mt-6">
                    {!passwordSaving && <button className="btn btn-secondary" onClick={onSavePassword}>Save</button>}
                    {passwordSaving && <button className="btn btn-secondary loading">saving</button>}
                </div>
            </div>
        </div>
    )
}

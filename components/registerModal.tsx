import {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    useEffect,
    useState,
} from "react";
import { ResponseBody } from "../types";
import InputError from "./generic/inputError";
import TextInput from "./generic/textInputs";

type Props = {
    showModal: boolean;
    closeModal: () => void;
};

const RegisterModal: React.FC<Props> = ({ showModal, closeModal }) => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [username, setUsername] = useState("");
    let [passwordError, setPasswordError] = useState(false);
    let [error, setError] = useState(false);
    let [errorMessage, setErrorMessage] = useState("");
    let [emailError, setEmailError] = useState(false);
    let [usernameError, setUsernameError] = useState(false);

    function validateUsername() {
        if (!username || username.length < 6) {
            setUsernameError(true);
        } else {
            setUsernameError(false);
        }
    }

    function validateEmail() {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }

    async function handleRegister(e: FormEvent) {
        e.preventDefault();
        await fetch("/api/v1/users", {
            method: "POST",
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            let data = await res.json() as ResponseBody;
            if (res.status === 200){
                console.log(data.data)
                closeModal()
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    function validatePasswordsMatch() {
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
    }

    useEffect(() => {
        if (passwordError) setErrorMessage("Passwords do not match");
        if (usernameError)
            setErrorMessage("Username must be atleast 6 characters");
        if (emailError) setErrorMessage("Invalid email");
        if (!passwordError && !usernameError && !emailError) {
            setError(false);
            setErrorMessage("");
        } else setError(true);
    }, [passwordError, emailError, usernameError]);

    return (
        <div
            className={`flex-col justify-center inset-0 absolute align-middle 
        content-center h-screen w-screen z-50 bg-black/60 overflow-x-hidden 
        overflow-y-auto ${showModal ? "flex" : "hidden"}`}
            onMouseDown={closeModal}
        >
            <div
                className="block shadow-xl p-8 m-auto bg-slate-700 rounded-lg relative border-y-[6px] border-blue-500"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >
                <h3 className="text-center font-bold mb-4 text-white">
                    Register to create polls!
                </h3>
                <form
                    action="/api/v1/users"
                    method="post"
                    className="flex flex-col justify-center text-white text-sm space-y-3 w-max"
                    onSubmit={(event) => {
                        handleRegister(event);
                    }}
                >
                    <TextInput
                        name="email"
                        label="Email:"
                        type="email"
                        onBlur={validateEmail}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        hasError={emailError}
                    />
                    <TextInput
                        name="username"
                        label="Username:"
                        type="text"
                        onBlur={validateUsername}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        hasError={usernameError}
                    />
                    <TextInput
                        name="password"
                        label="Password:"
                        type="password"
                        onBlur={validatePasswordsMatch}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        hasError={passwordError}
                    />
                    <TextInput
                        name="confirmPassword"
                        label="Confirm Password:"
                        type="password"
                        onBlur={validatePasswordsMatch}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        hasError={passwordError}
                    />
                    <InputError
                        render={error}
                        message={errorMessage}
                    ></InputError>
                    <button
                        className="px-5 py-2 !mt-6 font-semibold text-white bg-indigo-500 hover:bg-indigo-700 shadow-lg rounded-lg"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;

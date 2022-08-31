import { NextPage } from 'next'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import InputError from './inputError'
import TextInput from './textInputs'


type Props = {
    showModal:boolean
    closeModal: () => void
}



const RegisterModal:NextPage<Props> = ({showModal, closeModal}) => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")
    let [username, setUsername] = useState("")
    let [passwordError, setPasswordError] = useState(false)
    let [error, setError] = useState(false)
    let [errorMessage, setErrorMessage] = useState('')

    async function handleRegister(e:FormEvent){
        e.preventDefault()
        console.log("Submitting")
        await fetch('/api/v1/users/create', {
            method:"POST",
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( async (res) => {
            console.log(await res.json())
        }).catch((err) => {
            console.log(err)
        })
    }

    function validatePasswordsMatch(){
        if (password && confirmPassword && password !== confirmPassword){
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
    }

    useEffect(() => {
        if(passwordError){
            setError(true)
            setErrorMessage("Passwords do not match")
        } else {
            setError(false)
            setErrorMessage('')
        }
    }, [passwordError])
    
    return (
        <div
        className={`flex-col justify-center inset-0 absolute align-middle 
        content-center h-screen w-screen z-50 bg-black/60 overflow-x-hidden 
        overflow-y-auto ${showModal ? "flex" : "hidden"}`}
        onMouseDown = {closeModal}
        >
            <div className="block shadow-xl p-8 m-auto bg-slate-700 rounded-lg relative border-y-[6px] border-blue-500"
                onMouseDown={(e)=>{e.stopPropagation()}}
            >
                <h3 className="text-center font-bold mb-4 text-white">
                    Register to create polls!
                </h3>
                <form
                    action="/api/v1/users/create"
                    method="post"
                    className="flex flex-col justify-center text-white text-sm space-y-3 w-max"
                    onSubmit={(event) => {handleRegister(event)}}
                >
                    <TextInput name="email" label='Email:' type="email" onChange={(e) => {setEmail(e.target.value)}} />
                    <TextInput name="username" label='Username:' type="text" onChange={(e) => {setUsername(e.target.value)}} />
                    <TextInput name="password" label='Password:' type='password' onBlur={validatePasswordsMatch} onChange={(e) => {setPassword(e.target.value)}} />
                    <TextInput name="confirmPassword" label='Confirm Password:' type='password' onBlur={validatePasswordsMatch} onChange={(e) => {setConfirmPassword(e.target.value)}} />
                    <InputError render={error} message={errorMessage}></InputError>
                    <button
                        className="px-5 py-2 !mt-6 font-semibold text-white bg-indigo-500 hover:bg-indigo-700 shadow-lg rounded-lg"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegisterModal
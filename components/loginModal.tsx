import { FormEvent, useEffect, useState } from 'react'
import { ResponseBody } from '../types'
import InputError from './generic/inputError'
import TextInput from './generic/textInputs'


type Props = {
    showModal:boolean
    closeModal: () => void
}



const LoginModal:React.FC<Props> = ({showModal, closeModal}) => {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [username, setUsername] = useState("")
    let [error, setError] = useState(false)
    let [errorMessage, setErrorMessage] = useState('')

    async function handleLogin(e:FormEvent){
        e.preventDefault()
        console.log("Submitting")
        await fetch('/api/v1/users/login', {
            method:"POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then( async (res) => {
            let data:ResponseBody = await res.json()
            if (data.statusCode !== 200){
                setError(true)
                setErrorMessage(data.statusMessage)
            }
        }).catch((err) => {
            setError(true)
			setErrorMessage(err)
        })
    }


    useEffect(() => {
        if(error){
            setError(true)
            setErrorMessage(errorMessage)
        } else {
            setError(false)
            setErrorMessage('')
        }
    }, [error, errorMessage])
    
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
                    Login to create/view your polls!
                </h3>
                <form
                    className="flex flex-col justify-center text-white text-sm space-y-3 w-max"
                    onSubmit={(event) => {handleLogin(event)}}
                >
                    <TextInput name="email" label='Email/Username:' type="email" onChange={(e) => {setEmail(e.target.value)}} hasError={error} />
                    <TextInput name="password" label='Password:' type='password' onChange={(e) => {setPassword(e.target.value)}} hasError={error} />
                    <InputError render={error} message={errorMessage}></InputError>
                    <button
                        className="px-5 py-2 !mt-6 font-semibold text-white bg-indigo-500 hover:bg-indigo-700 shadow-lg rounded-lg"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginModal
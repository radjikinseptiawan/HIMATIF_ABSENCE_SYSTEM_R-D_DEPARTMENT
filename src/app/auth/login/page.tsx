'use client'
import Button from '@/component/button';
import Input from '@/component/input_login_register';
import React, { useEffect, useReducer, useState } from 'react';
import '../locals.css';

const initialState = {
    email : '',
    password : ''
}
type StateType={
    email : string,
    password : string
}

type ActionType= | {type : 'email', payload:string} | {type:'password',payload:string}|{type:'reset',payload:string}
const reducer = (state : StateType,action:ActionType)=>{
    switch(action.type){
        case 'email':
            return {...state, email : action.payload}
        case 'password':
            return {...state, password :action.payload}
        case 'reset':
            return initialState
        default :
           return state
    }
}

export default function Page() {
    const [state,dispatch] = useReducer(reducer,initialState)
    const [view,setView] = useState<boolean>(false)
    

    useEffect(()=>{
        if(localStorage.getItem("token") && localStorage.getItem("email") && localStorage.getItem("id")){
            window.location.href = "/dashboard"
        }
    },[])

    const trySignIn = async (e : React.FormEvent)=>{
        e.preventDefault()
        const response = await fetch('https://himatifabsencesystemr-ddepartmentbackend-production.up.railway.app/login',{
            method : "POST",
            body:JSON.stringify({
                email : state.email,
                password : state.password
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        })

        if(!response.ok){
            console.log("Salah password")
            window.location.href = "/auth/login"
        }


        const data = await response.json()

        localStorage.setItem('token',data.session.access_token);
        localStorage.setItem('id',data.user.id)
        localStorage.setItem("email",data.user.email)
    
        window.location.href = "/dashboard"
}

    return (
     <div className=' flex flex-col  items-center justify-center h-full w-full md:w-screen md:h-screen'>
        <div className='bg-white p-5 shadow-xl w-80 md:w-xl rounded-md'>
            <div className='border-b-3 p-2  border-b-gray-400 my-4'>
            <h1 className='text-cyan-700 text-center font-bold text-3xl'>Login</h1>
            </div>
        <form method='POST' action=""  onSubmit={trySignIn} className='flex flex-col gap-3'>
            <p className='text-cyan-600 text-center my-2'>Welcome back to our website!</p>

            <Input valued={state.email} changeController={(e)=>{dispatch({type:"email",payload:e.target.value})}} dbName="email" props={"Email"} type="email" icon="" action={()=>{}}/>
            <Input dbName="password" props={"Password"} valued={state.password} changeController={(e)=>{dispatch({type:"password",payload:e.target.value})}} type={view ? "text":"password"} icon={view ? "eye-on.svg":"eye-off.svg"} action={()=>setView(!view)}/>
            <a href="/forgot-password" className='hover:text-red-800 hover:underline'>Forgot Password?</a>
            <div className='flex flex-col gap-1 justify-center'>
                <Button disabled={false} action={() => { console.log("On Proggress"); } } variant={"bg-cyan-700 shadow hover:cursor-pointer hover:shadow-2xl transition-shadow p-3 rounded"} text={"Login"} media={""} type={"submit"}/>
                 <Button disabled={true} action={() => console.log("On Proggress")} variant={"bg-white text-black p-3 rounded flex items-center shadow hover:shadow-2xl transition-shadow hover:cursor-pointer justify-center gap-1"} text={"Login with Google"} media={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVITryCqReDwcczrsclm38R8gZt_e92OWj3i8C06WcFWtaM_rIcuh-ekY1umkZf_hlWSc&usqp=CAU"} type={"button"}/>   
                <a href="/auth/register" className='text-cyan-600 text-center hover:text-red-800 transition-colors hover:cursor-pointer hover:underline mt-3'>Dont have an acount?</a>
            </div>
            <p className='text-gray-400 text-center my-2'>Powered by HIMATIF UPB</p>

        </form>
        </div>
    </div>
    )
}

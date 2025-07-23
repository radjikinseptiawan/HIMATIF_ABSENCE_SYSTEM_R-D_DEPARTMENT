'use client'
import Selection from "@/component/selection";
import Button from "@/component/button";
import Input from "@/component/input_login_register";
import React, { useReducer } from "react";
import '../locals.css'
const initialState = {
    username : '',
    fullname : '',
    phone : '',
    email : '',
    gender : "",
    address : '',
    password : '',
    password_confirmation : '',
    date : '',
    role:''
}

type State = {
    username : string,
    fullname : string,
    phone : string,
    email : string,
    address:  string,
    gender : string,
    password : string,
    password_confirmation : string
    date : string
    role : string
}

type ActionType ={
    type : keyof State
    payload : string
}

const reducer = (state : State,action : ActionType)=>{
    switch(action.type){
        case 'username':
            return {...state,[action.type] : action.payload}
        case 'fullname':
            return {...state,[action.type]:action.payload}
        case 'phone':
            return {...state,[action.type]:action.payload}
        case 'email':
            return {...state,[action.type]:action.payload}
        case 'address' : 
            return {...state,[action.type]:  action.payload}
        case 'password' : 
            return {...state,[action.type]:action.payload}
        case 'password_confirmation':
            return {...state,[action.type]:action.payload}
        case 'date':
            return {...state,[action.type] : action.payload}  
        case 'gender':
            return {...state, gender: action.payload}
        case 'role':
         return {...state, role: action.payload}
        default:
            return state
        }
}

export default function Register() {
const [view,setView] = React.useState(false)
const [confirmView, setConfirmView] = React.useState(false)
const [state, dispatch] = useReducer(reducer,initialState);

const submitForm = async()=>{
     if(state.password !== state.password_confirmation){
        console.log("failed send data")
    }
    try{
            const response = await fetch('http://localhost:3001/users-accounts',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body :JSON.stringify({
            email : state.email,
            password: state.password,
            fullname : state.fullname,
            gender: state.gender,
            phone: state.phone,
            username: state.username,
            address: state.address,
            role: state.role,
            birth_date: state.date
        })
    })
    const data = await response.json()
   
    if(!response.ok){
        console.log('failed send data',data)
    }
    window.location.href = "/login"
    }catch(error){
        console.log(error)
    }
    
}

return (
    <>
    <div className=' flex flex-col items-center justify-center h-full w-full md:w-full md:h-full'>
        <div className=' bg-white p-5 shadow-xl w-80 md:w-xl rounded-md'>
            <div className='border-b-3 p-2  border-b-gray-400 my-4'>
            <h1 className='text-cyan-700 text-center font-bold text-3xl'>Register</h1>
            </div>
        <form action="" method="POST" onSubmit={submitForm} className='flex flex-col gap-3'>
            <p className='text-cyan-600 text-center my-2'>Welcome to our website!, this website is powered by HIMATIF UPB</p>

            <Input 
            valued={state.username} 
            dbName="username" 
            props={"Username"} 
            type={"text"} 
            icon={""} 
            action={()=>{}} 
            changeController={(e)=>{dispatch({type : "username",payload:e.target.value})}}/>
            
            <Input 
            dbName="full_name" 
            props={"Fullname"} 
            type="text" 
            icon="" 
            action={()=>{}} 
            changeController={(e)=>dispatch({type:"fullname",payload:e.target.value})} 
            valued={state.fullname}/>
            
            <Input 
            dbName="phone" 
            props={"Phone Number"} 
            type="text" 
            icon="" 
            action={()=>{}} 
            valued={state.phone} 
            changeController={(e)=>dispatch({type:"phone",payload:e.target.value})}/>
          
            <Input 
            dbName="email" 
            props={"Email"} 
            type="email" 
            icon="" 
            action={()=>{}} 
            valued={state.email} 
            changeController={(e)=>dispatch({type : "email",payload:e.target.value})}/>
            
            <Selection id="gender" name="gender" changed={(e)=>dispatch({type:"gender",payload:e.target.value})} valued={state.gender} textfor="Gender">
                <option value="" disabled></option>
                {
                    ['Male','Female'].map((item,index)=>(
                        <option value={item} key={index++}>{item}</option>
                    ))
                }
            </Selection>

            <Input 
            dbName="address" 
            props={"Address"} 
            type="text" icon="" 
            action={()=>{}} valued={state.address} 
            changeController={(e)=>dispatch({type : "address",payload:e.target.value})} />            
            
            <Input 
            dbName="password" 
            props={"Password"} 
            type={view ? "text":"password"} 
            icon={view ? "eye-on.svg":"eye-off.svg"} 
            valued={state.password} 
            changeController={(e)=>dispatch({type:"password",payload:e.target.value})} action={()=>setView(!view)}/>
            
            <Input 
            dbName="" 
            props={"Confirm Password"} 
            type={confirmView ? "text":"password"} 
            icon={confirmView ? "eye-on.svg" : "eye-off.svg"} 
            valued={state.password_confirmation} 
            changeController={(e)=>dispatch({type:"password_confirmation",payload:e.target.value})}
            action={()=>{setConfirmView(!confirmView)}}/>

            <Selection valued={state.role} changed={(e)=>dispatch({type:"role",payload:e.target.value})} name="role" id="role" textfor="Role">
                   <option value="" disabled></option>
                {
                    [   'Ketua Umum',
                        'Sekertaris Umum',
                        'Bendahara Umum',
                        'Ketua Departemen Litbang',
                        'Wakil Ketua Departemen Litbang',
                        'Sekertaris Departemen Litbang',
                        'Bendahara Departemen Litbang',
                        'Anggota Departement'
                    ].map((item,index)=>{
                        return(
                            <option key={index++} value={item}>{item}</option>
                        )
                    })
                }
            </Selection>
           
            <Input 
            dbName="birth_date" 
            props={"Birth Date"} 
            type={"date"} 
            icon={""} 
            valued={state.date} 
            changeController={(e)=>dispatch({type:"date",payload:e.target.value})}
            action={()=>{}}/>


            <div className='flex flex-col gap-1 justify-center'>
                <Button type="button" action={()=>submitForm()} variant={"bg-cyan-700 shadow hover:cursor-pointer hover:shadow-2xl transition-shadow p-3 rounded"} text={"Register"} media={""}/>
                 <Button type="button" action={()=>console.log("On Proggress") } variant={"bg-white text-black p-3 rounded flex items-center shadow hover:shadow-2xl transition-shadow hover:cursor-pointer justify-center gap-1"} text={"Register with Google"} media={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVITryCqReDwcczrsclm38R8gZt_e92OWj3i8C06WcFWtaM_rIcuh-ekY1umkZf_hlWSc&usqp=CAU"}/>   
                <a href="/auth/login" className='text-cyan-600 text-center hover:text-red-800 transition-colors hover:cursor-pointer hover:underline mt-3'>Already have an acount?</a>
            </div>

        </form>
        </div>
    </div>
    </>
    );
}

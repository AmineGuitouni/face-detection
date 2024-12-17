"use server";

import axios from "axios";

export async function AddUser({
    firstName,
    lastName,
    images
}:{
    firstName:string,
    lastName:string,
    images:string[]
}) {
    if(!firstName || !lastName || !images || images.length === 0) return;
    
    await axios.post("http://192.168.137.236:8000/add_user", {
        first_name: firstName,
        last_name: lastName,
        images:images
    })
}

export async function GetUsers() {
    const res = await axios.get("http://192.168.137.236:8000/get_users")
    return res.data.map((user:any)=>({
        id:user.user_id,
        firstName:user.first_name,
        lastName:user.last_name,
    })) as {id:number, firstName:string, lastName:string, image?:string | null}[]
}

export async function CheckUser() {
    const res = await axios.get("http://192.168.137.236:8000/check_user")
    return null
}
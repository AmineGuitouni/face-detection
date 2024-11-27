"use server";

import axios from "axios";


export async function AddUser({
    firstName,
    lastName,
    image
}:{
    firstName:string,
    lastName:string,
    image:string | null
}) {
    if(!firstName || !lastName || !image) return;
    console.log(image.slice(0,100));
    await axios.post("https://nearby-prompt-buzzard.ngrok-free.app/add_user", {
        first_name: firstName,
        last_name: lastName,
        image
    })
}
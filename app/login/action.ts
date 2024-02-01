'use server'

import State from "./state";

export async function login(prevState: any, formData : FormData){
    const result: State = {
        message: ''
    }
    const email = formData.get('email');
    const password = formData.get('password');

    if(email !== 'admin' && password !== 'admin'){
        result.message = 'Invalid email or password'
        return result
    }
    console.log(email, password)
    return result
}
import { supabase } from "../config/supabase"


export const AuthService = {
    SignUp: async (email: string, password: string, name: string) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name
                }
            }
        })

        if(error) {
            console.log('Erro SignUp', error)
            throw error
        }
        
        return data
    },

    SignIn: async (email: string, password: string) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error) {
            console.log('ERRO AO FAZER LOGIN')
            throw error
        }
        
        return data
    }
}
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "../constants/supabaseKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
        storage: AsyncStorage
    }
})
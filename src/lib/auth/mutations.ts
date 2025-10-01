import { httpClient } from "../http-client"
import { setAuthSession } from "./utils"

type LoginResponse = {
    expires_at: number;
    access_token: string;
    token_type: string;
}

export const loginMutation = async (username: string, password: string): Promise<boolean> => {
    try {
        
        const response = await httpClient.post<LoginResponse>('/auth/login/password', {
            username,
            password,
            login_role: 'admin'
        })
        if(response.status === 200) {
            setAuthSession({
                expires_at: response.data.expires_at,
                token: `${response.data.token_type} ${response.data.access_token}`
            })
            return true
        }
    } catch (error) {
        console.log(error)
        return false
    }

    return false
}


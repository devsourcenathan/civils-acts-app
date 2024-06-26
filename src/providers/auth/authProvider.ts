import { log } from 'console';
import { AuthBindings, usePermissions } from "@refinedev/core";
import { notification } from "antd";
import { disableAutoLogin, enableAutoLogin } from "../../hooks";
import { API_BASE_URL, API_URL, PERMISSION_TOKEN, ROLE_TOKEN, SERVICE_TOKEN } from ".."; 
import { Roles } from '../../interfaces';

export const TOKEN_KEY = "mk_token";

 
interface UserData {
    id: string;
    tenantId: string;
    name: string;
    firstName: string;
    lastName: string;
    login: string;
    roles: string[];
    internal: boolean;
    role: Roles;
    permissions: string[];
    service_id: number
}

export const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        //enableAutoLogin();
        const input = {
            "email": email,
            "password": password
        }

 
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input),
        })

        if (response.ok) {
            const data = await response.json()

            localStorage.setItem(TOKEN_KEY, `${data.token}`);

            const responseIdentity = await fetch(`${API_URL}/me`, {
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'application/json'
                },
            })
    
            if (responseIdentity.ok) {
                const data: UserData = await responseIdentity.json()
                localStorage.setItem(ROLE_TOKEN, data.role)
                localStorage.setItem(SERVICE_TOKEN, JSON.stringify(data.service_id))
                localStorage.setItem(PERMISSION_TOKEN, JSON.stringify(data.permissions))
            }

            return {
                success: true,
                redirectTo: "/",
            };
        }else{
            return {
                success: false, 
            };
        } 
    },
    register: async ({ email, password }) => {
        try {
            const input = {
                "login": email,
                "password": password
            }

            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input),
            })

            return {
                success: true,
            };
        } catch (error) {
            
            return {
                success: false,
                error: {
                    message: "Register failed",
                    name: "Invalid email or password",
                },
            };
        }
    },
    updatePassword: async () => {
        notification.success({
            message: "Updated Password",
            description: "Password updated successfully",
        });
        return {
            success: true,
        };
    },
    forgotPassword: async ({ email }) => {
        notification.success({
            message: "Reset Password",
            description: `Reset password link sent to "${email}"`,
        });
        return {
            success: true,
        };
    },
    logout: async () => {
        disableAutoLogin();
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_TOKEN);
        localStorage.removeItem(SERVICE_TOKEN);
        localStorage.removeItem(PERMISSION_TOKEN);
         return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: {
                message: "Check failed",
                name: "Token not found",
            },
            logout: true,
            redirectTo: "/login",
        };
    },

    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return null;
        }

        const response = await fetch(`${API_URL}/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })

        if (response.ok) {
            const data: UserData = await response.json()
            localStorage.setItem(ROLE_TOKEN, data.role)
            localStorage.setItem(SERVICE_TOKEN, JSON.stringify(data.service_id))
            localStorage.setItem(PERMISSION_TOKEN, JSON.stringify(data.permissions))

            console.log(data);
            
            return {
                id: 1,
                name: `${data.name}`,
                avatar: "https://i.pravatar.cc/150",
                role: data.role,
                roles: data.roles,
                tenantId: data.tenantId,
                permissions: data.permissions
            };
        }
        return null;
    },

};

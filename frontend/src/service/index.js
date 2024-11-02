import axiosInstance from "@/api/axiosInstance";

export async function registerService(formData) {
    const response = await axiosInstance.post('/auth/register', {
        ...formData, role: 'user'
    })
    return response.data;
}

export async function loginService(formData) {
    const response = await axiosInstance.post('/auth/login', formData)
    return response.data;
}

export async function checkAuthService() {
    const response = await axiosInstance.get('/auth/check-auth')
    return response.data;
}

export async function checkUsernameAvailability(userName) {
    const response = await axiosInstance.get('/auth/check-username',{
        params: { userName }
    });
    return response.data;
}
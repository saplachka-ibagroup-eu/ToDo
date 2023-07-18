import { authService } from '../../services/AuthService';
import axiosInstance from '../../helpers/axios';

const baseUrl = "/auth";

export default {
    employee() {

        return {
            fetchAll: (params) => {
                const config = {
                    headers: authService.getHeaders(true),
                };                
                return axiosInstance.post(baseUrl + '/Employee', params, config)
            },
            uploadImage: (formData) => {
                const contentType = { "Content-Type": "multipart/form-data" };
                const config = {
                    headers: authService.getHeaders(true, contentType),
                };
                return axiosInstance.post(baseUrl + '/Image', formData, config)
            }
            
        }
    }
}
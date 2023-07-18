import { authService } from '../../services/AuthService';
import axiosInstance from '../../helpers/axios';

const baseUrl = "/api";

export default {
    todo(url = baseUrl + '/Todo/') {

        return {
            fetchAll: (name) => {
                let config = {
                    headers: authService.getHeaders(true),
                    params: {
                        name
                    },
                };
                console.log(config);
                return axiosInstance.get(url, config)
            },
            fetchById: id => axiosInstance.get(url + id, {
                headers: authService.getHeaders(true)
            }),
            create: newRecord => axiosInstance.post(url, newRecord, {
                headers: authService.getHeaders(true)

            }),
            update: (id, updateRecord) => axiosInstance.put(url + id, updateRecord, {
                headers: authService.getHeaders(true)
            }),
            delete: id => axiosInstance.delete(url + id, {
                headers: authService.getHeaders(true)
            })
        }
    }
}
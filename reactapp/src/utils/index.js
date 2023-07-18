export const formateError = (errorResponse) => {
    switch (errorResponse.status) {
        case 400:
            return "Invalid Password";
        case 404:
            return "Employee not found";
       
        default:
            return "";
    }
};
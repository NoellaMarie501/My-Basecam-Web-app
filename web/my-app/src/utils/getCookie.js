import Cookies from "js-cookie"
//method to get token from cookies
export const getCookie = ( ) => {
    return Cookies.get('token');
}

export default function () {

    const token = localStorage.getItem('blogToken'); //obtenemos el token.

    if (token) {

        const baseUri = token.split('.')[1]; //Obtenemos el elemento en la posición 1
        const base64 = baseUri.replace('-', '+').replace('_', '/'); //Se remueven los simbolos que contenga la cadena.
        const payload = JSON.parse(window.atob(base64));

        return {
            isAuthenticated: true,
            user: { ...payload }
        }
    } else {
        return {
            isAuthenticated: false,
            user: null
        }
    }

}
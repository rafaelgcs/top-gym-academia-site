// CONSTS TO USE IN CODE
const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY
const USER_KEY = process.env.REACT_APP_USER_KEY
const EXPIRES_IN_KEY = process.env.REACT_APP_EXPIRES_IN_KEY
const LAST_LOGIN_KEY = process.env.REACT_APP_LAST_LOGIN_KEY
const REMEMBER_USER_KEY = process.env.REACT_APP_REMEMBER_USER_KEY


// COMMANDS TO EXPORT

const getToken = () => {
    let token = localStorage.getItem(TOKEN_KEY)

    return token
}

const getUser = () => {
    let userStr = localStorage.getItem(USER_KEY)

    return JSON.parse(userStr)
}

const getRemember = () => {
    let remember = localStorage.getItem(REMEMBER_USER_KEY)
    if (remember === "true") {
        return true
    }
    return false
}

const login = async (user, token, expires_in, remember) => {
    try {
        await localStorage.setItem(TOKEN_KEY, token);
        await localStorage.setItem(USER_KEY, JSON.stringify(user));
        await localStorage.setItem(REMEMBER_USER_KEY, remember);
        await localStorage.setItem(EXPIRES_IN_KEY, expires_in.toString());
        await localStorage.setItem(LAST_LOGIN_KEY, (new Date()).toString());
        return true;
    } catch (error) {
        return false;
    }
}

const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    return true;
}

const isAuthenticated = () => {
    let token = localStorage.getItem(TOKEN_KEY)
    let user = localStorage.getItem(USER_KEY)
    let last_login = localStorage.getItem(LAST_LOGIN_KEY)
    let expires_in = localStorage.getItem(EXPIRES_IN_KEY)

    if (token != null && user != null) {
        let now = new Date(); // Data de hoje
        let past = new Date(last_login); // Outra data no passado
        let diff = Math.abs(now.getTime() - past.getTime()); // Subtrai uma data pela outra
        let seconds = Math.ceil(diff / (1000)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
        if (seconds < parseInt(expires_in)) {
            return true
        }
    }

    return false
}

const refresh = (token, expires_in) => {
    let result = false;
    try {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(EXPIRES_IN_KEY, expires_in.toString());
        localStorage.setItem(LAST_LOGIN_KEY, (new Date()).toString());
        result = true;
    } catch (e) {
        result = false;
    }

    return result;
}

export { getToken, getUser, login, logout, isAuthenticated, getRemember, refresh };
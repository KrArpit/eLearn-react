
export function validateUsername(username){
    const usernameRegex = /^(?!.*[&=+',<>])(?=^[a-zA-Z0-9])(?!.*\.\.)(?!.*_$)[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

    if(username.length == 0){
        return {
            isValid: null,
            message: null
        }
    }
    if (username.length<4 || username.length>20){
        return {
            isValid: false,
            message: 'Username must be between 4 and 20 characters long'
        }
    }
    if(/\s/.test(username)){
        return {
            isValid: false,
            message: 'Username cannot contain spaces'
        }
    }
    if(!usernameRegex.test(username)){
        return {
            isValid: false,
            message: 'Username contains invalid characters'
        }
    }
    return {isValid: true, message: null}
}
import axios from 'axios'

const url = "http://localhost:5000/api/users"

class UserService {
    static insertUser(firstname, lastname, email, password) {
        axios.post(url, {
            firstname,
            lastname,
            email,
            password
        }).then(() => {
            return "registered"
        }).catch(function (error) {
            return JSON.stringify(error.message)
        });
    }
}

export default UserService
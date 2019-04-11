import axios from 'axios';

export const enter = (entry) => dispatch => {
    let url = '/api/entries/enter'
    const token = localStorage.getItem("jwtToken")
    let config = {
        headers: {
            Authorization: token
        }
    }
     axios.post(url, entry, config)
}
// includes all helper functions that interact with the server
// the API config pattern. Learnt from Redux-saga examples

import axios from 'axios';

export default {
    submitToServer: (options={}) => axios(options.url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        data: JSON.stringify(options.data)
    }),
    submitWithToken: (options={}) => axios(options.url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${options.token}`
        },
        data: JSON.stringify(options.data)
    }),
    sendFile: (options={}) => axios(options.url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${options.token}`
        },
        data: options.data
    }),
    getFromServer: (options={}) => axios(options.url, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${options.token}`
        }
    }),
    deleteFromServer: (options={}) => axios(options.url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${options.token}`
        }
    })
};
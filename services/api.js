import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://data.mongodb-api.com/app/data-nawdf/endpoint/data/v1',
    headers: {
        'api-key': 'PJDKKnnheQ4OjmTRqiNqCifsVuR9Oa3WMIqsNqi266AZHtODMjcw8Sd4L3vKQVht',
        'Access-Control-Request-Headers': '*',
        'Content-Type': 'application/json'
    },
});
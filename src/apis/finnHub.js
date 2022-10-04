import axios from "axios"

const TOKEN = "cct3r22ad3ia79l10u00cct3r22ad3ia79l10u0g"

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: TOKEN
    }
})


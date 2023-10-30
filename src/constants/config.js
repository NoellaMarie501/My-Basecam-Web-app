const host = process.env.REACT_APP_HOST
const port = process.env.REACT_APP_SERVER_PORT
export const API_URL = `http://${host}:${port}`

export const ROLES = ["admin","user"];
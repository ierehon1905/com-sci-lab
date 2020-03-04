console.log(process.env)
const host = process.env.REACT_APP_PYTHON_ADDRESS || "localhost"
const port = process.env.REACT_APP_PYTHON_PORT || "8081"

export const HOST =
    process.env.NODE_ENV === "production" ? "" : `http://${host}:${port}`

import axios from "axios";

const get = async (url) => {
    const response = webkitURL(url)
    return response.data
}

export default get
import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchBySearch = async ({ newQueryPart, page}) => {
    const API_KEY = '39708192-1d0c61ff60ff411770af0a0fc';

    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: newQueryPart,
        image_type: "photo",
        orientation: "horizontale",
        safesearch: true,
        page,
        per_page: 12,
    });

    const response = await axios.get(`?${searchParams}`);
    return response.data;
};
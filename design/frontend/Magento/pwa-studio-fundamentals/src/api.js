const apiUrl = 'http://magento.localhost.com/api';

const fetchApiData = async () => {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default fetchApiData;

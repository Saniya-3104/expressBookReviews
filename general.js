const axios = require("axios");

const getAllBooks = async () => {
    try {
        const response = await axios.get("http://localhost:5000/books");
        return response.data;
    } catch (error) {
        return error.message;
    }
};

const getBooksByISBN = async (isbn) => {
    try {
        const response = await axios.get(`http://localhost:5000/books/isbn/${isbn}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

const getBooksByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/books/author/${encodeURIComponent(author)}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

const getBooksByTitle = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/books/title/${encodeURIComponent(title)}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
};

module.exports = {
    getAllBooks,
    getBooksByISBN,
    getBooksByAuthor,
    getBooksByTitle
};

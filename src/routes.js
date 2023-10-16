const { 
    addBookHandler,
    getAllBooksHandler,
    getNoteByIdHandler, 
    editNoteByIdHandler
    } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getNoteByIdHandler,
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editNoteByIdHandler,
    }
]

module.exports = routes;
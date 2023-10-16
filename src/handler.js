const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {

        const response = h.response({

            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }

        });

        response.code(201);
        return response;

    }

    if (name == undefined) {

        const response = h.response({

            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'

        })

        response.code(400);
        return response;

    }

    if (readPage > pageCount) {

        const response = h.response({

            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'

        });

        response.code(400);
        return response;
    }
}

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books: books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }))
    }
})

const getNoteByIdHandler = (request, h) => {

    const { id } = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book: {
                    book,
                }
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;

}

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getNoteByIdHandler
};
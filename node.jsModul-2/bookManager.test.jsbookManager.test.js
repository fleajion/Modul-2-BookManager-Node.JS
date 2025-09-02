const Book = require('./book');
const BookManager = require('./bookManager');

describe("BookManager", () => {
    let bookManager;

    beforeEach(() => {
        bookManager = new BookManager();
    });

    test("Test menambahkan buku", () => {
        const book = new Book("Test Book", "Test Author", 2023);
        bookManager.addBook(book);

        expect(bookManager.getBookCount()).toBe(1);
    });

    test("Test menghapus buku yang ada", () => {
        const book = new Book("To Remove", "Author", 2023);
        bookManager.addBook(book);

        const removed = bookManager.removeBook("To Remove");
        expect(removed).toBe(true);
        expect(bookManager.getBookCount()).toBe(0);
    });

    // Unit Test untuk buku yang memang tidak terdapat pada list
    test("Test menghapus buku yang tidak ada", () => {
        const removed = bookManager.removeBook("Not Exist");
        expect(removed).toBe(false);
    });

    // Unit Test mencari buku berdasarkan penulis
    test("Test mencari buku berdasarkan author", () => {
        const book1 = new Book("Book1", "Author A", 2021);
        const book2 = new Book("Book2", "Author B", 2022);
        const book3 = new Book("Book3", "Author A", 2023);

        bookManager.addBook(book1);
        bookManager.addBook(book2);
        bookManager.addBook(book3);

        const result = bookManager.findBooksByAuthor("Author A");
        expect(result.length).toBe(2);
        expect(result).toEqual(expect.arrayContaining([book1, book3]));
    });

    // Unit Test untuk menampilkan semua buku
    test("Test mendapatkan semua buku", () => {
        const book1 = new Book("Book1", "Author A", 2021);
        const book2 = new Book("Book2", "Author B", 2022);

        bookManager.addBook(book1);
        bookManager.addBook(book2);

        const allBooks = bookManager.getAllBooks();
        expect(allBooks.length).toBe(2);
        expect(allBooks).toEqual(expect.arrayContaining([book1, book2]));
    });
});

const express = require("express");
const books = require("./books");

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express Book Review API is running");
});

app.get("/books", (req, res) => {
    res.json(books);
});

app.get("/books/isbn/:isbn", (req, res) => {
    const book = books[req.params.isbn];

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

app.get("/books/author/:author", (req, res) => {
    const author = decodeURIComponent(req.params.author);
    const result = Object.values(books).filter(
        book => book.author.toLowerCase() === author.toLowerCase()
    );
    res.json(result);
});

app.get("/books/title/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title);
    const result = Object.values(books).filter(
        book => book.title.toLowerCase() === title.toLowerCase()
    );
    res.json(result);
});

app.get("/books/:isbn/review", (req, res) => {
    const book = books[req.params.isbn];

    if (book) {
        res.json(book.reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

app.put("/books/:isbn/review", (req, res) => {
    const book = books[req.params.isbn];

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { username, review } = req.body;

    if (!username || !review) {
        return res.status(400).json({ message: "Username and review are required" });
    }

    book.reviews[username] = review;

    res.json({
        message: "Review added or modified successfully",
        reviews: book.reviews
    });
});

app.delete("/books/:isbn/review/:username", (req, res) => {
    const book = books[req.params.isbn];

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const username = req.params.username;

    if (book.reviews[username]) {
        delete book.reviews[username];

        res.json({
            message: "Review deleted successfully",
            reviews: book.reviews
        });
    } else {
        res.status(404).json({ message: "Review not found" });
    }
});
const users = {};

app.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (users[username]) {
        return res.status(409).json({ message: "User already exists" });
    }

    users[username] = { username, password };

    res.json({
        message: "User registered successfully",
        user: { username }
    });
});
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username].password === password) {
        res.json({
            message: "Login successful",
            username: username
        });
    } else {
        res.status(401).json({
            message: "Invalid username or password"
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

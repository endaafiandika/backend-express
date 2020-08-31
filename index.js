const express = require('express');
const app = express();
const pool = require("./db");

app.use(express.json())

app.get("/produk", async (req,res)=> {
    try {
        const allTodo = await pool.query("SELECT * FROM produk ORDER BY id ASC ");
        res.json(allTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/produk/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const todo = await pool.query("SELECT * FROM produk WHERE id = $1",[id]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/produk", async(req,res)=> {
    try {
        const {nama, harga, stok} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO produk (nama, harga, stok) VALUES ($1, $2, $3)",
            [nama, harga, stok]
        );
        
        res.json("produk was new add");
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/produk/:id", async(req,res)=> {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM produk WHERE id = $1", [id]);
        res.json("produk was delete");
        
    } catch (err) {
        console.error(err.message);
        
    }
});

app.put("/produk/:id", async(req,res)=> {
    try {
        const {id} = req.params;
        const {nama, harga, stok} = req.body;

        const updateTodo = await pool.query("UPDATE produk SET nama = $1, harga = $2, stok = $3  WHERE id = $4",
        [nama, harga, stok,id]
        );

        res.json("produk was update");
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/kategori", async (req,res)=> {
    try {
        const allKategori = await pool.query("SELECT * FROM kategori ORDER BY id_kategori ASC ");
        res.json(allKategori.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/kategori/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const kategori = await pool.query("SELECT * FROM kategori WHERE id_kategori = $1",[id]);

        res.json(kategori.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/kategori", async(req,res)=> {
    try {
        const {name_produk, type} = req.body;
        const newKategori = await pool.query(
            "INSERT INTO kategori (name_produk, type) VALUES ($1, $2)",
            [name_produk, type]
        );
        
        res.json("kategori was new add");
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/kategori/:id", async(req,res)=> {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM kategori WHERE id_kategori = $1", [id]);
        res.json("kategori was delete");
        
    } catch (err) {
        console.error(err.message);
        
    }
});

app.put("/kategori/:id", async(req,res)=> {
    try {
        const {id} = req.params;
        const {name_produk, type} = req.body;

        const updateTodo = await pool.query("UPDATE kategori SET name_produk = $1, type = $2  WHERE id_kategori = $3",
        [name_produk, type,id]
        );

        res.json("kategori was update");
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/history", async (req,res)=> {
    try {
        const allhistory = await pool.query("SELECT * FROM history ORDER BY id_history ASC ");
        res.json(allhistory.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/history/:id", async (req,res) => {
    const {id} = req.params;
    try {
        const history = await pool.query("SELECT * FROM history WHERE id_history = $1",[id]);

        res.json(history.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/history", async(req,res)=> {
    try {
        const {invoice, cashier, order_history, amount} = req.body;
        const newHistory = await pool.query(
            "INSERT INTO history (invoice, cashier, order_history, amount) VALUES ($1, $2, $3, $4)",
            [invoice, cashier, order_history, amount]
        );
        
        res.json("history was new add");
    } catch (err) {
        console.log(err.message);
    }
});

app.put("/history/:id", async(req,res)=> {
    try {
        const {id} = req.params;
        const {invoice, cashier, order_history, amount} = req.body;

        const updateTodo = await pool.query("UPDATE history SET invoice = $1, cashier = $2, order_history = $3, amount = $4  WHERE id_history = $5",
        [invoice, cashier, order_history, amount,id]
        );

        res.json("history was update");
    } catch (err) {
        console.error(err.message);
    }
});

app.delete("/history/:id", async(req,res)=> {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM history WHERE id_history = $1", [id]);
        res.json("history was delete");
        
    } catch (err) {
        console.error(err.message);
        
    }
});

app.get("/produk/find/:nama", async (req,res) => {
    const names = req.params.nama;

    try {
        const todo = await pool.query(`SELECT * FROM produk WHERE nama LIKE '%${names}%' ORDER BY id `);
        res.json(todo.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/kategori/find/:nama", async (req,res) => {
    const names = req.params.nama;

    try {
        const todo = await pool.query(`SELECT * FROM kategori WHERE name_produk LIKE '%${names}%' ORDER BY id_kategori `);
        res.json(todo.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/history/find/:nama", async (req,res) => {
    const names = req.params.nama;

    try {
        const todo = await pool.query(`SELECT * FROM history WHERE cashier LIKE '%${names}%' ORDER BY id_history `);
        res.json(todo.rows[0]);
        
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000, () => {
    console.log('server listening in port 3000');
});
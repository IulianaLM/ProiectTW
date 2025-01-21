const express = require("express");
const router = express.Router();
const pool = require("../db");

// Endpoint pentru adăugarea unui student
router.post("/register", async (req, res) => {
  const { numePrenume, email, echipa_proiect } = req.body;

  if (!numePrenume || !email) {
    return res.status(400).json({ message: "Toate câmpurile sunt obligatorii!" });
  }

  try {
    const conn = await pool.getConnection();
    const query = "INSERT INTO student (numePrenume, email, echipa_proiect) VALUES (?, ?, ?)";
    await conn.query(query, [numePrenume, email, echipa_proiect || null]); // Poate fi NULL
    conn.release();
    
    res.status(201).json({ message: "Cont creat cu succes!" });
  } catch (error) {
    console.error("Eroare la crearea contului:", error);
    res.status(500).json({ message: "Eroare la server. Verificați consola." });
  }
});

module.exports = router;

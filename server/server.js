const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const app = express();
const port = 5050;

// Middleware for JSON requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup image upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// MongoDB Connection
const url = 'mongodb+srv://divyanshu:1234567890@cluster0.5wif7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'sample_mflix';
let db;
MongoClient.connect(url)
    .then((client) => {
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.error(err));

// Routes

// Get Email Layout
app.get('/getEmailLayout', (req, res) => {
    const layoutHTML = fs.readFileSync('./layout.html', 'utf-8');
    res.json({ layoutHTML });
});

// Upload Image
app.post('/uploadImage', upload.single('image'), (req, res) => {
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ imageURL: imagePath });
});

// Upload Email Config
app.post('/uploadEmailConfig', (req, res) => {
    const templateData = req.body;
    db.collection('templates').insertOne(templateData)
        .then(() => res.status(200).send('Template saved'))
        .catch((err) => res.status(500).send('Error saving template'));
});

// Render and Download Template
app.post('/renderAndDownloadTemplate', (req, res) => {
    const templateData = req.body;

    // Read and substitute values in the HTML layout
    let layoutHTML = fs.readFileSync('./layout.html', 'utf-8');
    Object.keys(templateData).forEach((key) => {
        const value = templateData[key];
        const regex = new RegExp(`{{${key}}}`, 'g');
        layoutHTML = layoutHTML.replace(regex, value);
    });

    // Generate the output HTML file
    const outputPath = './output/email_template.html';
    fs.writeFileSync(outputPath, layoutHTML);

    res.json({ fileURL: '/output/email_template.html' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

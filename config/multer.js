const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Verificar se a pasta uploads existe, caso contrário, criar
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Pasta onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada imagem
    }
});

// Verificar o tipo de arquivo e limitar o tamanho
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limite de 5MB por arquivo
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/; // Tipos permitidos
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true); // Aceitar arquivo
        } else {
            cb(new Error('Arquivo deve ser uma imagem válida (JPEG, JPG, PNG, GIF).'), false);
        }
    }
});

module.exports = upload;

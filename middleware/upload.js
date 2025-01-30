const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Criar a pasta uploads se não existir
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Garante que a pasta seja criada corretamente
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Salvar na pasta "uploads/"
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Verificar o tipo de arquivo e limitar o tamanho
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB por arquivo
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true); // Aceitar arquivo
        } else {
            return cb(new Error('Apenas imagens nos formatos JPEG, JPG, PNG ou GIF são permitidas!'), false);
        }
    }
});

module.exports = upload;

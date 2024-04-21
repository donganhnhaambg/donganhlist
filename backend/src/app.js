const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const port = process.env.PORT || 3002;

// Tạo một máy chủ http và chuyển express app như một trình xử lý yêu cầu
const app = express();

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

const route = require('./routes');
const path = require("path");

db.connect().then();

// app.use(middleware);

// middleware xử lý dữ liệu form data
app.use(express.urlencoded());

// HTTP logger
app.use(morgan('combined'));

// Xử lý dữ liệu JSON
app.use(express.json())

// Sử dụng Express để phục vụ các tệp tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, 'public', 'image')));
app.use(express.static(path.join(__dirname, 'public', 'file')));

app.use(cors());
// Routes init
route(app);
const actionService = require("../service/ActionService");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

class ActionController {
  async add(req, res) {
    const data = req.body;
    await actionService.save(data);
    res.json({
      msg: "OK",
    });
  }
  async chatMessage(req, res) {
    const data = req.body;
    const result = await actionService.saveMessage(data);
    res.json(result);
  }

  async uploadFile(req, res) {
    const result = await actionService.uploadFile(req.body.id, req.file);
    res.status(result.statusCode).json({
      message: result.message,
      url: result.url,
    });
  }

  async downloadFile(req, res) {
    try {
      const result = await actionService.downloadFile(req.body);
      const filePath = `./src/public/file/${result}`;

      // Đọc file Excel
      const workbook = xlsx.readFile(filePath);

      // Lấy danh sách các sheet trong file Excel
      const sheetNames = workbook.SheetNames;

      // Lấy dữ liệu từ sheet đầu tiên (index 0)
      const firstSheet = workbook.Sheets[sheetNames[0]];

      // Chuyển đổi dữ liệu từ sheet thành JSON object
      const jsonData = xlsx.utils.sheet_to_json(firstSheet);

      // In ra dữ liệu đọc được từ file Excel
      // console.log(jsonData);
      res.send(jsonData);
    } catch {
      res.status(400).json({
        message: "File not found",
      });
    }
  }

  async getAllUser(req, res) {
    const result = await actionService.getAllUser();
    res.status(result.statusCode).json(result.users);
  }
}

module.exports = new ActionController();

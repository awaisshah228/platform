"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imageCtrl = {
    uploadImage: (req, res) => {
        // console.log(req.body)
        // console.log(req.file)
        var _a;
        res.json({ path: (_a = req.file) === null || _a === void 0 ? void 0 : _a.location });
    }
};
exports.default = imageCtrl;

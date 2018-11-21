"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database_1 = require("./database");
const user_model_1 = require("./models/user-model");
const hostname = 'localhost';
const port = 3000;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
// initiate connection to db
const mysequelize = database_1.sequelize;
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
server.get('/getUser', (req, res, next) => {
    user_model_1.User.findAll().then((data) => {
        return res.json(data);
    }).catch((err) => {
        console.log(err);
        return err;
    });
});
server.get('/getUserId/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const loc = yield user_model_1.User.find({
            where: {
                id: req.params['id']
            }
        });
        res.json(loc);
    }
    catch (e) {
        next(e);
    }
}));
server.post('/createUser', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log('yes');
    console.log(req.body);
    console.log(req.query);
    try {
        const fb = yield user_model_1.User.create(req.body);
        res.status(200).send(fb);
    }
    catch (e) {
        next(e);
    }
}));
server.post('/deleteUser/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.params['id']);
    try {
        yield user_model_1.User.destroy({
            where: {
                id: req.params['id']
            }
        });
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
}));
server.put('/updateUser/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.params['id']);
    console.log(typeof (req.body));
    console.log(JSON.stringify(req.body));
    try {
        yield user_model_1.User.update(req.body, {
            where: {
                id: req.params['id']
            }
        });
        res.sendStatus(200);
    }
    catch (e) {
        next(e);
    }
}));
//# sourceMappingURL=server.js.map
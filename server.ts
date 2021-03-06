import { verifyToken } from './token-check';
import * as express from 'express';
import { sequelize } from './database';
import { User } from './models/user-model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { supertoken } from './key-file';

const hostname = 'localhost';
const port     = 3000;

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


// initiate connection to db
const mysequelize = sequelize;

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.post('/login',(req, res, next) => { 
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    const users = {
        username: 'mani',
        password: ''
    }
    jwt.sign({users}, supertoken.secret, (err, token) => {
        if( err ) {
            res.sendStatus(403);
        }
        else {
            res.json({
                token            
            })
        }
    });
})
server.get('/getUser', verifyToken, (req, res, next) => {
    jwt.verify(req.token, supertoken.secret, (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else {
            res.json({
                message: 'get User updated',
                authData
            })

        }
    })
    User.findAll().then((data) => {
        return res.json(data);
    }).catch((err) => {
        console.log(err);
        return err;
    });
});

server.get('/getUserId/:id', async (req, res, next) => {
    try {
      const loc = await User.find({
        where: {
          id: req.params['id']
          }
      });
      res.json(loc);
    } catch (e) {
      next(e);
    }
});

server.post('/createUser', async (req, res, next) => {
    console.log('yes');
    console.log(req.body);
    console.log(req.query)
    try {
        const fb = await User.create(req.body);
        res.status(200).send(fb);
    } catch (e) {
        next(e);
    }
});

server.post('/deleteUser/:id', async (req, res, next) => {
    console.log(req.params['id']);
    try {
        await User.destroy({
          where: {
            id: req.params['id']
            }
        });
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
});

server.put('/updateUser/:id', async (req, res, next) => {
    console.log(req.params['id']);
    console.log(typeof(req.body));
    console.log(JSON.stringify(req.body));
    try {
        await User.update<User>(req.body, {
          where: {
            id: req.params['id']
            }
        });
        res.sendStatus(200);
    } catch (e) {
        next(e);
    }
})
import {db} from '../connect.js'
import jwt from 'jsonwebtoken';
import moment from 'moment'


export const getPosts = (req, res) => {
    console.log('check COOKIE : ', req)
    const token = req.cookies.accessToken
    // Check if token exists
    if(!token) return res.status(401).json("Not logged in")
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json('Token is not valid')
        
        //MYSQL FETCH ALL POSTS OF AN USER
        const q = `SELECT p.*,  u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationship AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =? ORDER BY p.createdAt DESC`;
        
        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if(err) return res.status(500).json(err)
            console.log(q, ' ', err)
            console.log(typeof(data), ' data --> ', data)
            return res.status(200).json(data)
        })
    })
}

export const addPost = (req, res) => {
    console.log(req.body)
    const token = req.cookies.accessToken
    // Check if token exists
    if(!token) return res.status(401).json("Not logged in")
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if(err) return res.status(403).json('Token is not valid')
        
        //MYSQL FETCH ALL POSTS OF AN USER
        const q = "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`, `type`, `age`, `city`, `topClass`, `zone`, `title`) VALUES (?)";

        const values = [
            req.body.desc,
            req.body.img,
            userInfo.id,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            req.body.type,
            req.body.age,
            req.body.city,
            req.body.topClass,
            req.body.zone,
            req.body.title
        ]
        
        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)
            console.log(q, ' ', err)
            console.log(typeof(data), ' data --> ', data)
            return res.status(200).json("Post has been created")
        })
    })
}
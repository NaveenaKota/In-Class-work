let hieghstId = 3;
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const { db, isConnected } = require('./mongo');

const collection = db.db("classTasks").collection("users");

const list = [
    {
        firstName: 'Naveena',
        lastName: 'Kota',
        handle: 'naveena',
        password: 'password',
        email: 'naveenakota14@gmail.com',
        pic: 'https://randomuser.me/api/portraits/men/1.jpg',
        id: 1,
    },
    {
        firstName: 'Yash',
        lastName: 'Ghatge',
        handle: '@yash',
        password: 'password',
        email: 'yash14@gmail.com',
        pic: 'https://randomuser.me/api/portraits/men/2.jpg',
        id: 2,
    },
    {
        firstName: 'Bharath',
        lastName: 'Rongali',
        handle: '@nBharath',
        password: 'password',
        email: 'rss14@gmail.com',
        pic: 'https://randomuser.me/api/portraits/men/3.jpg',
        id: 3,
    },

];

async function get (id){
    const user = await collection.findOne({ _id: id});

    return { ...user, password: undefined };
}

async function remove(id){
    const user = await collection.findOneAndDelete({ _id: id});

    return { ...user.value, password: undefined};
}

async function update(id, newUser){
    const index = list.findIndex(user => user.id === parseInt(id));
    const oldUser = list[index];

    if(newUser.password){
        newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    newUser = list[index] = { ...oldUser, ...newUser };

    console.log(newUser);

    return { ...newUser, password: undefined};
}

async function login(email, password){
    const user = list.find(user => user.email == email);
    if (!user){
        throw { statusCode: 404, message: 'User not found'};
    }
    if (!await bcrypt.compare(password, user.password)){
        throw { statusCode: 401, message: 'Invalid password'};
    }
    const data = {...user, password: undefined};
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return {...data, token};
}

async function fromToken(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
            if(err){
                reject(err);
            }
            else{
                resolve(decoded);
            }
        });
    });
}

function seed(){
    return collection.insertMany(list);
}

module.exports = {
    collection,
    seed,
    async create(user) {
        user.id = ++hieghstId;

        user.password = await bcrypt.hash(user.password, +process.env.SALT_ROUNDS);
        console.log(user);

        list.push(user);
        return { ...user, password: undefined};
    },
    remove,
    update,
    async getList(){
        return (await collection.find().toArray()).map(x=> ({...x, password: undefined }) );
    }
}

module.exports.get = get;
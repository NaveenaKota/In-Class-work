let hieghstId = 3;
const bcrypt = require ('bcrypt');

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

function get (id){
    return { ...list.find(user => user.id === parseInt(id)), password: undefined };
}

function remove(id){
    const index = list.findIndex(user => user.id === parseInt(id));
    const user = list.splice(index,1);

    return { ...user[0], password: undefined};
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


module.exports = {
    async create(user) {
        user.id = ++hieghstId;

        user.password = await bcrypt.hash(user.password, +process.env.SALT_ROUNDS);
        console.log(user);

        list.push(user);
        return { ...user, password: undefined};
    },
    remove,
    update,
    get list(){
        return list.map(x=> ({...x, password: undefined }) );
    }
}

module.exports.get = get;
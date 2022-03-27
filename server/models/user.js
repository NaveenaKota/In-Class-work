let hieghstId = 3;

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
    return list.find(user => user.id === parseInt(id));
}

module.exports = {
    create(user) {
        user.id = ++hieghstId;

        list.push(user);
        return user;
    }
}

module.exports.list = list;
module.exports.get = get;
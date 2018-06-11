const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

    var testusers;

    beforeEach(() => {
        testUsers = new Users();
        testUsers.users = [
            {
                id:'1',
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id:'2',
                name: 'Dave',
                room: 'Python Course'
            },
            {
                id:'3',
                name: 'Bill',
                room: 'Node Course'
            }
        ]

    });
    
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '1', 
            name :'1', 
            room: '1'
        };

        var rtnUser= users.addUser(user.id, user.name, user.room);

        expect(users.users.length == 1).toBeTruthy();
        expect(rtnUser.id).toEqual('1');
    });

    it('should remove a user', () => {  
        var userId = 1;     
        testUsers.removeUser(userId);
        expect(testUsers.users.length).toBe(2);
    });

    it('it should not remove user', () => {
        var userId = '9';
        testUsers.removeUser(userId);
        expect(testUsers.users.length).toBe(3);
    })

    it('Should return names for node course', () => {
        var userList = testUsers.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Bill']);
    });

    it('should find user', () => {
        var userId = '2';
        var user = testUsers.getUser(userId);
        console.log(user);
        expect(user.id).toBe(userId);
    })

    //it('should return nmaes')
});
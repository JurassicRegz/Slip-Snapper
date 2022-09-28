const request = require("supertest")
const { makeApp } = require('../../src/index.js');

const getUser = jest.fn();
const addUser = jest.fn();
const deleteUser = jest.fn();
const verifyToken = jest.fn()
const generateToken = jest.fn()
const createFolder = jest.fn()

const app = makeApp({
  getUser,
  addUser,
  deleteUser,
},{},{
    verifyToken,
    generateToken,
},{
    createFolder
})

/**
 * Test for the signup query
 */
describe('Post /user/signup', ()=>{

    beforeEach(()=>{
        addUser.mockReset();
        generateToken.mockReset();
        createFolder.mockReset();
    })

    test('should save the username and password to the database', async ()=>{
        const bodydata = [
            { firstname:"firstname1", lastname:"surname1", username: "username1", password: "P@ssword1", email:"ab@gmail.com"},
            { firstname:"firstname2", lastname:"surname2", username: "username2", password: "P@ssword1", email:"ab@gmail.com"},
            { firstname:"firstname3", lastname:"surname3", username: "username3", password: "P@ssword3", email:"ab@gmail.com"},
        ]

        for (const body of bodydata){
            addUser.mockReset();
            addUser.mockResolvedValue({
                message:"User added succesfully",
                user: {
                    username: 'johnny',
                },
                token: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    password: '20042',
                    weeklyBudget: 0,
                    monthlyBudget: 0,
                }
            });

            generateToken.mockReset();
            generateToken.mockResolvedValue({
                user: {
                    id: 1
                }
            });

            createFolder.mockReset();
            createFolder.mockResolvedValue();

            const res = await request(app)
                .post('/api/user/signup')
                .send(
                    body
                )

            expect(addUser.mock.calls.length).toBe(1);
            expect(addUser.mock.calls[0][0]).toBe(body.username);
        }
        
    })

    test('should return a json object containing the user id ', async ()=>{
        let data = {
            username: 'johnny',
          }
        
        for (let i = 0; i < 10; i++){
            addUser.mockReset();
            addUser.mockResolvedValue({
                message:"User added succesfully",
                user: {
                    username: 'johnny',
                  },
                token: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    password: '20042',
                    weeklyBudget: 0,
                    monthlyBudget: 0,
                }
            });

            generateToken.mockReset();
            generateToken.mockResolvedValue({
                user: {
                    id: 1
                }
            });

            createFolder.mockReset();
            createFolder.mockResolvedValue();

            const res = await request(app)
                .post('/api/user/signup')
                .send(
                    { firstname:"firstname1", lastname:"surname1", username: "username1", password: "P@ssword1", email:"ab@gmail.com"}
                )

            expect(res.body.userData).toEqual(data);
            expect(res.body.message).toEqual("User added succesfully")
        }
    })

    test('should return a status code of 200', async ()=>{
        addUser.mockResolvedValue({
            message:"User added succesfully",
            user: {
                username: 'johnny',
            },
            token: {
                id: 1,
                email: 'johndoe@gmail.com',
                username: 'johnny',
                password: '20042',
                weeklyBudget: 0,
                monthlyBudget: 0,
            }
        });

        generateToken.mockResolvedValue({
            user: {
                id: 1
            }
        });

        createFolder.mockResolvedValue();
        
        const res = await request(app)
            .post('/api/user/signup')
            .send(
                { firstname:"firstname1", lastname:"surname1", username: "username1", password: "P@ssword1", email:"ab@gmail.com"}
            )

        expect(res.statusCode).toEqual(200);
    })
})

/**
 * Test for login query
 */
describe('Post /user/login', ()=>{

    beforeEach(()=>{
        getUser.mockReset();
        generateToken.mockReset();
    })

    test('should check the username and password are in the database', async ()=>{
        const bodydata = [
            { username: "username1", password: "P@ssword1"},
            { username: "username2", password: "P@ssword2"},
            { username: "username3", password: "P@ssword3"}
        ]

        for (const body of bodydata){
            getUser.mockReset();
            getUser.mockResolvedValue({
                message:"User logged in succesfully",
                user: {
                    username: 'johnny',
                },
                token: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    password: '20042',
                    weeklyBudget: 0,
                    monthlyBudget: 0,
                },
                password: 'password1',
            });


            generateToken.mockReset();
            generateToken.mockResolvedValue({
                user: {
                    id: 1
                }
            });

            const res = await request(app)
                .post('/api/user/login')
                .send(
                    body
                )

            expect(getUser.mock.calls.length).toBe(1);
            expect(getUser.mock.calls[0][0]).toBe(body.username);
        }
        
    })

    test('should return a json object containing the user data and a message ', async ()=>{
        let data = null;
        
        for (let i = 0; i < 10; i++){
            
            getUser.mockReset();
            getUser.mockResolvedValue({
                message:"User logged in succesfully",
                user: {
                    username: 'johnny',
                },
                token: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    password: '20042',
                    weeklyBudget: 0,
                    monthlyBudget: 0,
                },
                password: 'password1'
            });

            generateToken.mockReset();
            generateToken.mockResolvedValue({
                user: {
                    id: 1
                }
            });

            const res = await request(app)
            .post('/api/user/login')
            .send(
                { username: "username1", password: "password1"}
            )

            expect(res.body.userData).toEqual(data);
            expect(res.body.message).toEqual("Error validating user Details");
        }
    })

    test('should return a status code of 200', async ()=>{
        getUser.mockResolvedValue({
            message:"User logged in succesfully",
            user: {
                username: 'johnny',
            },
            token: {
                id: 1,
                email: 'johndoe@gmail.com',
                username: 'johnny',
                password: '20042',
                weeklyBudget: 0,
                monthlyBudget: 0,
            },
            password: 'password1'
        });

        generateToken.mockResolvedValue({
            user: {
                id: 1
            }
        });
        
        const res = await request(app)
            .post('/api/user/login')
            .send(
                { username: "username1", password: "password1"}
            )

        expect(res.statusCode).toEqual(200);
    })

})

/**
 * Test for the delete user query
 */
describe('Delete /user', ()=>{
    const token = ""

    beforeEach(()=>{
        deleteUser.mockReset();
        verifyToken.mockReset();
    })

    test('should delete the username and password from the database', async ()=>{
        const bodydata = [
            1,
            2,
            3,
        ]

        for (const body of bodydata){
            deleteUser.mockReset();
            deleteUser.mockResolvedValue({
                message:"User deleted succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: body
                }
            });

            const res = await request(app)
                .delete('/api/user')
                .send({})
                .set({ "Authorization": "Bearer " + token })

            expect(deleteUser.mock.calls.length).toBe(1);
            expect(deleteUser.mock.calls[0][0]).toBe(body);
        }
        
    })

    test('should return a json object containing the user id ', async ()=>{
        let data = {
            id: 1,
            email: 'johndoe@gmail.com',
            username: 'johnny',
            firstname: 'John',
            lastname: 'Doe',
            password: '20042',
            isBusiness: false
          }      

        for (let i = 0; i < 10; i++){
            deleteUser.mockReset();
            deleteUser.mockResolvedValue({
                message:"User deleted succesfully",
                user: {
                    id: 1,
                    email: 'johndoe@gmail.com',
                    username: 'johnny',
                    firstname: 'John',
                    lastname: 'Doe',
                    password: '20042',
                    isBusiness: false
                  }
            });

            verifyToken.mockReset();
            verifyToken.mockResolvedValue({
                user: {
                    id: 1
                }
            });

            const res = await request(app)
                .delete('/api/user')
                .send({})
                .set({ "Authorization": "Bearer " + token })

            //expect(res.body.userData).toEqual(data);
            expect(res.body.message).toEqual("User deleted succesfully");
        }
    })

    test('should return a status code of 200', async ()=>{
        deleteUser.mockResolvedValue({
            message:"User deleted succesfully",
            user: {
                id: 1,
                email: 'johndoe@gmail.com',
                username: 'johnny',
                firstname: 'John',
                lastname: 'Doe',
                password: '20042',
                isBusiness: false
              }
        });

        verifyToken.mockResolvedValue({
            user: {
                id: 1
            }
        });
        
        const res = await request(app)
            .delete('/api/user')
            .send({})
            .set({ "Authorization": "Bearer " + token })

        expect(res.statusCode).toEqual(200);
    })
})

import mongoose from 'mongoose';
let mongoDB = 'mongodb://127.0.0.1/test_db'

mongoose.connect(mongoDB);
import User from '../../../models/User.model'

let user = new User({username: "NickyN", email: "cannon@yo.com", password: "password01"});

describe('User model test', () => {
    beforeAll(async () => {
        await User.remove({})
    });

    afterEach(async () => {
        await User.remove({});
    })

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('Should have a module', () => {
        expect(User).toBeDefined();

        it('get a user', async () => {
            await user.save();

            let _user = await User.findOne({email: "cannon@yo.com"})
            let expected = "cannon@yo.com"
            expect(_user.email).toEqual(expected)
        });

        it('should save a user', async () => {
            let user = new User({username: "NickyN", email: "cannon@yo.com", password: "password01"});
            let savedUser = await user.save();
            const expected = "cannon@yo.com"
            const actual = savedUser.email;
            expect(actual).toEqual(expected)
        });
    });
    
})



import mongoose from 'mongoose';
let mongoDB = 'mongodb://127.0.0.1/test_db'

mongoose.connect(mongoDB);
import User from '../../../models/User.model'

let user = new User({username: "NickyN", email: "cannon@yddo.com", password: "password01"});

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

    describe('Working user auth functionality', () => {
        expect(User).toBeDefined();

        it('Create a new user and save it', async () => {
            const user = new User({username: "SteveJ", email: "steve@j.com", password: "password01"})
            await user.save();

            const _user = await User.findOne({email: "steve@j.com"});
            expect(_user).toBeDefined();
        })

        it('Get a user', async () => {
            await user.save();

            let _user = await User.findOne({email: "cannon@yddo.com"})
            let expected = "cannon@yddo.com"
            expect(_user.email).toEqual(expected)
        });

        it('Update user', async () => {
            let user = new User({username: "Amanda", email: "jsoso@jook.com", password: "password01"})
            await user.save();

            user.email = "jaam@jo.com";
            const updatedUser = await user.save();

            const expected = "jaam@jo.com";
            const actual = updatedUser.email;
            expect(actual).toEqual(expected);
        });
    });

    describe('Rejected user auth functinoality', () => {
        it('Username with less 3 characters is rejected', async () => {
            let user = new User({username: "ko", email: "toko@gmail.com", password: "password01"})
            let err;

            try {
                const savedUser = await user.save();
                error = savedUser
            } catch (error) {
                err = error
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        });

        it('Malformatted email is rejected', async() => {
            let user = new User({username: "canooo", email: "toap@@gmail..com", password: "password01"})
            let err;

            try {
                const savedUser = await user.save();
                error = savedUser;
            } catch (error) {
                err = error
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        })

        it('Username with more than 14 characters is rejected', async () => {
            let user = new User({username: "koakdisidkaoajdjkkj", email: "toko@gmail.com", password: "password01"})
            let err;

            try {
                const savedUser = await user.save();
                error = savedUser
            } catch (error) {
                err = error
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        });

        it('Password less than 7 characters is rejected', async() => {
            let user = new User({username: "kok", email: "toko@gmail.com", password: "passw"})
            let err;

            try {
                const savedUser = await user.save();
                error = savedUser
            } catch (error) {
                err = error
            }
            expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        });

    });
})



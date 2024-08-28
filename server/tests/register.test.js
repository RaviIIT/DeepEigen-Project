const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const userModel = require('../Model/UserModel');
const {registerController} = require('../controller/UserController');

jest.mock('../Model/UserModel');
jest.mock('bcryptjs');

describe('Register Controller Tests', () => {
  let req;
  let res;
  let fakeUser;

  beforeAll(() => {
    // Generate fake email and password once to be reused
    fakeUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  });

  beforeEach(() => {
    req = {
      body: {
        email: fakeUser.email,
        password: fakeUser.password,
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    userModel.findOne.mockResolvedValue(null); // No existing user

    bcrypt.genSalt.mockResolvedValue('mockSalt');
    bcrypt.hash.mockResolvedValue('mockHashedPassword');

    userModel.prototype.save = jest.fn().mockResolvedValue(true);

    await registerController(req, res);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: fakeUser.email });
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(fakeUser.password, 'mockSalt');
    expect(userModel.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Register Sucessfully',
      success: true,
    });
  });

  it('should return 400 if user already exists', async () => {
    userModel.findOne.mockResolvedValue({ email: fakeUser.email }); // User exists

    await registerController(req, res);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: fakeUser.email });
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: 'User Already Exist',
      success: false,
    });
  });

});
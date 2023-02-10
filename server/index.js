import express from 'express';
import mongoose, { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import jwt, { verify } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
config();
const app = express();

import User from './Models/User.js';
import Supplier from './Models/Supplier.js';
import Employee from './Models/Employee.js';

app.use(express.json());
app.use(cors());

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split('Bearer ')[1];
  if (!token) return res.status(401).json();

  try {
    var payload = verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json();
  }
};

app.post('/register-user', async (req, res) => {
  try {
    const { username, password, confirm_password } = req.body;
    if (await User.findOne({ username })) {
      return res
        .status(400)
        .send({ error: 'User with this username already exist' });
    }
    if (password.length < 8) {
      return res.status(400).send({ error: 'Password is too short' });
    }
    if (password !== confirm_password) {
      return res.status(400).send({ error: 'Passwords do not match' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: 'admin',
    });
    await newUser.save();
    res.send({ success: 'User created' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).populate('employee_id');
    if (!user) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    if (
      user.role === 'employee' &&
      user.employee_id.dateOfCancellation !== null &&
      user.employee_id.dateOfCancellation !== undefined
    ) {
      return res
        .status(401)
        .send({ error: 'Your employment has been terminated' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.patch('/change-password', async (req, res) => {
  const { _id, oldPassword, newPassword, repeatPassword } = req.body;
  if (oldPassword === newPassword) {
    return res.status(400).send({ error: 'You entered the same password' });
  }
  if (newPassword !== repeatPassword) {
    return res.status(400).send({ error: 'Passwords do not match' });
  }
  try {
    const user = await User.findById(_id);
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ error: 'Password is incorrect' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(_id, {
      password: hashedPassword,
    });
    res.send({ message: 'Password changed' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/add-employee', async (req, res) => {
  try {
    const employeeData = { ...req.body };
    delete employeeData.username;
    delete employeeData.password;

    const employee = await Employee.create(employeeData);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      employee_id: employee._id,
      username: req.body.username,
      password: hashedPassword,
      role: 'employee',
    };

    await User.create(userData);
    res.send({ message: 'Employee and User added' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/get-employee', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.patch('/update-employee', async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    await Employee.findOneAndUpdate({ _id }, { $set: updateData });
    res.send({ message: 'Employee updated' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/get-suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.send(suppliers);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/add-supplier', async (req, res) => {
  try {
    const supplier = req.body;
    await Supplier.create(supplier);
    res.send({ message: 'Supplier added' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.patch('/update-supplier', async (req, res) => {
  try {
    const { _id, ...updateData } = req.body;
    await Supplier.findOneAndUpdate({ _id }, { $set: updateData });
    res.send({ message: 'Supplier updated' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('employee_id');
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

mongoose.set('strictQuery', false);
connect(process.env.MONGODB_URL, { useNewUrlParser: true }).then(() => {
  console.log('Server started');
  app.listen(5000);
});

const User = require("../models/User");
const Company = require("../models/Company");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    //1 check if the user already exists
    if (user) {
      return res.status(400).json([{ msg: "this email already exists" }]);
    }
    //2create a new user
    user = new User({ name, lastName, email, password });
    //3 hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //4 save the new user
    await user.save();
    //5 login the user {token ou bien jeton}
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.SECRET);
    //6 send {token,user}

    res.send({
      token,
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    //1check if the user exists
    if (!user) {
      return res.status(400).json({ msg: "bad credentials" });
    }
    //2 compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "bad credentials" });
    }
    //3 sign in the user (token)
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.SECRET);
    //6 send {token,user}

    res.send({
      token,
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getAuthUser = (req, res) => {
  res.send(req.user);
};

const addSkill = async (req, res) => {
  try {
    const userID = req.user._id;

    const added_skill = await User.findByIdAndUpdate(
      { _id: userID },
      { $push: { skills: req.body.skills } },
      { new: true }
    );

    res.send(added_skill);
  } catch (error ) {
    res.json({msg:error.message})
  }
};

const registerCom = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let company = await Company.findOne({ email });
    //1 check if the company already exists
    if (company) {
      return res.status(400).json([{ msg: "this email already exists" }]);
    }
    //2create a new company
    company = new Company({ name, email, password });
    //3 hash the password
    const salt = await bcrypt.genSalt(10);
    company.password = await bcrypt.hash(password, salt);

    //4 save the new company
    await company.save();
    //5 login the user {token ou bien jeton}
    const payload = { companyId: company._id };
    const token = jwt.sign(payload, process.env.SECRET);
    //6 send {token,user}

    res.send({
      token,
      company: {
        name: company.name,
        
        email: company.email,
        password: company.password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const loginCom = async (req, res) => {
  const { email, password } = req.body;
  try {
    let company = await Company.findOne({ email });
    //1check if the user exists
    if (!company) {
      return res.status(400).json({ msg: "bad credentials" });
    }
    //2 compare the password
    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "bad credentials" });
    }
    //3 sign in the user (token)
    const payload = { companyId: company._id };
    const token = jwt.sign(payload, process.env.SECRET);
    //6 send {token,user}

    res.send({
      token,
      company: {
        name: company.name,
       
        email: company.email,
        password: company.password,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getAuthCompany = (req, res) => {
  res.send(req.company);
};
module.exports = { register, login, getAuthUser, addSkill, registerCom, loginCom, getAuthCompany };

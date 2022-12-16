const userModel = require("../model/userModel");

const getAllUsers = async(req,res) => {
    const users = await userModel.getAllUsers();
    users.map(user => {
        //remove password property for user items
        delete user.password;
        return user
    });
    res.json(users);
}
const getTeacherList = async (req,res) => {
    const users = await userModel.getTeacherList();
    res.json(users);
};

const getStudentList = async (req,res) => {
    const students = await userModel.getStudentList();
    res.json(students);
}

// const createUser = async (req, res) => {
//     const newUser = req.body;
//     const result = await userModel.addUser(newUser, res);
//     res.json(result);
// };

// const createStudent = async (req, res) => {
//     const newStudent = req.body;
//     const result = await userModel.addStudent(newStudent, res);
//     res.json(result);
// };

const checkToken = (req, res) => {
    
    res.json({user: req.user});
};
const getParentList = async (req,res) => {
    const users = await userModel.getParentList();
    res.json(users);
};

module.exports ={
    getAllUsers,
    getTeacherList,
    getStudentList,
    checkToken,
    getParentList,
};
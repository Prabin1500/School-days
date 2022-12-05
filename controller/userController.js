const userModel = require("../model/userModel");

const getAllUsers = async(req,res) => {
    const users = await userModel.getAllUsers();
    users.map(user => {
        //remove password property for user items
        delete user.PASSWORD;
        return user
    });
    res.json(users);
}
const getTeacherList = async(req,res) => {
    const users = await userModel.getTeacherList();
    res.json(users);
}
module.exports ={
    getAllUsers,
    getTeacherList,
};
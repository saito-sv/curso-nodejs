import User from "../models/user.js";

export const getUser = (req, res) => {};

export const updateUser = (req, res) => {};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = User.deleteById(req.params.id);
        return res.send({ status: "succces", deletedUser: deletedUser });
    } catch {
        return res.send({ status: "error", message: "something went wrong" });
    }
};

export default {getUser, updateUser, deleteUser}
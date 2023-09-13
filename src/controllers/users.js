import { asyncHandler } from "../middlewares/asyncHandler.js";
import { UsersService } from "../services/users.js"
import { Message } from "../constants/index.js";

export class UsersController {
    usersService = new UsersService()

    signup = asyncHandler(async (req, res, next)=>{
        const { nickname, password, confirm } = req.body;

        await this.usersService.createUser(nickname, password);

        return res.status(201).json({ message: Message.SIGNUP_SUCCEED }); 
    });

    login = asyncHandler(async (req, res, next)=>{
        const { nickname, password } = req.body;
        
        const token =await this.usersService.getUser(nickname, password);
        res.cookie("Authorization", `Bearer ${token}`);
        
        return res.status(200).json({ message: Message.LOGIN_SUCCEED });
    });
}
import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../Config/envVars.js'

export const generatetokenAndSetCookie = (userId, res)=> {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "15d"})
    res.cookie("jwt-netflix", token, {maxAge: 15 * 24 *60*60*60*1000, httpOnly:true, sameSite:'strict', secure:ENV_VARS.NODE_ENV !=='development'})
    return token
}
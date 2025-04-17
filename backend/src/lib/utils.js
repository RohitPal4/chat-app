import jwt from 'jsonwebtoken';


export const generateToken = (userId, res)=> {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d',
    }
);
    res.cookie("jwt", token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // prevent xss attack cross-site scripting attack
        sameSite: 'strict', // prevent csrf attack cross-site request forgery attack
        secure: process.env.NODE_ENV === 'production', // only set cookie if in production mode
    })

}
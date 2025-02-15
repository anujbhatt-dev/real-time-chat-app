import { Response } from 'express';
import jwt from 'jsonwebtoken';

// Function to generate a JWT token
export const getJWTToken = (userId: string, res: Response): string => {
  const payload = {
    userId, // The unique identifier for the user
  };

  // Generate the JWT token with a secret and an expiry time
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d', // Set expiration time (7 days in this case)
  });

  res.cookie("token",token,{
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    sameSite:"lax",
    secure: process.env.NODE_ENV!="development"
  })
  
  return token;
};

import express, { RequestHandler } from 'express';
import { checkAuth, login, logout, signup, uploadProfile } from '../controllers/auth.controller';
import { protectedRoute } from '../middleware/auth.middleware';

const router = express.Router()

router.post('/signup', signup as RequestHandler)

router.post('/login', login as RequestHandler)

router.post('/logout', logout)

router.put('/update-profle', protectedRoute as RequestHandler , uploadProfile as RequestHandler)

router.get("/check", protectedRoute as RequestHandler, checkAuth)

export default router
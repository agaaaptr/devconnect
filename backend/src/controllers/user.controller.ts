import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                name: true,
                bio: true,
                avatar: true,
                location: true,
                website: true,
                createdAt: true
            }
        });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, username, name, bio, location, website } = req.body;

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                bio,
                location,
                website
            },
            select: {
                id: true,
                email: true,
                username: true,
                name: true,
                bio: true,
                avatar: true,
                location: true,
                website: true,
                createdAt: true
            }
        });

        res.status(201).json(user);
    } catch (error: any) {
        console.error('Error creating user:', error);
        if (error.code === 'P2002') {
            res.status(400).json({ message: 'Email or username already exists' });
        } else {
            res.status(500).json({ message: 'Error creating user' });
        }
    }
};
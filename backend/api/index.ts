import { Request, Response } from 'express';
import app from '../src/app';

export default function handler(req: Request, res: Response) {
    return app(req, res);
}
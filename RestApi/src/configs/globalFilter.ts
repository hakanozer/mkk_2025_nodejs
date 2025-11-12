// global filter configuration file
import express, { NextFunction, Request, Response } from 'express';

export const globalFilter = (req: Request, res: Response, next: NextFunction) => {
    // user agent information logging
    console.log(`User-Agent: ${req.headers['user-agent']}`);
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}
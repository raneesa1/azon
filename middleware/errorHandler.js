import { NextFunction, Request, Response } from "express";

export const errorHandler = (err , req ,res ,next) => {
    res.status(500).json({ message: err.message, status: false });
};
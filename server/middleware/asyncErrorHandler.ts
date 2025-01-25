import { Request, Response, NextFunction } from "express";
/*
 * A simple middleware function to handle async/await errors.
 * It wraps the provided function in a Promise.resolve and catches any thrown errors
 * using the next function.
 *
 * @param func - The async/await function to be wrapped in the middleware.
 * @returns A new middleware function that handles async/await errors.
 */

const asyncErrorHandler = (
  func: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  //Return another async function
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};

export default asyncErrorHandler;

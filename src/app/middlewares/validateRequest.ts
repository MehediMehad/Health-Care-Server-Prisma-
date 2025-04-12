import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      console.log("checker middleware...☑️");
      return next();
    } catch (err) {
      console.log("checker middleware...🟥");
      next(err);
    }
  };

import type { Request, Response, NextFunction } from "express";
export declare function handleUserRegister(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function handleUserLogin(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function handleAuthentication(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function handleUserLogout(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
export declare function handleRefreshToken(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auth.controller.d.ts.map
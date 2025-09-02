import type { Request, Response } from "express";
declare function shortenURI(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
declare function redirector(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export { shortenURI, redirector };
//# sourceMappingURL=shortner.controllers.d.ts.map
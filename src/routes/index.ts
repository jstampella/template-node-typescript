import { Router, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { readdirSync } from 'fs';
import { MyRouter } from '../interfaces/route.interfaces';
/**
 * Este archivo realiza la lectura de la carpeta routes y va devolviendo las rutas de cada archivo
 * ignorando el index.ts
 */
const PATH_ROUTER = `${__dirname}`;
const router: Router = Router();

const cleanFileName = (fileName: string): string => {
  const file = fileName.split('.').shift();
  return file as string;
};

readdirSync(PATH_ROUTER).filter((fileName: string) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== 'index') {
    import(`./${cleanName}`).then((moduleRouter: { default: MyRouter }) => {
      const routeHandler: RequestHandler = asyncHandler(moduleRouter.default.router as RequestHandler);
      router.use(`/${cleanName}`, routeHandler);
    });
  }
});

export default router;

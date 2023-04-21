import bcryptjs from 'bcryptjs';
/**
 * contraseña sin encriptar
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain: string): Promise<string> => {
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
};

/**
 * pasar contraseña sin encriptar
 * @param {*} passwordPlain
 * pasar contraseña encriptada
 * @param {*} hashPassword
 */
const compare = async (passwordPlain: string, hashPassword: string): Promise<boolean> => {
  return await bcryptjs.compare(passwordPlain, hashPassword);
};

export { encrypt, compare };

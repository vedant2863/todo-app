import { Context } from 'hono';
import { verify } from 'hono/jwt';

export const authMiddleware = async (c: Context, next: Function) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Unauthorized' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    c.req.header('userId');
    (decoded as any).id = c.req.header('userId');
    await next();
  } catch (err) {
    return c.json({ message: 'Unauthorized' }, 401);
  }
};

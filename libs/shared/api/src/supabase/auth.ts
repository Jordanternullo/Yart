import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from './client';

export async function auth(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        supabase.auth.api.setAuthCookie(req, res);
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({
            message: `Method ${req.method} Not Allowed`,
        });
    }
}

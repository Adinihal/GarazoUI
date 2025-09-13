import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios.get('../../../public/assets/service-data.json');
    res.status(200).json(response.data.serviceQueue ?? response.data);
  } catch (error: any) {
    console.error('Error fetching service data:', error);
    res.status(500).json({ error: 'Failed to fetch service data' });
  }
}

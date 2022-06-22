import type { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '@/lib/prisma';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method === 'GET') {
    if (req.query.id || req.query.gatewayId) {
      const peripheral = await prisma.peripheral.findFirst({
        where: {
          ... req.query.id && { id: parseInt(req.query.id as string, 10), },
          ...req.query.gatewayId && {
            gateway: {
              id: parseInt(req.query.gatewayId as string, 10),
            },
          }
        },
      })
      return res.status(200).json({ ok: true, peripheral });
    }

    const peripherals = await prisma.peripheral.findMany({
      
    });
    return res.status(200).json({ ok: true, peripherals });  
  }

  if (req.method === 'POST') {
    try {
      const { 
        uid,
          vendor,
          status,
        gatewayId } = req.body
      const gateway = await prisma.gateway.findFirst({
        where: { id: gatewayId },
        include: {peripherals: true},
      })
      if (gateway) {
        if (gateway.peripherals.length < 10) {
          
          const found = await prisma.peripheral.findFirst({
            select: { id: true },
            where: {uid: parseInt(uid,10)},
          });
          if (!found) {        
            let r = await prisma.peripheral.create({
              data: {
                uid: parseInt(uid, 10),
                vendor,
                status,
                gateway: {
                  connect: {
                    id: gatewayId,
                  },
                },
                
              }
            });
            return res.status(201).json({ ok: true, r });
          }
          else return res.status(200).json({ ok: false, error: 'Already Exist' });
        }
        else return res.status(200).json({ ok: false, error: 'Gateway already has 10 Peripherals' });
      }
      else return res.status(200).json({ ok: false, error: 'Gateway Not Found' });
    }
    catch (error) {
      console.error(JSON.stringify(error))
      return res.status(500).json({ ok: false, error: "Server Error" });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      let peripheral = await prisma.peripheral.delete({
        where: {
          id: parseInt(id as string, 10),
        }
      });
      return res.status(200).json({ ok: true, peripheral });
    }
    catch (error) {
      return res.status(500).json({ ok: false, error: 'Server Error' });
    }
  }

  
}

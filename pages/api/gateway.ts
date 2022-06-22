
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from '@/lib/prisma';
import Tools from '@/lib/tools';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method === 'GET') {
    const id = parseInt(req.query.id as string, 10)
    if (id) {
      const gateway = await prisma.gateway.findFirst({
        where: { id },
        include: {peripherals: true},
      })
      return res.status(200).json({ ok: true, gateway });
    }

    const gateways = await prisma.gateway.findMany({
      include: {peripherals: true},
      
    });
    // console.log(gateways)
    return res.status(200).json({ ok: true, gateways });  
  }
  if (req.method === 'POST') {
    try {
      const { serial,
        name,
        ipv4 } = req.body
      
      let found = await prisma.gateway.findFirst({
        where: {
          serial
        },
        select: { id: true},
      });

      if (!found) {debugger;
        let { alive } = await Tools.PING(ipv4, 3);
        if (alive) {
          
          let r = await prisma.gateway.create({
            data: {
              serial,
              name,
              ipv4,
            }
          });
          return res.status(201).json({ ok: true, r });
          
        }
        else
          return res.status(200).json({ ok: false, error: 'Unreachable IP addresses' });
        
      }
      else return res.status(200).json({ ok: false, error:'Already Exist' }); 
    }
    catch (error) {
      return res.status(500).json({ ok: false, error: 'Server Error' });
    }
  } 
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const deletePeripherals = prisma.peripheral.deleteMany({
        where: {
          gatewayId: parseInt(id as string, 10),
        },
      })
      
      const deleteGateway = prisma.gateway.delete({
        where: {
          id: parseInt(id as string, 10),
        },
      })
      
      const transaction = await prisma.$transaction([deletePeripherals, deleteGateway])
//console.log(transaction)
      return res.status(200).json({ ok: true, transaction });
    }
    catch (error) {
      return res.status(500).json({ ok: false, error: 'Server Error' });
    }
  }

  
}

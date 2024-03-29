
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from './list.module.css'
import SimpleLayout from '../../src/components/layouts/SimpleLayout';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { GetStaticProps, GetServerSideProps } from 'next';
import { Gateway, Peripheral } from '.prisma/client';
import {prisma} from '@/lib/prisma';
import { useQuery } from 'react-query';
// import { useSession } from 'next-auth/client';
import { BsPlus,BsTrash, BsEye, BsCollection} from 'react-icons/bs'

type GatewayWithPeripheral = Gateway & {
  peripherals: Peripheral[];
};

const fetchGateway = async (id: number) => {
  let rul = `/api/gateway?id=${id}`;
  let q = await fetch(rul);
  const res = await q.json();
  return res;
};

export default function Detail() {

  // const session = useSession();
  const router = useRouter();
  
  const [gateway, setGateway] = useState<GatewayWithPeripheral>();
  const [peripherals, setPeripherals] = useState<Peripheral[]>([]);
  
  useEffect(() => {
    const getGateway = async () => {
      let res = await fetchGateway(parseInt(router.query.id as string, 10));
      if (res.ok) {
        setGateway(res.gateway);
        setPeripherals(res.gateway.peripherals);
      }
    }
    getGateway();
  },[router.query.id]);
  
  const addPeripheral = (gatewayId: string) => {
    router.push(`/peripheral/create/${gatewayId}`);
  };

  const peripheralDetail = (id: number) => {
    router.push(`/peripheral/${id}`);
  };

  const peripheralDelete = async (id: number) => {
    let q = await fetch(`/api/peripheral?id=${id}`, {
      method: 'DELETE',
    });
    let res = await q.json();
    if (res.ok) {
      const idx = peripherals.findIndex((p) => p.id == id);
      const pfs = peripherals?.filter((p) => p.id !== id);
      
      gateway!.peripherals.splice(idx, 1);
      setGateway(gateway);
      //, peripherals: pfs 
      setPeripherals(pfs);
    }
    else if (res.error) {
      alert(res.error);
    }
  };
  
  
  console.log(peripherals)
  return (
    <SimpleLayout title={`Gateway ${ gateway && gateway.name }`}>
        <div className={styles.container}>
      <Head>
          <title>Gateway { gateway && gateway.name }</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <Button variant="success" onClick={ addGateway}><BsPlus/></Button> */}
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>Serial No.</th>
      <th>Name</th>
              <th>IPV4</th>
              {/* <th>Actions</th> */}
    </tr>
  </thead>
  <tbody>
            {gateway && (
              <tr>
                <td>{gateway.serial}</td>
                <td>{gateway.name}</td>
                <td>{gateway.ipv4}</td> 
                {/*<td><ButtonGroup size="sm">
                 <Button title="Detail"><BsEye/></Button>
                  <Button title="Delete" variant="warning"><BsTrash /></Button>
    
                  <Button title="Add Peripherals" variant="success" onClick={ addPeripheral}><BsPlus/></Button>
                </ButtonGroup>
                </td>*/}
              </tr>

            )}
  </tbody>
        </Table>
        {/* uid          Int       @unique()
  // i guess it is unique

  vendor       String
  
  status       Boolean   
  // true -> online, false -> offline */}

        <h3>Peripherals</h3>
        {peripherals && peripherals.length < 10 && <Button title="Add Peripherals" variant="success" onClick={() => addPeripheral(router.query.id as string)}><BsPlus /> Peripheral</Button>}
  
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>UID</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {peripherals && peripherals.map((p) => <tr key={p.id}>
                  <td>{p.uid}</td>
                  <td>{p.vendor}</td>
              <td className={p.status ? `bg-success text-white`: `bg-danger text-white`  }>{p.status ? "Online" : "Offline"}</td>
              <td>{ new Date(p.createdAt).toUTCString()}</td>
              <td><ButtonGroup size="sm">
                <Button title="Detail" onClick={() => peripheralDetail(p.id)}><BsEye/></Button>
                  <Button title="Delete" onClick={() => peripheralDelete(p.id)} variant="warning"><BsTrash /></Button>
                  </ButtonGroup>
                  </td>
                </tr>)}
          </tbody>
        </Table>
      

     
    </div>
  
    </SimpleLayout>
    )
}

/* const getGateways = async () => {
  
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery('WORKS', getWorks);
  console.log(ctx);
  const { query } = ctx;
  const gateway = await prisma.gateway.findFirst({
    select: {
      serial: true,
      name: true,
      ipv4: true,
    },
    where: {
      id: parseInt(query.id as  string,10),     
   }
  });
  
  return {
    props: {
      gateway,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};
 */

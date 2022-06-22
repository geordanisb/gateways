
import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from './list.module.css'
import SimpleLayout from '../../src/components/layouts/SimpleLayout';
import { Table, Button, ButtonGroup } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { GetStaticProps, GetServerSideProps } from 'next';
import Link  from 'next/link';
import { Peripheral } from '.prisma/client';
import {prisma} from '@/lib/prisma';
import { useQuery } from 'react-query';
// import { useSession } from 'next-auth/client';
import { BsPlus,BsTrash, BsEye, BsCollection} from 'react-icons/bs'

const fetchPeripherals = async (id: number) => {
  let rul = `/api/peripheral`;
  let q = await fetch(rul);
  const res = await q.json();
  return res;
};

export default function Detail() {

  const router = useRouter();
  
  const [peripherals, setPeripherals] = useState<Peripheral[]>([]);
  
  useEffect(() => {
    
    const getPeripherals = async () => {
      let res = await fetchPeripherals(parseInt(router.query.id as string, 10));
      if (res.ok) {
        setPeripherals(res.peripherals);
      }
    }
    getPeripherals();
  },[router.query.id]);
  
  
  const peripheralDetail = (id: number) => {
    router.push(`/peripheral/${id}`);
  };

  const peripheralDelete = async (id: number) => {
    let q = await fetch(`/api/peripheral?id=${id}`, {
      method: 'DELETE',
    });
    let res = await q.json();
    if (res.ok) {
      const pfs = peripherals?.filter((p) => p.id !== id);     
      setPeripherals(pfs);
    }
    else if (res.error) {
      alert(res.error);
    }
  };
  
  return (
    <SimpleLayout title={`Peripherals`}>
        <div className={styles.container}>
      <Head>
          <title>Peripherals</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* <Button variant="success" onClick={ addGateway}><BsPlus/></Button> */}
      
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>UID</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Created At (UTC)</th>
              <th>Gateway</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {peripherals && peripherals.map((p) => <tr key={p.id}>
                  <td>{p.uid}</td>
                  <td>{p.vendor}</td>
              <td className={p.status ? `bg-success text-white`: `bg-danger text-white`  }>{p.status ? "Online" : "Offline"}</td>
              <td>{new Date(p.createdAt).toUTCString()}</td>
              <td style={{cursor:"pointer"}}>
                <Link href={`/gateway/${p.gatewayId}`}>
                  <a>{p.gatewayId}</a>
                </Link>
              </td>
              <td><ButtonGroup size="sm">
                <Button title="Detail" onClick={() => peripheralDetail(p.id)}><BsEye /></Button>
                {/* session && */ <Button title="Delete" onClick={() => peripheralDelete(p.id)} variant="warning"><BsTrash /></Button>}
              </ButtonGroup>
              </td>
                </tr>)}
          </tbody>
        </Table>
      

     
    </div>
  
    </SimpleLayout>
    )
}
import {  Form, Button } from 'react-bootstrap';
import { GetStaticProps, NextPage } from 'next';
import SimpleLayout from '../../src/components/layouts/SimpleLayout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GatewayCreate } from '../../src/types';
import { FormEvent } from 'react';
import {toast} from 'react-hot-toast'

const CreateGateway: NextPage = () => {
  const router = useRouter();
  
const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
  ev.preventDefault();
  try {
    
    const form = ev.currentTarget;
    const payload: GatewayCreate = {
      serial: form.serial.value,
      name: form.nameG.value,
      ipv4: form.ipv4.value,
    };
    // let pingRes = Tools.PING(payload.ipv4);
    // if (!pingRes)
    //   alert('Unreachable IP ' + payload.ipv4);
    
    // const valid = payload.ipv4.match('^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])\\.([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$')
    // if (!valid) {
    //   ev.stopPropagation();
    //   alert('Invalid IP address')
    // }
    // else {
      
      const q = await fetch('/api/gateway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }); 
      let res = await q.json();
      if (res.ok)
        await router.push('/gateway/list');
      else toast.error(JSON.stringify(res?.error))
    // }
    
  }
  catch (error) {
    console.error(error);
  }
  
};

    return (
      /*uid:          number;
vendor: string;  
status: boolean;
gatewayId: number;    */
      <SimpleLayout title="Create Gateway">
        <Form onSubmit={handleSubmit}>
        <Form.Group controlId="serial">
    <Form.Label>Serial</Form.Label>
    <Form.Control type="text" placeholder="" required />   
          </Form.Group>
          
          <Form.Group controlId="nameG">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="" />   
          </Form.Group>
          

          <Form.Group controlId="ipv4">
    <Form.Label>IPv4</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=""
              pattern="\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"              
            />
  </Form.Group>
          <Button variant="success" type="submit">
    Submit
  </Button>
</Form>
    </SimpleLayout>
  );
};

export default CreateGateway;


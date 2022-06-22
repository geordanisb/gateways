import {  Form, Button } from 'react-bootstrap';
import { GetStaticProps, NextPage } from 'next';
import SimpleLayout from '../../../src/components/layouts/SimpleLayout';
import { useRouter } from 'next/router';
import { PeripheralCreate } from '../../../src/types';
import { FormEvent } from 'react';


const CreateGateway: NextPage = () => {
  const router = useRouter();
  
  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      
      const form = ev.currentTarget;
      const payload: PeripheralCreate = {
        uid: form.uid.value,
        vendor: form.vendor.value,
        status: form.status.checked,
        gatewayId: parseInt(router.query.gatewayId as string, 10)
      };
      
      const q = await fetch('/api/peripheral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }); 
      let res = await q.json();
      if (res.ok)
        await router.push(`/gateway/${router.query.gatewayId}`);
      else alert(JSON.stringify(res?.error));
      
    }
    catch (error) {
      console.error(error);
    }
    
  };
  // if (!router.query.gatewayId)
    // router.push('/');
    return (
      
    <SimpleLayout title={`Create Peripheral to Gateway: ${router?.query?.gatewayId}`}>
        <Form onSubmit={handleSubmit}>
  
        
          <Form.Group controlId="uid">
            <Form.Label>UID</Form.Label>
            <Form.Control type="number" placeholder="" required/>   
          </Form.Group>
          
          <Form.Group controlId="vendor">
            <Form.Label>Vendor</Form.Label>
            <Form.Control type="text" placeholder="" />   
          </Form.Group>
          

          <Form.Group controlId="status">
            <Form.Check 
              label="Is Online?"          
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
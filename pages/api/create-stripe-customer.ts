// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import initStripe from 'stripe';
import supabaseClient from '../../utils/supabaseClient';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send({
      message: 'Unauthorized'
    })
  }

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2022-08-01'
  })

  console.log(req.body);


  const customer = await stripe.customers.create({
    email: req.body.record.email
  })

  await supabaseClient.from('profile').update({
    stripe_customer: customer.id
  }).eq('id', req.body.record.id)

  res.send({
    message: `Customer creates with id => ${customer.id}`
  })
  res.send({
    message: `Customer creates with id =>`
  })
}

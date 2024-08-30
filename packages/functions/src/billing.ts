import Stripe from 'stripe';
import { Config } from 'sst/node/config';
import handler from '@notes/core/handler';
import { calculateCost } from '../../core/cost';

export const main = handler(async (event) => {
  const { storage, source } = JSON.parse(event.body || '{}');
  const amount = calculateCost(storage);
  const description = 'Scratch charge';
  // Load our secret key
  const stripe = new Stripe(Config.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
  });
  await stripe.charges.create({
    source,
    amount,
    description,
    currency: 'usd',
  });
  return JSON.stringify({ status: true });
});

// The storage variable is the number of notes the user would like to store in his account. And source is the Stripe token for the card that we are going to charge.

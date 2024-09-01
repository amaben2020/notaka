import { useState } from 'react';
import config from '../config';
import { API } from 'aws-amplify';
import { onError } from '../lib/errorLib';
import { useNavigate } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';

export default function Settings() {
  const stripePromise = loadStripe(config.STRIPE_KEY);

  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  function billUser(details: BillingType) {
    return API.post('notes', '/billing', {
      body: details,
    });
  }
  return <div className="Settings"></div>;
}

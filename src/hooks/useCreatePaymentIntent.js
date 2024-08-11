
import { useMutation } from 'react-query';
import {createPaymentIntent} from '../functions/createPaymentIntent';

export const useCreatePaymentIntent = () => {

 // const mutation = useMutation(createPaymentIntent());
  const mutation = useMutation(( {amount, campaignId, supporterName, supporterEmail, separateDonationThruPage, supporterComment, discountCode} ) => createPaymentIntent(amount, campaignId, supporterName, supporterEmail, separateDonationThruPage, supporterComment, discountCode));

  
  return mutation;
};

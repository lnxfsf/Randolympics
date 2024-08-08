
import { useMutation } from 'react-query';
import {createPaymentIntent} from '../functions/createPaymentIntent';

export const useCreatePaymentIntent = () => {

  const mutation = useMutation(createPaymentIntent);
  
  return mutation;
};

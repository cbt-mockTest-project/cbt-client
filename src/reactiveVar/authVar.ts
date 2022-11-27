import { makeVar } from '@apollo/client';
import { getCookie } from 'cookies-next';

const jwtToken = getCookie('jwt-token');
export const authTokenVar = makeVar(jwtToken);

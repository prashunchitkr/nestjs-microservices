export const AUTH_MICROSERVICE = Symbol('AUTH_MICROSERVICE');
export const CREATE_USER = 'CREATE_USER';
export const GET_USER = 'GET_USER';

export const PAYMENT_MICROSERVICE = Symbol('PAYMENT_MICROSERVICE');
export const PROCESS_PAYMENT = 'PROCESS_PAYMENT';

export const APPLICATION_JSON = 'application/json';

export const AUTH_QUEUE = 'AUTH_QUEUE' as const;
export const PAYMENT_QUEUE = 'PAYMENT_QUEUE' as const;
export type Queue = typeof AUTH_QUEUE | typeof PAYMENT_QUEUE;

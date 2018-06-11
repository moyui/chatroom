import IO from 'socket.io-client';

const options = {

};

export const socket = new IO('//localhost:8888', options);

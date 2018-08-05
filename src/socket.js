import IO from 'socket.io-client';

import config from '../config/client';

const options = {

};
const socket = new IO(config.server, options);
export default socket;
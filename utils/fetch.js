import Message from '@/components/Message';
import socket from '@/src/socket';

export default function fetch(event, data={}, {
    toast = true,
} = {}) {
    return new Promise((resolve) => {
        socket.emit(event, data, (res) => {
            //保证errorfirst
            if (typeof res === 'string') {
                if (toast) {
                    Message.error(res);
                }
                resolve([res, null]);
            } else {
                resolve([null, res]);
            }
        })
    })
}
import { connection, defaultOptions } from '@open-ayame/ayame-web-sdk';
import { isDevelopment } from './constants';

const prefix = 'ssssota';

// eslint-disable-next-line import/prefer-default-export
export const connect = (callId: string, stream: MediaStream) => {
  const conn = connection(
    'wss://ayame-lite.shiguredo.jp/signaling',
    `${prefix}@${callId}`,
    {
      ...defaultOptions,
      audio: { enabled: true, direction: 'sendrecv' },
      video: { enabled: false, direction: 'recvonly' },
      signalingKey: 'o-Z2sG4gDBBZsyAXw4rS6xuBDfi0oAWcKf34KEG1EWVqlpkK',
    },
    isDevelopment,
  );
  conn.connect(stream);
  return conn;
};

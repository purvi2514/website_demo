import { io } from 'socket.io-client';
const URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
export const socket = io(URL, { autoConnect: false });

export function connectSocket(token) {
  if (!token) return;
  socket.auth = { token };
  socket.connect();
}

export function disconnectSocket() {
  try { socket.disconnect(); } catch (e) {}
}

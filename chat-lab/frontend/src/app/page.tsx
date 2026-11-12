'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/lib/socket';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [socketId, setSocketId] = useState<string>('');

  useEffect(() => {
    // 1. إعطاء هوية تجريبية للـ handshake
    socket.auth = { userId: 'UserA' };

    // 2. فتح الاتصال يدوياً
    socket.connect();

    function onConnect() {
      setIsConnected(true);
      setSocketId(socket.id || '');
    }

    function onDisconnect() {
      setIsConnected(false);
      setSocketId('');
    }

    // 3. تسجيل المستمعين
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // 4. Cleanup Function عند الـ unmount
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.disconnect();
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4 text-center">Day 6: Socket Handshake</h1>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Status:</span>
            <span className={`font-semibold ${isConnected ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-400">Socket ID:</span>
            <span className="font-mono text-xs text-amber-300">
              {socketId || 'None'}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
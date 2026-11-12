

interface iConnectionStatusProps {
    isConnected: boolean;
    socketId: string;
    currentRoom: string;
}

export function ConnectionStatus({isConnected, socketId, currentRoom}: iConnectionStatusProps)
{

    // TODO: رسم بطاقة صغيرة فيها:
    // - واش Online ولا Offline (أخضر/أحمر)
    // - الـ socketId
    // - اسم الغرفة الحالية
    return null;
}





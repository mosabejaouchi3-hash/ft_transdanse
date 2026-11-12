
interface iRoomJoin {
    room: string;
    onRoomChange: (newRoom: string) => void;
    onJoin: () => void;
}

export function RoomJoin({room, onRoomChange, onJoin}: iRoomJoin)
{
    return null;
}
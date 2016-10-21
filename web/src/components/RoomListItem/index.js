import React from 'react';

type Props = {
  room: {
    id: number,
    name: string,
  },
  currentUserRoomIds: Array,
  onRoomJoin: () => void,
}

const RoomListItem = ({ room, currentUserRoomIds, onRoomJoin }: Props) => {
  const isJoined = currentUserRoomIds.includes(room.id);

  return (
    <div key={room.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={{ marginRight: '8px' }}>{room.name}</span>
      <button
        onClick={() => onRoomJoin(room.id)}
        className="btn btn-sm"
        disabled={isJoined}
      >
        {isJoined ? 'Joined' : 'Join'}
      </button>
    </div>
  );
};

export default RoomListItem;

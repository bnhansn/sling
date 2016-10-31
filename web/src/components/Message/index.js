// @flow
import React from 'react';
import moment from 'moment';
import Avatar from '../Avatar';
import { Message as MessageType } from '../../types';

type Props = {
  message: MessageType,
}

const Message = ({ message: { text, inserted_at, user } }: Props) =>
  <div style={{ display: 'flex', marginBottom: '10px' }}>
    <Avatar email={user.email} style={{ marginRight: '10px' }} />
    <div>
      <div style={{ lineHeight: '1.2' }}>
        <b style={{ marginRight: '8px', fontSize: '14px' }}>{user.username}</b>
        <time style={{ fontSize: '12px', color: 'rgb(192,192,192)' }}>{moment(inserted_at).format('h:mm A')}</time>
      </div>
      <div>{text}</div>
    </div>
  </div>;

export default Message;

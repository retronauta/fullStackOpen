import { NotificationProps } from '../../types';

const style = {
  color: 'red',
};

function Notification({ info }: NotificationProps) {
  if (!info.message) {
    return null;
  }
  return <div style={style}>{info.message}</div>;
}

export default Notification;

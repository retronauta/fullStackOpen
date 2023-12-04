import { Info } from '../../types';

interface NotificationProps {
  info: Info;
}

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

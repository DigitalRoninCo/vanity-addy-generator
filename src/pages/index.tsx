import DRVanityGenerator from '../components/DRVanityGenerator';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
  return (
    <div>
      <h1>Vanity Address Generator with Chat</h1>
      <DRVanityGenerator />
      <ChatWindow />
    </div>
  );
}

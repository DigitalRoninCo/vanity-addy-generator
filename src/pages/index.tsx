import VanityGenerator from '../components/VanityGenerator';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
  return (
    <div>
      <h1>Vanity Address Generator with Chat</h1>
      <VanityGenerator />
      <ChatWindow />
    </div>
  );
}

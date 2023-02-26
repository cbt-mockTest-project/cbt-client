import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const element =
    typeof window !== 'undefined' && document.getElementById('portal');
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;

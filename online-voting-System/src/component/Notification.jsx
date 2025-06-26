import { useEffect } from 'react';
import useUIStore from '../store/uiStore';

export default function Notification() {
  const { successMessage, clearSuccessMessage } = useUIStore();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        clearSuccessMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, clearSuccessMessage]);

  if (!successMessage) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded shadow-lg z-50">
      {successMessage}
      <button className="ml-2 font-bold" onClick={clearSuccessMessage}>×</button>
    </div>
  );
}

import React from 'react';


export default function NotificationModal({ isOpen, notifications, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 ease-out z-50" style={{ transform: isOpen ? 'translateY(0)' : 'translateY(-100%)' }}>
      
      <ul className="py-2">
        {notifications.map((notification, index) => (
          <li key={index} className="px-4 py-2 border-b hover:bg-gray-100">
            <div className="font-semibold text-green-600">¡Aprobado!</div>
            <div>{notification.title} en {notification.company}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

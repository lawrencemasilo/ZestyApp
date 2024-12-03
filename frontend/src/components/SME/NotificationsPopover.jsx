import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Settings, AlertCircle, CheckCircle2 } from 'lucide-react';

const NotificationItem = ({ notification, onDismiss }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Settings className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="p-3 border-b last:border-b-0 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        {getIcon(notification.type)}
        <div className="flex-1">
          <p className="text-sm font-medium">{notification.title}</p>
          <p className="text-xs text-gray-500">{notification.message}</p>
          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
        </div>
        <button 
          onClick={() => onDismiss(notification.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your payment of R2,500.00 has been processed',
      time: '2 minutes ago'
    },
    {
      id: 2,
      type: 'alert',
      title: 'Credit Limit Warning',
      message: 'You are approaching your credit limit',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'New Feature Available',
      message: 'Check out our new payment analytics dashboard',
      time: '2 hours ago'
    }
  ]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative focus:outline-none"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {notifications.length > 0 && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <span className="text-xs text-gray-500">{notifications.length} new</span>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onDismiss={dismissNotification}
                />
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                No new notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
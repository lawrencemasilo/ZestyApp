import React, { useState, useEffect } from 'react';
import { Bell, X, Settings, AlertCircle, CheckCircle2 } from 'lucide-react';
import axios from '../../api/axios';
import Popover from '../ui/Popover';

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
    <div className="p-3 border-b dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50">
      <div className="flex items-start gap-3">
        {getIcon(notification.type)}
        <div className="flex-1">
          <p className="text-sm font-medium dark:text-gray-100">{notification.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{notification.message}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {new Date(notification.createdAt).toLocaleString()}
          </p>
        </div>
        <button 
          onClick={() => onDismiss(notification._id)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const NotificationsPopover = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('notifications');
        
        //notiiication structure 
        const formattedNotifications = response.data.notifications.map(notification => ({
          _id: notification._id,
          type: notification.type || 'info', // default to 'info' if no type
          title: notification.title,
          message: notification.message,
          createdAt: notification.createdAt
        }));

        setNotifications(formattedNotifications);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const dismissNotification = async (id) => {
    try {
      // notification  dismissed
      await axios.delete(`notifications/${id}`);
      
      // Update local state
      setNotifications(notifications.filter(notif => notif._id !== id));
    } catch (err) {
      console.error('Error dismissing notification:', err);
    }
  };

  const notificationContent = (
    <div className="w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold dark:text-gray-100">Notifications</h3>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {notifications.length} new
          </span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            Loading notifications...
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500 dark:text-red-400 text-sm">
            {error}
          </div>
        ) : notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onDismiss={dismissNotification}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
            No new notifications
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Popover content={notificationContent}>
      <div className="relative">
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200" />
        {notifications.length > 0 && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        )}
      </div>
    </Popover>
  );
};

export default NotificationsPopover;
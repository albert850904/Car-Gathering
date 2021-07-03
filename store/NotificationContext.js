import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, // { title message status }
  showNotification: (notificationData) => {}, // for IDE autocompletion
  hideNotification: () => {},
});

export function NotificationContextProvider(props) {
  // context state >> 使用這個HOC的Component會接觸到這裡的state
  // 當這裡的state被觸發時，整個NotificationContextProvider會re-render

  const [activeNotification, setActiveNotification] = useState();

  const showNotificationHandler = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  // 打包起來，給需要用到的component 透過context 去使用
  // re-render之後會分配一個新的context object到使用的component
  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
// 他會是一個higher order component

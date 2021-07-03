import { useContext } from "react";
import MainHeader from "./MainHeader";
import Notification from "../../components/UI/Notification";
import NotificationContext from "../../store/NotificationContext";

function Layout(props) {
  const notificationContext = useContext(NotificationContext); // 去access到context裡面存的state

  // 使用context的component，會透過NotificationContextProvider裏面的function去觸發state改變 >> re-render
  // 這裡的activeNotification的state也會跟著更新
  const activeNotification = notificationContext.notification;

  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}
export default Layout;

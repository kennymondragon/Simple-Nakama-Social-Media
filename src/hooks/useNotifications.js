import { useContext } from "react";
import notificationContext from "../context/NotificationProvider";

const useNotifications = () => {
    return useContext(notificationContext);
}

export default useNotifications;
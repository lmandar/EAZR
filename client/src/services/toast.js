import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const ToastService = {
  success: (message) => {
    console.log("message:-->>")
    toast.success(message, toastOptions);
  },

  error: (message) => {
    toast.error(message, toastOptions);
  },

  info: (message) => {
    toast.info(message, toastOptions);
  },

  warning: (message) => {
    toast.warning(message, toastOptions);
  },
};

export default ToastService;

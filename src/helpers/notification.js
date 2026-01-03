import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const showSuccessToast = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};

export const showErrorToast = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
  });
};

export const showSwalSuccess = (title, text) => {
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#d97706",
  });
};

export const showSwalError = (title, text) => {
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#dc2626", 
  });
};

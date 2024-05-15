
"use client"
import Swal from "sweetalert2";
const sweetAlert = ({icon , message , button}) => {
  Swal.fire({
  position: "top-end",
  icon: icon && icon ,
  title: message && message,
  showConfirmButton: button && button ,
  timer: 1500
});
}

const confirm = async () => {
  const conformation = await  Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
    })
    return conformation ;
}
export {sweetAlert , confirm}



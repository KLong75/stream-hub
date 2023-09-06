import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_USER } from "../../utils/mutations";

const DeleteAccountModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [deleteUser, { error }] = useMutation(DELETE_USER);

  const deleteAccount = async (event) => {
    event.preventDefault();
    try {
      await deleteUser();
      Auth.logout();
      navigate("/");
      alert("Account Deleted");
    } catch (e) {
      console.log(e);
    }
  };

  
  
  return (
    <div>
      <p>Are you sure you want to delete your account?</p>
      <button onClick={deleteAccount}>Confirm</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DeleteAccountModal;
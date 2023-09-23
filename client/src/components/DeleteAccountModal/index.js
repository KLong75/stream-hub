import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { DELETE_USER } from "../../utils/mutations";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";

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
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Delete Account</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete your account?</p>
        {error && <span className="font-link">Delete account failed.</span>}
        <DialogActions>
          <Button onClick={deleteAccount}>Confirm</Button>
        </DialogActions>
      </DialogContent>
      <Button onClick={onClose}>Close</Button>
    </Dialog>
  );
};

export default DeleteAccountModal;

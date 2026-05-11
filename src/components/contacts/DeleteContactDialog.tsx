'use client';

import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import { Contact } from './ContactsView';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  contacts: Map<string, Contact>;
}

export default function DeleteContactDialog({ open, onClose, onSuccess, contacts }: Props) {
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Delete Contacts?</DialogTitle>
      <DialogContent>
        <Alert severity="warning">This cannot be reversed!</Alert>
        <List>
          {[...contacts.entries()].map(([key, contact]) => (
            <ListItem key={key}>
              <ListItemText primary={contact.full_name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onSuccess} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

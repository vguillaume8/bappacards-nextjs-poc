'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

interface AddContactFormData {
  full_name: string;
  email: string;
  phone_number: string;
  location_name: string;
  date_met: Date | null;
  notes: string;
  follow_up_priority: string;
  instagram: string;
  tiktok: string;
}

const emptyForm: AddContactFormData = {
  full_name: '',
  email: '',
  phone_number: '',
  location_name: '',
  date_met: null,
  notes: '',
  follow_up_priority: '',
  instagram: '',
  tiktok: '',
};

export interface AddContactPayload {
  full_name: string;
  email: string;
  phone_number: string;
  notes: string;
  follow_up_priority: string;
  instagram: string;
  tiktok: string;
  contact_location?: { name: string };
  date_met?: Date;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: AddContactPayload) => void;
}

export default function AddContactDialog({ open, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState<AddContactFormData>(emptyForm);
  const [dateInputValue, setDateInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    setDateInputValue(dateValue);
    if (dateValue) {
      const [year, month, day] = dateValue.split('-').map(Number);
      setFormData((prev) => ({ ...prev, date_met: new Date(year, month - 1, day) }));
    } else {
      setFormData((prev) => ({ ...prev, date_met: null }));
    }
  };

  const handleClose = () => {
    setFormData(emptyForm);
    setDateInputValue('');
    onClose();
  };

  const handleSubmit = () => {
    const payload: AddContactPayload = {
      full_name: formData.full_name,
      email: formData.email,
      phone_number: formData.phone_number,
      notes: formData.notes,
      follow_up_priority: formData.follow_up_priority,
      instagram: formData.instagram.replace(/@/g, ''),
      tiktok: formData.tiktok.replace(/@/g, ''),
      ...(formData.location_name ? { contact_location: { name: formData.location_name } } : {}),
      ...(formData.date_met ? { date_met: formData.date_met } : {}),
    };
    onSuccess(payload);
    handleClose();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 600 } }}
      maxWidth="md"
      open={open}
    >
      <DialogTitle>Add Contact</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Met in"
              name="location_name"
              value={formData.location_name}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Date Met"
              type="date"
              value={dateInputValue}
              onChange={handleDateChange}
              margin="normal"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="add-follow-up-priority-label">Follow-up Priority</InputLabel>
              <Select
                labelId="add-follow-up-priority-label"
                name="follow_up_priority"
                value={formData.follow_up_priority}
                onChange={(e) => handleChange(e as { target: { name: string; value: string } })}
                label="Follow-up Priority"
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              margin="normal"
              placeholder="@username"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="TikTok"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleChange}
              margin="normal"
              placeholder="@username"
            />
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              label="Notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Contact
        </Button>
      </DialogActions>
    </Dialog>
  );
}

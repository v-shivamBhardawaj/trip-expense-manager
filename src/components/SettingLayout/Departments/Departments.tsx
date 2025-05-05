import { useState } from 'react';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DepartmentCard from './DepartmentCard/DepartmentCard';
import AddDepartment from './AddDepartment/AddDepartment';

const Departments = () => {
  const [open, setOpen] = useState(false);

  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        <Button
          variant="contained"
          onClick={handleOpenForm}
        >
          Add New Department
        </Button>

        <Dialog open={open} onClose={handleCloseForm} maxWidth="sm" fullWidth>
          <DialogTitle>
            Add Department
            <IconButton
              aria-label="close"
              onClick={handleCloseForm}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <AddDepartment/>
          </DialogContent>
        </Dialog>

      </div>
      <div>
        <DepartmentCard />
      </div>
    </>
  );
};

export default Departments;

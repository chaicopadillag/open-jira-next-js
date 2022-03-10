import { Box, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import React, { ChangeEvent, useContext, useState } from 'react';
import { EntryContext, UIContext } from '../../contexts';

export const NewEntry = () => {
  const [description, setDescription] = useState<string>('');
  const [touch, setTouch] = useState<boolean>(false);

  const { addEntry } = useContext(EntryContext);
  const { setIsAdding, isAdding } = useContext(UIContext);

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);

  const saveEntry = () => {
    if (description.length < 3) return;

    addEntry(description);
    setDescription('');
    setIsAdding(false);
    setTouch(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {!isAdding ? (
        <Button startIcon={<AddIcon />} fullWidth variant='contained' onClick={() => setIsAdding(true)}>
          Add entry
        </Button>
      ) : (
        <>
          <TextField
            fullWidth
            sx={{ marginTop: 2, marginBottom: 1 }}
            placeholder='New entry'
            autoFocus
            multiline
            label='New entry'
            helperText={description.length < 3 && touch && 'Please enter entry'}
            onChange={handleChangeDescription}
            onBlur={() => setTouch(true)}
            error={description.length < 3 && touch}
          />
          <Box display='flex' justifyContent='space-between'>
            <Button
              variant='text'
              color='error'
              onClick={() => {
                setIsAdding(false);
                setTouch(false);
              }}
            >
              Cancel
            </Button>
            <Button startIcon={<SaveIcon />} color='secondary' variant='contained' onClick={saveEntry}>
              Save
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

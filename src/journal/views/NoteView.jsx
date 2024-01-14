import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { ImageGallery } from '../components/ImageGallery'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector( state => state.journal);

  const { body, title, date, onInputChange, formState } = useForm( note );

  const dateString = useMemo(()  => {
    const newDate = new Date(date).toUTCString();

    return newDate;
  }, [ date ]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [ formState ])

  const fileInputRef = useRef();

  useEffect(() => {
    if (messageSaved.length === 0) return;

    Swal.fire({
      icon: 'success',
      title: 'Nota actualizada',
      text: messageSaved,
      showConfirmButton: true,
    });
  }, [ messageSaved ]);

  const onSaveNote  = () => {
    dispatch(startSaveNote());
  }

  const onFileInputChange = ({ target }) => {
    if ( target.files === 0 ) return;

    dispatch( startUploadingFiles(target.files));
  }

  const onDelete = () => {
    dispatch( startDeletingNote());
  };

  return (
    <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1}} className='animate__animated animate__fadeIn animate__faster'>
      <Grid item>
        <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
      </Grid>

      <Grid item>

        <input
          type="file"
          multiple
          ref= { fileInputRef }
          onChange={ onFileInputChange }
          style= {{ display: 'none' }} />

        <IconButton
          color='primary'
          disabled= { isSaving }
          onClick= { () => fileInputRef.current.click() }>

          <UploadOutlined></UploadOutlined>
        </IconButton>

        <Button
          disabled = { isSaving }
          onClick={ onSaveNote }>
           <SaveOutlined sx= {{ fontSize: 18, mr: 1 }} />
           Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField type='text' variant='filled' fullWidth placeholder='Ingrese un titulo' label='Titulo'
                   sx={{ border: 'none', mb: 1}} name="title" value = { title } onChange={ onInputChange } />

        <TextField type='text' variant='filled' fullWidth multiline placeholder='Que sucedio en el dia de hoy ?'
                   minRows={ 5 } name='body' value = { body } onChange = { onInputChange } />
      </Grid>

      <Grid container justifyContent='end'>
        <Button onClick={ onDelete} sx={{ mt: 2}} color= 'error'>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      <ImageGallery images={ note.imageUrls } />

    </Grid>
  )
}

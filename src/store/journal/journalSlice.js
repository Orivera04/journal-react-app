import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
      isSaving: false,
      messageSaved: '',
      notes: [],
      active: null
    },
    reducers: {
      isSavingNewNote: (state) => {
        state.isSaving = true;
      },
      addNewEmptyNote: (state, action) => {
        state.notes.push(action.payload);
        state.isSaving = false;
      },
      setActiveNote: (state, action) => {
        state.active = action.payload;
        state.messageSaved = '';
      },
      setNotes: (state, action) => {
        state.notes = action.payload;
      },
      setSaving: (state) => {
        state.isSaving = true;
        state.messageSaved = '';
      },
      updateNote: (state, action) => {
        state.isSaving = false;
        state.notes = state.notes.map( (note) => note.id == action.payload.id ? state.active : note);

        state.messageSaved = `${action.payload.title }, actualizada correctamente.`
      },
      setPhotoToActiveNote: (state, action) => {
        state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
        state.isSaving = false;
      },
      clearNotesLogout: (state) => {
        state.isSaving = false;
        state.messageSaved = '';
        state.notes = [];
        state.active = null;
      },
      deleteNoteById: (state, action) => {
        state.notes = state.notes.filter( ((note) => note.id !== action.payload) );
        state.active = null;
      },
    }
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  isSavingNewNote,
  setActiveNote,
  setNotes,
  setPhotoToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
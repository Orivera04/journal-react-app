import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseApp, FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, isSavingNewNote, setNotes, setSaving, updateNote, setPhotoToActiveNote, deleteNoteById } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = ()  => {
  return async( dispatch, getState ) => {

    dispatch( isSavingNewNote());
    // UID
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notes`) );
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    //! dispatch
    dispatch(addNewEmptyNote( newNote ));
    dispatch(setActiveNote( newNote ) );
  }
}

export const startLoadingNotes = ( ) => {
  return async( dispatch, getState ) => {
    const { uid } = getState().auth;

    if (!uid) throw new Error('El UID del usuario no existe.');

    const userNotes = await loadNotes( uid );

    dispatch( setNotes( userNotes ) );

  }
}

export const startSaveNote = ( note ) => {
  return async( dispatch, getState ) => {
    dispatch(setSaving());
    const { uid } = getState().auth;

    const { active:note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true } );

    dispatch( updateNote( note ));

  }
}

export const startUploadingFiles = ( files = [] )  => {
  return async( dispatch ) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    for( const file of files ) {
      fileUploadPromises.push( fileUpload( file ));
    }

    const photosUrls = await Promise.all( fileUploadPromises );

    dispatch( setPhotoToActiveNote( photosUrls ) );

  }
}

export const startDeletingNote = ( ) => {
  return async( dispatch, getState ) => {

    const { uid } = getState().auth;
    const { active:note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    const res = await deleteDoc(docRef);

    dispatch( deleteNoteById( note.id ) );
  }
}
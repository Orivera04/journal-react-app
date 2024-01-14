import { Google } from '@mui/icons-material'
import { Button, Grid, TextField, Typography, Link, Alert } from '@mui/material'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks'
import { AuthLayout } from '../layout/AuthLayout'

const formDate = {
  email: "",
  password: ""
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formDate);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch( startLoginWithEmailPassword({ email, password }) );
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn());
  }

  return (

    <AuthLayout title="Login">
      <form aria-label='submit-form' onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={ 12 } sx= {{ mt: 2}}>
            <TextField value={ email } onChange={ onInputChange } name="email" label="Correo" type="email" placeholder="correo@google.com" fullWidth></TextField>
          </Grid>


          <Grid item xs={ 12 } sx= {{ mt: 2}}>
            <TextField value={ password } onChange={ onInputChange } name="password" label="Contraseña" type="password" placeholder="contraseña" inputProps={{ "data-testid": "password" }} fullWidth></TextField>
          </Grid>

          <Grid container spacing= { 2 } sx={{ mb: 2, mt: 1}}>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button disabled={ isAuthenticating } type="submit" variant='contained' fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={ 12 } sm={ 6 }>
              <Button aria-label="google-btn" disabled={ isAuthenticating } onClick={ onGoogleSignIn } variant='contained' fullWidth>
                <Google></Google>
                <Typography sx={{ml: 1}}>Google</Typography>
              </Button>
            </Grid>

          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={ RouterLink } color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>

        <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid

              item
              xs={ 12 }
              display={ !!errorMessage ? '': 'none' }
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

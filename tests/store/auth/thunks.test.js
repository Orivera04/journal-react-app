const { demoUser } = require("../../fixtures/authFixtures");
const { signInWithGoogle, loginWithEmailPassword, logoutFirebase } = require("../../../src/firebase/providers");
const { clearNotesLogout } = require("../../../src/store/journal/journalSlice");
const { checkingCredentials, logout, login } = require("../../../src/store/auth/authSlice");
const { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } = require("../../../src/store/auth/thunks");

jest.mock('../../../src/firebase/providers.js');

describe('Pruebas en Auththunks', () => {

  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe de invocar el checkingCredentials', async() => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignin debe de llamar a checkingCredentials y login - exitoso', async() => {

    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue( loginData);

    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
    expect(dispatch).toHaveBeenCalledWith( login( loginData ) );

  });


  test('startGoogleSignin debe de llamar a checkingCredentials y logout - Error', async() => {

    const loginData = { ok: false, errorMessage: 'Error en google' };
    await signInWithGoogle.mockResolvedValue( loginData);

    // thunk
     await startGoogleSignIn()(dispatch);

     expect(dispatch).toHaveBeenCalledWith( checkingCredentials() );
     expect(dispatch).toHaveBeenCalledWith( logout( loginData.errorMessage ) );

  });

  test ('startLoginWithEmailPassword debe de llamar a checkingCredentials y login - exitoso', async() => {

    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWithEmailPassword.mockResolvedValue( loginData );

    await startLoginWithEmailPassword( formData )(dispatch);

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
  });

  test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {

    await startLogout()(dispatch);

    expect( logoutFirebase ).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith( clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith( logout({}) );
  });
});
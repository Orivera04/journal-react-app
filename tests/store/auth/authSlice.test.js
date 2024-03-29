const { authSlice, login, logout, checkingCredentials } = require("../../../src/store/auth/authSlice");
const { initialState, demoUser } = require("../../fixtures/authFixtures");

describe('Pruebas en el authSlice', () => {

    test('debe de regresar el estado inicial y llamarse auth', () => {

      const state = authSlice.reducer(initialState, {});

      expect(authSlice.name).toBe('auth');
      expect(state).toEqual(initialState);
    });

    test('debe de realizar la autenticación', () => {

      const state = authSlice.reducer(initialState, login(demoUser));

      expect( state ).toEqual({
        status: "authenticated",
        uid: demoUser.uid,
        email: demoUser.email,
        displayName: demoUser.displayName,
        photoURL: demoUser.photoURL,
        errorMessage: undefined
      })
    });

    test(' debe de realizar el logout sin argumentos', () => {

      const state = authSlice.reducer(initialState, logout({}));

      expect(state).toEqual({
        status: "not-authenticated",
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: undefined
      })

    });

    test(' debe de realizar el logout con argumentos y mostrar el error', () => {

      const errorMessage = 'Error al realizar el logout';
      const state = authSlice.reducer(initialState, logout({ errorMessage }));

      expect(state).toEqual({
        status: "not-authenticated",
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: errorMessage
      })

    });

    test(' debe de cambiar el estado a checking', () => {
      const state = authSlice.reducer(initialState, checkingCredentials());
      expect(state.status).toBe('checking');
    });
});
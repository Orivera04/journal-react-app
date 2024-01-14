export const initialState = {
  status: "checking", // checking, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const authenticateState = {
  status: "authenticated",
  uid: '123ABC',
  email: 'demo@google.com',
  displayName: 'Demo User',
  photoURL: 'http://demo.com/demo.jpg',
  errorMessage: null
}

export const notAuthenticated = {
  status: "not-authenticated",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
}

export const demoUser = {
  uid: '123ABC',
  email: 'demo@google.com',
  photoURL: 'http://demo.com/demo.jpg',
}

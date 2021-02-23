import firebase from 'firebase'

const ISTEST = process.env.ISTEST

var firebaseConfig = {
  apiKey: "AIzaSyCHgYK12M_HZNvIjEqwRjaRzEYT5yD1IpM",
  authDomain: "fir-authenticationstudy.firebaseapp.com",
  projectId: "fir-authenticationstudy",
  storageBucket: "fir-authenticationstudy.appspot.com",
  messagingSenderId: "555273370521",
  appId: "1:555273370521:web:a61a21f1066c4e508b7108",
  measurementId: "G-843Q1NEKSK"
}
let firebaseInstance: firebase.app.App
let database: firebase.firestore.Firestore
let auth: firebase.auth.Auth

if (!firebase.apps.length) {
  firebaseInstance = firebase.initializeApp(firebaseConfig)
  database = firebase.firestore()
  auth = firebase.auth()

  const isTestAmbient = ISTEST === 'true'
  if (isTestAmbient) {
    database.useEmulator('localhost', 8080)
    auth.useEmulator('http://localhost:9099')
  }
} else {
  firebaseInstance = firebase.app()
  database = firebase.firestore()
  auth = firebase.auth()
}

export {
  firebase as firebaseModule,
  firebaseInstance,
  database,
  auth
}

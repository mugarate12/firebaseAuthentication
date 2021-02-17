import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCHgYK12M_HZNvIjEqwRjaRzEYT5yD1IpM",
  authDomain: "fir-authenticationstudy.firebaseapp.com",
  projectId: "fir-authenticationstudy",
  storageBucket: "fir-authenticationstudy.appspot.com",
  messagingSenderId: "555273370521",
  appId: "1:555273370521:web:a61a21f1066c4e508b7108",
  measurementId: "G-843Q1NEKSK"
}

// firebase.initializeApp(firebaseConfig)

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

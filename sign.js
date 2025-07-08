const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyDwIB20guA6AvlioCWLja8KaTX0jDg5GrA",
    authDomain: "auth-form-95b9b.firebaseapp.com",
    projectId: "auth-form-95b9b",
    storageBucket: "auth-form-95b9b.appspot.com",
    messagingSenderId: "412491590562",
    appId: "1:412491590562:web:fb8c4b6d2211a7ae84a0fb"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

//signup function
const signUp=()=>{
    const email= document.getElementById("email").value;
    const password= document.getElementById("password").value;
    console.log(email,password)
    //firebase func
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            document.write("signed up successfully")
            console.log(userCredential)
            // Redirect to the home page or dashboard
            window.location.href = "index.html"; 
           
            // ...
        })
        .catch((error) => {
            
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ..
        });
 }
 //login function
 const logIn=()=> {
    const email= document.getElementById("email").value;
    const password= document.getElementById("password").value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // Signed in
         var user = userCredential.user;
         localStorage.setItem("user", JSON.stringify(user.email));
         alert("logged in successfully")
         document.write("logged in successfully")
        
            console.log(userCredential)
            window.location.href = "/"; 
           
         // ...
        })
        .catch ((error) => {
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorCode);
        console.log(errorMessage);
            // ..
  }
);
 }








//  function checkAuthentication() {
//     return new Promise((resolve, reject) => {
//       firebase.auth().onAuthStateChanged(function (user) {
//         console.log(user.email);
//         localStorage.setItem("user", JSON.stringify(user.email));

//         if (user) {
//           // User is signed in
//           resolve(true);
//         } else {
//           // No user is signed in
//           resolve(false);
//         }
//       });
//     });
//   }

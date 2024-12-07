// Corrected Firebase initialization and authentication
// ... other imports
import { initializeApp } from 'firebase/app'; // Import necessary Firebase modules
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  // ... other config settings
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Authenticate user and handle potential errors
const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, access the database
    const userRef = ref(database, 'users/' + user.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log('User data:', data);
    }, {
      includeMetadataChanges: true,
    });
  } else {
    // User is signed out, handle accordingly
    console.log('User is signed out');
  }
}, (error) => {
  // Handle authentication errors
  console.error('Authentication error:', error);
});

// Clean up the listener when it's no longer needed
// ...
unsubscribe();
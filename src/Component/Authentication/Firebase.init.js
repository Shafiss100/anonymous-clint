import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBFcP7K9KJN2lhgYqiHSItpYA1Lh07yimU",
  authDomain: "beanonymous37.firebaseapp.com",
  projectId: "beanonymous37",
  storageBucket: "beanonymous37.appspot.com",
  messagingSenderId: "506627768361",
  appId: "1:506627768361:web:02ae5ebda15d23462adc38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;

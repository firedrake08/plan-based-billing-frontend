import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC9p8_t9HRrNnElHF-c_OSYiB5pYyZzd2s",
  authDomain: "plan-based-billing.firebaseapp.com",
  projectId: "plan-based-billing",
  storageBucket: "plan-based-billing.appspot.com",
  messagingSenderId: "197236322730",
  appId: "1:197236322730:web:549d1399e2ad83c54e3bd3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
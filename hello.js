// ✅ Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// ✅ Your Firebase Config (replace with your values)
const firebaseConfig = {
  apiKey: "AIzaSyA3GlG5vRRZX_hWJskIrjCkx4Zrua7wKsM",
  authDomain: "kz-sikar.firebaseapp.com",
  databaseURL: "https://kz-sikar-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kz-sikar",
  storageBucket: "kz-sikar.firebasestorage.app",
  messagingSenderId: "896083049571",
  appId: "1:896083049571:web:89baf134bfdaec78544c56",
  measurementId: "G-B6RFTZPR3X"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// HTML Elements
const form = document.getElementById("bookingForm");
const bookingList = document.getElementById("bookingList");

// 🔹 Form Submit Event
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value.trim();

  if (!name || !phone || !date) {
    alert("❌ Please fill all fields!");
    return;
  }

  // 🔹 Check if date already booked
  const bookingsRef = ref(db, "bookings");
  let alreadyBooked = false;

  onValue(bookingsRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      if (data.date === date) {
        alreadyBooked = true;
      }
    });
  }, { onlyOnce: true });

  setTimeout(() => {
    if (alreadyBooked) {
      alert("⚠️ This date is already booked!");
    } else {
      const newRef = push(bookingsRef);
      set(newRef, {
        name,
        phone,
        date,
        createdAt: new Date().toLocaleString()
      });
      alert("✅ Booking successful!");
      form.reset();
    }
  }, 500);
});

// 🔹 Display Bookings
const bookingsRef = ref(db, "bookings");
onValue(bookingsRef, (snapshot) => {
  bookingList.innerHTML = "";
  snapshot.forEach((childSnapshot) => {
    const data = childSnapshot.val();
    const li = document.createElement("li");
    li.textContent = `${data.name} | ${data.phone} | ${data.date}`;
    bookingList.appendChild(li);
  });
});

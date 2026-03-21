# How Our App's Login System Works (Explained simply!)

Imagine our Task Manager app is a **Secret Clubhouse**. We only want people who are members to come inside and see their tasks. Here is how we built the locks and keys for our clubhouse!

---

### 1. The ID Card Office (`AuthContext.jsx`)
This file is the brain of our security system. It keeps track of who is currently inside the clubhouse. 

*   **`register`**: When someone new comes to the clubhouse, they give us their email, username, and a secret password. We write this down in a special notebook hidden in your browser (called `localStorage`) so we remember them next time!
*   **`login`**: When a friend comes back, they tell us their username and password. We check our notebook. If the password matches, we give them an "Allowed Inside" badge!
*   **`logout`**: When they want to go home, we take back their badge and say goodbye.
*   **`user` state**: This acts like a loudspeaker. It tells every room in the clubhouse, *"Hey everyone, Sarah is logged in!"* or *"Hey, nobody is here right now."*

---

### 2. The Welcome Back Door (`Login.jsx`)
This is the page where returning friends come to get inside.
*   It has two text boxes: one for the Username and one for the Password.
*   When they click the **Login** button, it sends their info straight to the ID Card Office.
*   If they typed the right password, the door opens, and they are taken to the `My Tasks` page! If they typed it wrong, a red warning box pops up to tell them to try again.

---

### 3. The New Member Form (`Register.jsx`)
This is a page for people who want to join the clubhouse for the very first time.
*   It asks for three things: Email, Username, and Password.
*   When they click **Register**, it sends it to the ID Card Office to be written down in the notebook. 
*   Once they are written down, we automatically let them inside to see their Tasks!

---

### 4. The Magic Signboard (`Header.jsx`)
The header is the menu bar at the very top of the app. It uses the loudspeaker from the ID Card Office to see if someone is logged in.
*   **If you ARE logged in:** It knows you are a member! So, it shows you links to "New Task", "All Tasks", your cool profile picture (Avatar), and a "Logout" button so you can leave.
*   **If you are NOT logged in:** It knows you are outside. So, it hides all the tasks and instead shows buttons that say "Login" and "Register".

---

### 5. The Map of the Clubhouse (`App.jsx`)
This file is the big map that tells the website where all the different pages (rooms) are. 
*   We had to update the map to draw in the new `/login` room and the `/register` room so that people typing those addresses actually get sent to the right place!
*   We also wrapped the whole map in our `AuthProvider` so the loudspeaker can be heard in every single room.

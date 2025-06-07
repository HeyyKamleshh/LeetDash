# 💻 LeetDash - LeetCode Progress Dashboard

**LeetDash** is a sleek web application that displays a user's LeetCode progress in a visual, interactive dashboard. Enter your LeetCode username and instantly see your stats—questions solved, submission data, rankings, and more!

---
## DashBoard View
<img src="https://github.com/user-attachments/assets/bf6320db-e7b7-4ccb-8929-87413ad19f79" width="600" />

## 🚀 Features

- 🔍 **Search LeetCode statistics** by username  
- 📊 **Visual progress bars** for Easy, Medium, and Hard problems  
- 📈 **Submission statistics** including:
  - Total submissions  
  - Submissions by difficulty  
- 🏆 **User ranking** and **active streak**  
- 💻 **Problems solved per language** (tabular format)  
- 🎯 **Real-time data fetch** using LeetCode GraphQL API (CORS bypassed)

---

## 🛠 Technologies Used

- **HTML/CSS** – Structure and styling  
- **JavaScript** – Core logic and interactivity  
- **LeetCode GraphQL API** – Fetching user data  
- **CORS Proxy** – [`https://proxy.corsfix.com`](https://proxy.corsfix.com) to bypass CORS

---

## 🧠 How It Works

1. User enters a valid LeetCode username.
2. The app sends a GraphQL query via a proxy to LeetCode’s API.
3. The response includes:
   - Progress per difficulty
   - Submission totals
   - Rank and streak info
   - Language-wise problem count
4. The frontend updates dynamically to reflect these details.

---

## 🔐 Username Validation

- ❌ Empty usernames are rejected with an alert.  
- ✅ Only usernames matching `^[a-zA-Z0-9_-]{1,15}$` are accepted.

---

## 📦 Setup & Running Locally

```bash
# Clone the repository
git clone https://github.com/your-username/leetdash.git
```

## 📁 Project Structure
```bash
leetdash/
├── index.html         # Main HTML file
├── style.css          # Styling for the dashboard
└── script.js          # JavaScript logic to fetch and display data
```
## 🔧 TODO / Future Improvements
- Add user profile image and name display
- Add charts for monthly activity
- Improve error handling and UI responsiveness
- Add dark mode toggle
- Deploy the project with GitHub Pages or Vercel

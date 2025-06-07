💻 LeetDash - LeetCode Progress Dashboard

LeetDash is a web application that allows users to view a comprehensive dashboard of their LeetCode progress by simply entering their LeetCode username. The project fetches data from the LeetCode GraphQL API and visually presents submission statistics, rankings, and solved problems categorized by difficulty and programming language.

🚀 Features
🔍 Search LeetCode statistics by username
📊 Visual progress indicators (easy, medium, hard questions)
📈 Submission statistics including:
Total submissions
Submissions by difficulty
🏆 User ranking and active streak information
💻 Problems solved per programming language (tabular format)
🎯 Real-time fetch using LeetCode GraphQL API with CORS bypass

🛠 Technologies Used
HTML/CSS – Frontend structure and design
JavaScript – Core logic and interactivity
LeetCode GraphQL API – Fetching user data
CORS Proxy – https://proxy.corsfix.com used to bypass CORS restrictions

🧠 How It Works
1. User enters a valid LeetCode username.
2. The app sends a GraphQL query to LeetCode via a CORS proxy.
3. The response is parsed, and:
Progress bars are updated with solved/total problems.
Statistic cards are rendered showing ranking, submissions, and activity.
A table is generated displaying problems solved by language.
4. The data is visually shown using dynamic HTML and CSS.


🔐 Username Validation
Empty usernames are rejected with an alert.
Only valid usernames matching ^[a-zA-Z0-9_-]{1,15}$ are accepted.

📦 Setup & Running
You can run this project by simply cloning the repository and opening the index.html file in your browser.



📁 Project Structure

leetdash/
├── index.html         # Main HTML file
├── style.css          # Styling for the dashboard
└── script.js          # JavaScript logic to fetch and display data

🔧 TODO / Future Improvements
Add user profile image and name display
Add charts for monthly activity
Improve error handling and UI responsiveness
Add dark mode toggle
Deploy the project with GitHub Pages or Vercel

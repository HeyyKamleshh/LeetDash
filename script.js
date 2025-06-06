document.addEventListener("DOMContentLoaded", function() {


    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardStatsContainer = document.querySelector(".stats-cards");
    const profileContainer = document.querySelector(".profile");
    const langaugeContainer = document.querySelector(".languageContainer");

    //check whether the username is valid or not
    function validateUsername(username) {
        if(username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }
  // fetch api call and getting the data from api
    async function fetchUserDetails(username) {

        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            //statsContainer.classList.add("hidden");

            // const response = await fetch(url);
            //proxy url used to bypass proxy check
           const proxyUrl = 'https://proxy.corsfix.com/?';


            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");
            // query added
            const graphql = JSON.stringify({
               query: `
  query userSessionProgress($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    username
    lastName
    languageProblemCount {
      languageName
      problemsSolved
    }
    userCalendar {
      activeYears
      streak
      totalActiveDays
      submissionCalendar
    }
    profile {
      ranking
    }
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
      totalSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}


`,

                variables: { "username": `${username}` }
            })
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };
            
          // complete url proxyURL + Leetcode Graph URL
            const response = await fetch(proxyUrl + encodeURIComponent(targetUrl), requestOptions);

            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            // console.log("recieving data: ", parsedData) ;

            displayUserData(parsedData);
        }
        catch(error) {
          //throw error in container if error exists
            statsContainer.innerHTML = `<p>${error.message} </p>`
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
      // crazy css 
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

// getting the parsed data
    function displayUserData(parsedData) {
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);

        const cardsData = [
            {label: "User Ranking",value:parsedData.data.matchedUser.profile.ranking},
            {label: "Total active days", value:parsedData.data.matchedUser.userCalendar.totalActiveDays},
            {label: "Overall Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions },
            {label: "Overall Easy Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions },
            {label: "Overall Medium Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions },
            {label: "Overall Hard Submissions", value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions },

        ];

        // console.log("card data recieved: " , cardsData);
        // dynamically adding content in div 
        cardStatsContainer.innerHTML = cardsData.map(
            data => 
                    `<div class="card">
                    <h4>${data.label}</h4>
                    <p>${data.value}</p>    
                    </div>`
        ).join("")
      
        // making table for diff language
        const languageProblemCount = parsedData.data.matchedUser.languageProblemCount;

        const languageTable = `
       <table class="card1" cellspacing="3" cellpadding="8">
       <thead>
      <tr>
        <th>Language</th>
        <th>Problems Solved</th>
      </tr>
      </thead>
      <tbody>
      ${languageProblemCount.map(lang => `
        <tr>
          <td>${lang.languageName}</td>
          <td>${lang.problemsSolved}</td>
        </tr>
      `).join("")}
    </tbody>
  </table>
`;

document.getElementById("languageContainer").innerHTML = languageTable;



    }
    

    //starting of the code
    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        // console.log("my username is : ", username);
        if(validateUsername(username)) {
            fetchUserDetails(username);
        }
    })

})
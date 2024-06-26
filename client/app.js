loadDataFromServer()

var loginButton = document.querySelector("#login-button");
var signupButton = document.querySelector("#signup-button");

// login is 1, signup is 2
var signupSwitchButton1 = document.querySelector("#signup-switch-button-1");
var loginSwitchButton1 = document.querySelector("#login-switch-button-1");
var signupSwitchButton2 = document.querySelector("#signup-switch-button-2");
var loginSwitchButton2 = document.querySelector("#login-switch-button-2");

var login = document.querySelector("#login");
var signup = document.querySelector("#signup");

signup.style.display = "none";
loginSwitchButton1.style.backgroundColor = "rgba(252, 123, 4, 0.75)";
loginButton.style.backgroundColor = "rgba(252, 123, 4, 0.75)";

signupSwitchButton1.onclick = function(){
    login.style.display = "none";
    signup.style.display = "flex";
    signupSwitchButton2.style.backgroundColor = "rgba(252, 123, 4, 0.75)";
    signupButton.style.backgroundColor = "rgba(252, 123, 4, 0.75)";
}

loginSwitchButton2.onclick = function(){
    login.style.display = "flex";
    signup.style.display = "none";
}

var navList = document.querySelector("#nav-list");

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

signupFirstName = document.querySelector("#signup-first-name");
signupLastName = document.querySelector("#signup-last-name");
signupEmail = document.querySelector("#signup-email");
signupPassword = document.querySelector("#signup-password");
signupButton.onclick = function(){
    if (validateEmail(signupEmail.value) == false){
        alert("Please enter a correct email.");
    } else if (signupPassword.length < 8){
        alert("Password must be 8+ characters");
    } else{
        var data = "first_name=" + encodeURIComponent(signupFirstName.value);
        data += "&last_name=" + encodeURIComponent(signupLastName.value);
        data += "&email=" + encodeURIComponent(signupEmail.value);
        data += "&password=" + encodeURIComponent(signupPassword.value);
        fetch("https://intramurall.onrender.com/users", {
            credentials: "include",
            method: "POST",
            body: data,
            headers: {
                "content-type": "application/x-www-form-urlencoded" 
            }
        }).then(function (response){
            if (response.status == 201){
                signup.style.display = "none";
                login.style.display = "flex";
                signupFirstName.value = '';
                signupLastName.value = '';
                signupEmail.value = '';
                signupPassword.value = '';
            }
        })
    }
}

loginEmail = document.querySelector("#login-email");
loginPassword = document.querySelector("#login-password");
loginButton.onclick = function(){
    var data = "email=" + encodeURIComponent(loginEmail.value);
    data += "&password=" + encodeURIComponent(loginPassword.value);
    fetch("https://intramurall.onrender.com/sessions",{
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    }).then(function (response){
        if (response.status == 201){
            loginEmail.value = '';
            loginPassword.value = '';
            login.style.display = 'none';
            var header = document.querySelector("#header")
            var wrapper = document.querySelector("#wrapper")
            var intramurallText = document.querySelector("#intramurall-text")
            wrapper.style.display = 'grid';
            if (window.innerWidth <= 767) {
                wrapper.style.gridTemplateColumns = 'repeat(7, 1fr)';
            } else {
                wrapper.style.gridTemplateColumns = '150px 1fr 1fr 1fr 1fr 1fr 1fr';
            }
            header.style.gridColumn = '0/1'
            intramurallText.style.display = 'none';
            document.querySelector("#login-portal").style.display = 'none';
            createHomePage();
            isAdmin();

        } else{
            alert('The email or password you entered was incorrect.')
        }
    })
}

function createHomePage (){
    var navList = document.getElementById("nav-list");

    if (navList !== null){
        navList.style.display = 'flex';
        displayHomePage();
        return;
    }
    var navList = document.createElement("ul");
    navList.setAttribute('id', 'nav-list');
    header.appendChild(navList);
    var logo = document.createElement("img");
    logo.setAttribute('id', 'header-logo')
    logo.src = "/images/IntramurALL-Logo.svg";
    navList.appendChild(logo);

    var div = document.createElement('div');
    div.setAttribute('class', 'nav-buttons');
    var homeIcon = document.createElement("img");
    homeIcon.setAttribute('id', 'home-icon');
    homeIcon.src = "/images/Home-Icon.svg";
    div.appendChild(homeIcon);
    var p = document.createElement("p");
    p.innerHTML = 'Home';
    div.appendChild(p);
    navList.appendChild(div);
    var homeIcon = document.querySelector("#home-icon");
    document.querySelector("#login-portal").style.display = 'none';
    homeIcon.onclick = function(){
        clearPage();
        displayHomePage();
    }


    var div = document.createElement('div');
    div.setAttribute('class', 'nav-buttons');
    var teamsIcon = document.createElement("img");
    teamsIcon.setAttribute('id', 'teams-icon');
    teamsIcon.src = "/images/Teams-Icon.svg";
    div.appendChild(teamsIcon);
    p = document.createElement("p");
    p.innerHTML = 'Teams';
    div.appendChild(p);
    navList.appendChild(div);
    teamsIcon.onclick = function(){
        if (document.querySelector('#teams-container')){
            clearPage();
            displayTeamsPage();
        } else {
            clearPage();
            teamsPage();
        }
    }

    /*
    var scheduleIcon = document.createElement("img");
    scheduleIcon.setAttribute('id', 'schedule-icon');
    scheduleIcon.src = "/images/Calendar-Icon.svg";
    navList.appendChild(scheduleIcon);
    p = document.createElement("p");
    p.innerHTML = 'Schedule';
    navList.appendChild(p);
    */

    var div = document.createElement('div');
    div.setAttribute('class', 'nav-buttons');
    var statsIcon = document.createElement("img");
    statsIcon.setAttribute('id', 'stats-icon');
    statsIcon.src = "/images/Stats-Icon.svg";
    div.appendChild(statsIcon);
    p = document.createElement("p");
    p.innerHTML = 'Stats';
    div.appendChild(p);
    navList.appendChild(div);
    statsIcon.onclick = function(){
        if (document.querySelector('#stats-container')){
            clearPage();
            displayStatsPage();
        } else {
            clearPage();
            statsPage();
        }
    }

    var div = document.createElement('div');
    div.setAttribute('class', 'nav-buttons');
    var logoutIcon = document.createElement("img");
    logoutIcon.setAttribute('id', 'logout-icon');
    logoutIcon.src = "/images/Logout-Icon.svg";
    div.appendChild(logoutIcon);
    p = document.createElement("p");
    p.innerHTML = 'Logout';
    div.appendChild(p);
    navList.appendChild(div);
    logoutIcon.onclick = function(){
        logout();
    }

    welcomeHeaderContainer = document.createElement('div');
    welcomeHeaderContainer.setAttribute('id', 'welcome-header-container');
    welcomeHeader = document.createElement('h1');
    welcomeHeader.setAttribute('id', 'welcome-header');
    welcomeHeader.innerHTML = "Welcome to IntramurALL";
    wrapper.appendChild(welcomeHeaderContainer);
    welcomeHeaderContainer.appendChild(welcomeHeader);
    p = document.createElement('p');
    p.innerHTML = 'Play. Connect. Compete.  Your hub for all things intramurals!';
    welcomeHeaderContainer.appendChild(p);
    leaguesContainer = document.createElement('div');
    leaguesContainer.setAttribute('id', 'leagues-container');
    wrapper.appendChild(leaguesContainer);
    leaguesContainerHeader = document.createElement('h2');
    leaguesContainerHeader.innerHTML = 'View Leagues';
    leaguesContainerHeader.setAttribute('id', 'leagues-container-header');
    leaguesContainer.appendChild(leaguesContainerHeader);
    organizationSelectorContainer = document.createElement('div');
    organizationSelectorContainer.setAttribute('id', 'organization-selector-container');
    leaguesContainer.appendChild(organizationSelectorContainer);
    organizationSearch = document.createElement('input');
    organizationSearch.placeholder = "Search By League";
    loadLeagues();
    organizationSelectorContainer.appendChild(organizationSearch);
    searchButton = document.createElement('button');
    searchButton.setAttribute('id', 'organization-search-button');
    searchButton.innerHTML = "Search";
    searchButton.onclick = function(){
        organization = organizationSearch.value;
        filterLeagues(organization);
    }
    organizationSelectorContainer.appendChild(searchButton);
    leaguesTable = document.createElement('table');
    leaguesTable.setAttribute('id', 'leagues-table');
    leaguesTable.setAttribute('class', 'table table-bordered table-striped');
    leaguesTableContainer = document.createElement('div');
    leaguesTableContainer.setAttribute('id', 'leagues-table-container');
    leaguesContainer.appendChild(leaguesTableContainer);
    leaguesTableContainer.appendChild(leaguesTable);

    leaguesTableHeader = document.createElement('tr');
    leaguesTableHeader.setAttribute('id', 'leagues-table-header');
    var leagueHeader = document.createElement('th');
    leagueHeader.innerHTML = 'League';
    leaguesTableHeader.appendChild(leagueHeader);
    var organizationHeader = document.createElement('th');
    organizationHeader.innerHTML = 'Organization';
    leaguesTableHeader.appendChild(organizationHeader);
    header = document.createElement('th');
    leaguesTableHeader.appendChild(header);
    leaguesTable.appendChild(leaguesTableHeader);


    upcomingGamesContainer = document.createElement('div');
    upcomingGamesContainer.setAttribute('id', 'upcoming-games-container');
    wrapper.appendChild(upcomingGamesContainer);
    upcomingGamesHeader = document.createElement('h2');
    upcomingGamesHeader.setAttribute('id', 'upcoming-games-header');
    upcomingGamesHeader.innerHTML = "Upcoming Games";
    upcomingGamesContainer.appendChild(upcomingGamesHeader);

    upcomingGames = document.createElement('div');
    upcomingGames.setAttribute("id","upcoming-games-div");
    upcomingGamesContainer.appendChild(upcomingGames);

    // fetch request to get all games that player is scheduled for
        //populate games for each date ul
            // for each game li

    fetch('https://intramurall.onrender.com/users/games', {
        credentials: "include"
    }).then(function(response) {
        if (response.status == 200) {
            response.json().then(function(games) {
                if (Object.keys(games).length === 0) {
                    // if player is not scheduled for any upcoming games
                    message = document.createElement('p');
                    message.innerHTML = "No upcoming games.";
                    message.style.textAlign = 'center';
                    upcomingGames.appendChild(message);
                } else {
                    var currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);
                    for (var day in games) {
                        date = new Date(day);
                        date.setDate(date.getDate() + 1);
                        if (date >= currentDate || date.toDateString() == currentDate.toDateString()) {
                            dateElement = document.createElement('h3');
                            dateElement.setAttribute('class', 'upcoming-games-date');
                            dateElement.innerHTML = formatDate(day);
                            upcomingGames.appendChild(dateElement);
    
                            gamesList = document.createElement('ul');
                            gamesList.setAttribute('class', 'games-list');
    
                            games[day].forEach(function(game) {
                                gameLi = document.createElement('li');
                                gameLi.innerHTML = game['teams'][0] + " vs. " + game['teams'][1] + " at " + convertToStandardTime(game['time']);
                                gamesList.appendChild(gameLi);
                            });
                            upcomingGames.appendChild(gamesList);
                        }
                    }
                    var uls = upcomingGames.querySelectorAll('ul');
                    uls.forEach(function(ul) {
                        if (!ul.children.length) {
                            ul.remove();
                        }
                    });

                    if (upcomingGames.lastElementChild.tagName === 'H3' ){
                        upcomingGames.lastElementChild.remove();
                    }
                }
                var uls = upcomingGames.querySelectorAll('ul');
                uls.forEach(function(ul) {
                    if (!ul.children.length) {
                        ul.remove();
                    }
                });   
            
                if (upcomingGames.lastElementChild.tagName === 'H3' ){
                    upcomingGames.lastElementChild.remove();
                }
            });
        } else {
            // if player is not scheduled for any upcoming games
            message = document.createElement('p');
            message.innerHTML = "No upcoming games.";
            message.style.textAlign = 'center';
            upcomingGames.appendChild(message);
        }
    })
}

function logout(){
    fetch("https://intramurall.onrender.com/logout",{
        method: "POST"
    }).then(function(response){
        if (response.status == 201){
            clearPage();
            loginPortal = document.querySelector("#login-portal");
            loginPortal.style.display = "grid";
            login = document.querySelector("#login");
            login.style.display = "flex";
            const loginSignup = document.getElementsByClassName('login-signup');
            loginSignup[0].style.display = 'flex';
            loginSignup[1].style.display = 'flex';
            // Access the #wrapper element
            const wrapper = document.getElementById('wrapper');

            // Remove the grid-template-columns and grid-template-rows styling
            wrapper.style.gridTemplateColumns = '';
            wrapper.style.gridTemplateRows = '';
            wrapper.style.display = '';

            const header = document.getElementById('header');
            header.style.width = '100%'
            header.style.backgroundColor = 'rgba(34, 34, 34, 1)';
            header.style.display = "flex";
            header.style.justifyContent = "flex-start";

            navList = document.getElementById("nav-list");
            navList.style.display = "none";

            logo = document.getElementById('intramurall-text');
            logo.style.display = "";
        }
    })
}

function loadLeagues(){
    searchInput = organizationSearch.value;
    fetch("https://intramurall.onrender.com/organizations", {
        credentials: "include"
    }).then(function(response){
        if (response.status == 200){
            response.json().then(function(data){
                organizations = data;
                var i = 0;
                tbody = document.createElement('tbody');
                organizations.forEach( function(organization){
                    const row = document.createElement('tr');
    
                    // Create and append cells for each data item
                    for (const key in organization) {
                      const cell = document.createElement('td');
                      cell.textContent = organization[key];
                      row.appendChild(cell);
                    }
                    const cell = document.createElement('td');
                    cell.setAttribute('class', 'view-league-cell');
                    viewButton = document.createElement('button');
                    viewButton.setAttribute('class', 'view-league-button');
                    // viewButton.setAttribute('id', i);
                    viewButton.innerHTML = 'View';
                    cell.append(viewButton);
                    row.appendChild(cell);
                    tbody.appendChild(row);
                    i++;
                });
                leaguesTable.appendChild(tbody);
                [...document.getElementsByClassName('view-league-button')].forEach(x =>{
                    x.addEventListener('click', function(){
                        viewLeague(this);
                    })
                });
            })
        }
    })
}


function displayLeagues(){
    var leaguesTable = document.querySelector('#leagues-table');
    var leagues = leaguesTable.querySelectorAll('tr');
    for (var i = 0; i < leagues.length; i++){
        if (leagues[i].style.display == 'none'){
            leagues[i].style.display = 'table-row';
        }
    }
}

function filterLeagues(organization){
    displayLeagues();
    var leaguesTable = document.querySelector('#leagues-table');
    var leagues = leaguesTable.querySelectorAll('tr');

    for (var i = 0; i < leagues.length; i++){
        league = leagues[i].children[0].textContent.toUpperCase();
        if (league.includes(organization.toUpperCase())){
            // pass
        } else{
            leagues[i].style.display = 'none';
        }
    }
    tableHeader = document.querySelector("#leagues-table-header");
    tableHeader.style.display = 'table-row';
}

function loadDataFromServer(){
    fetch("https://intramurall.onrender.com/users",{
        credentials: "include"
    }).then(function(response){
        if (response.status == 200){
            login.style.display = 'none';
            var header = document.querySelector("#header");
            var wrapper = document.querySelector("#wrapper");
            var intramurallText = document.querySelector("#intramurall-text");
            wrapper.style.display = 'grid';
            if (window.innerWidth <= 767) {
                wrapper.style.gridTemplateColumns = 'repeat(7, 1fr)';
            } else {
                wrapper.style.gridTemplateColumns = '150px 1fr 1fr 1fr 1fr 1fr 1fr';
            }
            header.style.gridColumn = '0/1'
            header.style.gridRow = '0/-1'
            intramurallText.style.display = 'none';
            isAdmin();
            createHomePage();
        }
    })
}

function viewLeague(button){
    organization = button.parentElement.parentElement.children[1].textContent;
    league = button.parentElement.parentElement.children[0].textContent;
    organziation = organization.replace(/ /g, "%20");
    league = league.replace(/ /g, "%20");
    fetch("https://intramurall.onrender.com/leagues?league=" + league + "&organization=" + organization, {
        credentials: "include"
    }).then(function(response){
        if (response.status == 200){
            response.json().then(function(data){
                // will return an array 
                // [league name, description, organziation]
                leagueInfo = data[0];
                leagueDisplay = document.createElement('div');
                leagueDisplay.setAttribute("id", "league-display");
                var wrapper = document.querySelector("#wrapper");
                wrapper.appendChild(leagueDisplay);
                leagueDisplayHeader = document.createElement('h2');
                leagueDisplayHeader.setAttribute('id', 'league-display-header');
                leagueDisplayHeader.innerHTML = leagueInfo[0];
                
                leagueDisplayHeaderDiv = document.createElement('div');
                leagueDisplayHeaderDiv.setAttribute('id', 'league-display-header-div');
                leagueDisplay.appendChild(leagueDisplayHeaderDiv);
                leagueDisplayHeaderDiv.appendChild(leagueDisplayHeader);

                createTeamSwitch = document.createElement('button');
                createTeamSwitch.setAttribute('id', 'create-team-switch');
                createTeamSwitch.innerHTML = 'Create Team';

                viewTeamsSwitch = document.createElement('button');
                viewTeamsSwitch.setAttribute('id', 'view-teams-switch');
                viewTeamsSwitch.innerHTML = 'View Teams';

                leagueInfoDiv = document.createElement('div');
                leagueInfoDiv.setAttribute('id','league-info');
                organizationNameHeader = document.createElement('h3');
                organizationNameHeader.innerHTML = leagueInfo[2];
                leagueDescription = document.createElement('p');
                leagueDescription.innerHTML = leagueInfo[1];
                leagueInfoDiv.appendChild(organizationNameHeader);
                leagueInfoDiv.appendChild(leagueDescription);
                leagueDisplay.appendChild(leagueInfoDiv);
                
                displaySwitches = document.createElement('div');
                displaySwitches.setAttribute('id', 'display-switches');
                leagueDisplay.appendChild(displaySwitches);

                displaySwitches.appendChild(viewTeamsSwitch);
                displaySwitches.appendChild(createTeamSwitch);
                createTeamDisplay = document.createElement('div');
                createTeamDisplay.setAttribute('id', 'create-team-display');
                leagueDisplay.appendChild(createTeamDisplay);
                createTeamDisplay.style.display = 'none';

                createTeamInputs = document.createElement('div');
                createTeamInputs.setAttribute('id', 'create-team-inputs');
                createTeamDisplay.appendChild(createTeamInputs);
                teamName = document.createElement('label');
                teamName.for = 'team-name';
                teamName.innerHTML = 'Team Name';

                teamNameInput = document.createElement('input');
                teamNameInput.setAttribute('id','team-name');

                email = document.createElement('label');
                email.for = 'email';
                email.innerHTML = 'Email';

                emailInput = document.createElement('input');
                emailInput.setAttribute('id','email');

                createTeamInputs.appendChild(teamName);
                createTeamInputs.appendChild(teamNameInput);
                createTeamInputs.appendChild(email);
                createTeamInputs.appendChild(emailInput);
                createTeamButton = document.createElement('button');
                createTeamButton.setAttribute('id', 'create-team-button');
                createTeamButton.innerHTML = 'Create';
                createTeamInputs.appendChild(createTeamButton);

                viewTeamsDisplay = document.createElement('div');
                viewTeamsDisplay.setAttribute('id', 'view-teams-display');
                leagueDisplay.appendChild(viewTeamsDisplay);

                populateLeagueTeams(league, organization);


                createTeamButton.onclick = function(){
                    if (teamNameInput.value == '' || emailInput.value == ''){
                        return;
                    }
                    console.log(teamNameInput.value, emailInput.value, leagueInfo[0], leagueInfo[2]);
                    createTeam(teamNameInput.value, emailInput.value, leagueInfo[0], leagueInfo[2]);
                    teamNameInput.value = '';
                    emailInput.value = '';
                }

                viewTeamsSwitch.onclick = function(){
                    createTeamDisplay.style.display = 'none';
                    viewTeamsDisplay.style.display = 'block';
                    createTeamSwitch.style.backgroundColor = 'buttonface';
                    viewTeamsSwitch.style.backgroundColor = 'rgb(252, 123, 4)';
                }

                createTeamSwitch.onclick = function(){
                    createTeamDisplay.style.display = 'block';
                    viewTeamsDisplay.style.display = 'none';
                    createTeamSwitch.style.backgroundColor = 'rgb(252, 123, 4)';
                    viewTeamsSwitch.style.backgroundColor = 'buttonface';
                }

                closeButton = document.createElement('img');
                closeButton.src = 'images/x-button.png';
                closeButton.setAttribute('id', 'close-button');
                leagueDisplayHeaderDiv.appendChild(closeButton);
                closeButton.onclick = function(){
                    closeLeagueDisplay();
                }
            });
        }
    })
}

function createTeam(teamName, email, league, organization){
    data = "team_name=" + teamName + "&email=" + email + "&league=" + league + "&organization=" + organization;
    fetch('https://intramurall.onrender.com/teams',{
        credentials: "include",
        method: 'POST',
        body: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        if (response.status == 201){
            console.log("Team created.", response.status)
        }
    })
}

function closeLeagueDisplay(){
    leagueDisplay = document.querySelector("#league-display");
    leagueDisplay.remove();
}

function populateLeagueTeams(league, organization){
    fetch("https://intramurall.onrender.com/teams?league=" + league + "&organization=" + organization, {
        credentials: "include"
    }).then(function(response){
        if (response.status == 200){
            response.json().then(function(data){
                teams = data;
                teamsTable = document.createElement('table');
                teamsTable.setAttribute('class', 'table table-bordered table-striped');
                viewTeamsDisplay = document.querySelector("#view-teams-display");
                viewTeamsDisplay.appendChild(teamsTable);

                teamsTableHeader = document.createElement('tr');
                var teamHeader = document.createElement('th');
                teamHeader.innerHTML = 'Team';
                teamsTableHeader.appendChild(teamHeader);
                var teamCaptainHeader = document.createElement('th');
                teamCaptainHeader.innerHTML = 'Team Captain';
                teamsTableHeader.appendChild(teamCaptainHeader);
                header = document.createElement('th');
                teamsTableHeader.appendChild(header);
                teamsTable.appendChild(teamsTableHeader);
                tbody = document.createElement('tbody');
                teams.forEach( function(team){
                    const row = document.createElement('tr');
    
                    // Create and append cells for each data item
                    for (const key in team) {
                      const cell = document.createElement('td');
                      cell.textContent = team[key];
                      row.appendChild(cell);
                    }
                    const cell = document.createElement('td');
                    cell.setAttribute('class', 'view-team-cell');
                    viewButton = document.createElement('button');
                    viewButton.setAttribute('class', 'view-team-button');
                    // viewButton.setAttribute('id', i);
                    viewButton.innerHTML = 'View';
                    cell.append(viewButton);
                    row.appendChild(cell);
                    tbody.appendChild(row);
                });
                teamsTable.appendChild(tbody);
                [...document.getElementsByClassName('view-team-button')].forEach(x =>{
                    x.addEventListener('click', function(){
                        viewTeam(this);
                    })
                });
            })
        }
    })
}

function viewTeam(button){
    viewTeamDetails = document.createElement('div');
    viewTeamDetails.setAttribute('id', 'view-team-details');
    wrapper = document.querySelector('#wrapper');
    wrapper.appendChild(viewTeamDetails);
    teamDisplayHeader = document.createElement('h2');
    teamDisplayHeader.setAttribute('id', 'team-display-header');
    teamDisplayHeader.innerHTML = button.parentElement.parentElement.children[0].textContent;
    teamDisplayHeaderDiv = document.createElement('div');
    teamDisplayHeaderDiv.setAttribute('id', 'team-display-header-div');
    viewTeamDetails.appendChild(teamDisplayHeaderDiv);
    teamDisplayHeaderDiv.appendChild(teamDisplayHeader);
    closeButton = document.createElement('img');
    closeButton.src = 'images/x-button.png';
    closeButton.setAttribute('id', 'close-button-team');
    teamDisplayHeaderDiv.appendChild(closeButton);
    closeButton.onclick = function(){
        closeTeamDisplay();
    }
    rosterDisplay = document.createElement('div');
    rosterDisplay.setAttribute('id', 'roster-display');
    viewTeamDetails.appendChild(rosterDisplay);
    rosterHeader = document.createElement('h3');
    rosterHeader.setAttribute('id', 'roster-header');
    rosterHeader.innerHTML = 'Roster';
    viewTeamDetails.appendChild(rosterHeader);
    
    scheduleDisplay = document.createElement('div');
    scheduleDisplay.setAttribute('id', 'schedule-display');
    viewTeamDetails.appendChild(scheduleDisplay);
    scheduleHeader = document.createElement('h3');
    scheduleHeader.setAttribute('id', 'schedule-header');
    scheduleHeader.innerHTML = 'Schedule';
    viewTeamDetails.appendChild(scheduleHeader);
    loadRoster(button.parentElement.parentElement.children[0].textContent, document.getElementById("league-display-header-div").children[0].textContent);
    loadSchedule(button.parentElement.parentElement.children[0].textContent, document.getElementById("league-display-header-div").children[0].textContent);

    joinTeamButton = document.createElement('button');
    joinTeamButton.setAttribute('id', 'join-team-button');
    joinTeamButton.setAttribute('class', 'buttons');
    joinTeamButton.innerHTML = 'Join Team';
    joinTeamButton.onclick = function(){
        data = "team_name=" + button.parentElement.parentElement.children[0].textContent;
        data += "&league=" + document.getElementById("league-display-header-div").children[0].textContent;
        fetch('https://intramurall.onrender.com/rosters',{
            method: 'POST',
            credentials: 'include',
            body: data,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            if (response.status == 201){
                console.log('Joined team');
                loadRoster(button.parentElement.parentElement.children[0].textContent, document.getElementById("league-display-header-div").children[0].textContent);
            }
        })
    }
    viewTeamDetails.appendChild(joinTeamButton);
}

function loadSchedule(team, league){
    var scheduleDisplay = document.querySelector('#schedule-display');

    fetch('https://intramurall.onrender.com/games?league=' + encodeURIComponent(league) + '&team=' + encodeURIComponent(team), {
        credentials: "include"
    }).then(function(response) {
        if (response.status == 200) {
            response.json().then(function(games) {
                if (Object.keys(games).length === 0) {
                    // if player is not scheduled for any upcoming games
                    message = document.createElement('p');
                    message.innerHTML = "No schedule.";
                    message.style.textAlign = 'center';
                    scheduleDisplay.appendChild(message);
                } else {
                    var currentDate = new Date();
                    currentDate.setHours(0, 0, 0, 0);
                    for (var day in games) {
                        date = new Date(day);
                        date.setDate(date.getDate() + 1);
                        if (date >= currentDate || date.toDateString() == currentDate.toDateString()) {
                            dateElement = document.createElement('h3');
                            dateElement.setAttribute('class', 'upcoming-games-date');
                            dateElement.innerHTML = formatDate(day);
                            scheduleDisplay.appendChild(dateElement);
    
                            gamesList = document.createElement('ul');
                            gamesList.setAttribute('class', 'games-list');
    
                            games[day].forEach(function(game) {
                                gameLi = document.createElement('li');
                                gameLi.innerHTML = game['teams'][0] + " vs. " + game['teams'][1] + " at " + convertToStandardTime(game['time']);
                                gamesList.appendChild(gameLi);
                            });
                            scheduleDisplay.appendChild(gamesList);
                        }
                    }
                }
            });
        } else {
            // if player is not scheduled for any upcoming games
            message = document.createElement('p');
            message.innerHTML = "No schedule.";
            message.style.textAlign = 'center';
            scheduleDisplay.appendChild(message);
        }
    });
}

function loadRoster(team, league){
    var rosterTable = document.createElement('table');
    rosterTable.setAttribute('id', 'roster-table');
    rosterTable.setAttribute('class', 'table table-bordered table-striped');

    rosterDisplay = document.querySelector('#roster-display');

    rosterDisplay.appendChild(rosterTable);
    tbody = document.createElement('tbody');

    tr = document.createElement('tr');
    th = document.createElement('th');

    th.innerHTML = 'Player';
    tr.appendChild(th);
    tbody.appendChild(tr);

    fetch('https://intramurall.onrender.com/rosters?league=' + encodeURIComponent(league) + '&team=' + encodeURIComponent(team),{
        credentials: 'include'
    }).then(function(response){
        if (response.status == 200){
            response.json().then(function(roster){
                roster.forEach(function(player){
                    row = document.createElement('tr');
                    td = document.createElement('td');
                    td.innerHTML = player;
                    row.appendChild(td);
                   
                    tbody.appendChild(row);
                })
                rosterTable.appendChild(tbody);
            })
        } else {
            message = document.createElement('p');
            message.innerHTML = "No players.";
            message.style.textAlign = 'center';
            rosterDisplay.appendChild(message);
        }
    });
}

function closeTeamDisplay(){
    teamDisplay = document.querySelector("#view-team-details");
    teamDisplay.remove();
}

function isAdmin(){
    fetch("https://intramurall.onrender.com/roles",{
        credentials: "include",
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        if (response.status == 201){
            var adminIcon = document.getElementById("admin-icon");

            if (adminIcon !== null){
                return;
            }

            var upcomingGames = document.getElementById("upcoming-games-div");
            if (upcomingGames.children.length > 1){
                upcomingGames.remove();

                upcomingGames = document.createElement("div");
                upcomingGames.setAttribute('id', 'upcoming-games-div');

                message = document.createElement('p');
                message.innerHTML = 'No upcoming games.';
                message.style.textAlign = "center";
                upcomingGames.appendChild(message);

                container = document.querySelector("#upcoming-games-container");
                container.appendChild(upcomingGames);
            }

            var div = document.createElement('div');
            div.setAttribute('class', 'nav-buttons');
            var adminIcon = document.createElement("img");
            adminIcon.setAttribute('id', 'admin-icon');
            adminIcon.src = "/images/Admin-Icon.svg";
            var navList = document.querySelector("#nav-list")
            div.appendChild(adminIcon);
            p = document.createElement("p");
            p.innerHTML = 'Admin';
            div.appendChild(p);
            navList.appendChild(div);
            adminIcon.onclick = function(){
                var adminLeaguesContainer = document.querySelector("#admin-leagues-container");
                if (!(adminLeaguesContainer)){
                    adminPortal();
                }else{
                    clearPage();
                    displayAdminPortal();
                }
            }
        } else {
            var adminLeagues = document.querySelector('#admin-leagues-container');
            if (adminLeagues){
                adminLeagues.remove();
            }

            var adminScheduler = document.querySelector('#admin-scheduler-container')
            if(adminScheduler){
                adminScheduler.remove();
            }

            var adminStats = document.querySelector('#admin-stats-container')
            if(adminStats){
                adminStats.remove();
            }

            var adminIcon = document.getElementById("admin-icon");
            if (adminIcon !== null){
                adminIcon.remove();

                var navList = document.querySelector("#nav-list");
                navList.removeChild(navList.lastElementChild);
                
                upcomingGames = document.querySelector("#upcoming-games-div");
                if (upcomingGames){
                    upcomingGames.remove();
                }
                upcomingGames = document.createElement('div');
                upcomingGames.setAttribute("id","upcoming-games-div");
                upcomingGamesContainer.appendChild(upcomingGames);

                fetch('https://intramurall.onrender.com/users/games', {
                    credentials: "include"
                }).then(function(response) {
                    if (response.status == 200) {
                        response.json().then(function(games) {
                            if (Object.keys(games).length === 0) {
                                // if player is not scheduled for any upcoming games
                                message = document.createElement('p');
                                message.innerHTML = "No upcoming games.";
                                message.style.textAlign = 'center';
                                upcomingGames.appendChild(message);
                            } else {
                                var currentDate = new Date();
                                currentDate.setHours(0, 0, 0, 0);
                                for (var day in games) {
                                    date = new Date(day);
                                    date.setDate(date.getDate() + 1);
                                    if (date >= currentDate || date.toDateString() == currentDate.toDateString()) {
                                        dateElement = document.createElement('h3');
                                        dateElement.setAttribute('class', 'upcoming-games-date');
                                        dateElement.innerHTML = formatDate(day);
                                        upcomingGames.appendChild(dateElement);
                
                                        gamesList = document.createElement('ul');
                                        gamesList.setAttribute('class', 'games-list');
                
                                        games[day].forEach(function(game) {
                                            gameLi = document.createElement('li');
                                            gameLi.innerHTML = game['teams'][0] + " vs. " + game['teams'][1] + " at " + convertToStandardTime(game['time']);
                                            gamesList.appendChild(gameLi);
                                        });
                                        upcomingGames.appendChild(gamesList);
                                    }
                                }
                            }
                        });
                    } else {
                        // if player is not scheduled for any upcoming games
                        message = document.createElement('p');
                        message.innerHTML = "No upcoming games.";
                        message.style.textAlign = 'center';
                        upcomingGames.appendChild(message);
                    }
                });
            }
        }
    })
}

function adminPortal(){
    leagues = document.querySelector('#admin-leagues-container');
    if (leagues){
        leagues.remove();
    }

    schedules = document.querySelector('#admin-scheduler-container');
    if (schedules){
        schedules.remove();
    }

    document.querySelector("#leagues-container").style.display = 'none';
    document.querySelector("#upcoming-games-container").style.display = 'none';
    document.querySelector("#welcome-header").innerHTML = "IntramurALL Admin";
    var adminLeaguesContainer = document.createElement('div');
    adminLeaguesContainer.setAttribute('id', 'admin-leagues-container');
    document.querySelector('#wrapper').appendChild(adminLeaguesContainer);
    var adminLeaguesHeader = document.createElement('h2');
    adminLeaguesHeader.innerHTML = 'My Leagues';
    adminLeaguesContainer.appendChild(adminLeaguesHeader);
    adminLeaguesHeader.setAttribute('id', 'admin-leagues-header');
    adminLeagues = document.createElement('div');
    adminLeagues.setAttribute('id', 'admin-leagues');
    adminLeaguesContainer.appendChild(adminLeagues);
    var addLeaguesContainer = document.createElement('div');
    addLeaguesContainer.setAttribute('id', 'add-leagues-container');
    adminLeaguesContainer.appendChild(addLeaguesContainer);
    var addLeaguesHeader = document.createElement('h2');
    addLeaguesHeader.setAttribute('id', 'add-leagues-header');
    addLeaguesHeader.innerHTML = 'Add Leagues';
    addLeaguesContainer.appendChild(addLeaguesHeader);
    var leagueInputsLeft = document.createElement('div');
    leagueInputsLeft.setAttribute('id', 'league-inputs-left');
    addLeaguesContainer.appendChild(leagueInputsLeft);
    var leagueName = document.createElement('p');
    leagueName.setAttribute('class', 'add-league-input-titles');
    leagueName.innerHTML = 'League Name';
    leagueInputsLeft.appendChild(leagueName);
    var leagueNameInput = document.createElement('input');
    leagueNameInput.setAttribute('id', 'add-league-input');
    leagueInputsLeft.appendChild(leagueNameInput);
    var organization = document.createElement('p');
    organization.innerHTML = 'Organization';
    organization.setAttribute('class', 'add-league-input-titles');
    leagueInputsLeft.appendChild(organization);
    var organizationInput = document.createElement('input');
    organizationInput.setAttribute('id', 'organization-input');
    leagueInputsLeft.appendChild(organizationInput);
    var description = document.createElement('p');
    description.setAttribute('class', 'add-league-input-titles');
    description.innerHTML = 'Description';
    leagueInputsLeft.appendChild(description);
    var descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('id', 'add-description-input');
    leagueInputsLeft.appendChild(descriptionInput);

    var leagueInputsRight= document.createElement('div');
    leagueInputsRight.setAttribute('id', 'league-inputs-right');
    addLeaguesContainer.appendChild(leagueInputsRight);
    var startDate = document.createElement('p');
    startDate.setAttribute('class', 'add-league-input-titles');
    startDate.innerHTML = 'Start Date';
    leagueInputsRight.appendChild(startDate);
    var startDateInput = document.createElement('input');
    startDateInput.setAttribute('id', 'start-date-input');
    startDateInput.type = 'date';
    leagueInputsRight.appendChild(startDateInput);
    var endDate = document.createElement('p');
    endDate.setAttribute('class', 'add-league-input-titles');
    endDate.innerHTML = 'End Date';
    leagueInputsRight.appendChild(endDate);
    var endDateInput = document.createElement('input');
    endDateInput.setAttribute('id', 'end-date-input');
    endDateInput.type = 'date';
    leagueInputsRight.appendChild(endDateInput);
    var registrationDate = document.createElement('p');
    registrationDate.setAttribute('class', 'add-league-input-titles');
    registrationDate.innerHTML = 'Registration Date';
    leagueInputsRight.appendChild(registrationDate);
    var registrationDateInput = document.createElement('input');
    registrationDateInput.setAttribute('id', 'registration-date-input');
    registrationDateInput.type = 'date';
    leagueInputsRight.appendChild(registrationDateInput);
    var sport = document.createElement('p');
    sport.setAttribute('class', 'add-league-input-titles');
    sport.innerHTML = 'Sport';
    leagueInputsRight.appendChild(sport);
    var sportSelector = document.createElement('select');
    sportSelector.setAttribute('id','sport-selector');
    sportSelectorHTML = `
        <option value="">Select</option>
        <option value="football">Football</option>
        <option value="basketball">Basketball</option>
        <option value="soccer">Soccer</option>
    `
    sportSelector.innerHTML = sportSelectorHTML;
    leagueInputsRight.appendChild(sportSelector);
    
    var addLeaguesButton = document.createElement('button');
    addLeaguesButton.setAttribute('id', 'add-leagues-button');
    addLeaguesButton.innerHTML = 'Add League';
    addLeaguesContainer.appendChild(addLeaguesButton)
    addLeaguesButton.onclick = function(){
        addLeague(leagueNameInput.value, descriptionInput.value, organizationInput.value, startDateInput.value, endDateInput.value, registrationDateInput.value, sportSelector.value);
    }
    displayAdminLeagues();

    // create admin league scheduler
    const adminSchedulerContainer = document.createElement('div');
    adminSchedulerContainer.setAttribute('id', 'admin-scheduler-container');
    wrapper.appendChild(adminSchedulerContainer);
    wrapper.style.gridTemplateRows = "repeat(15, 150px)";
    const adminSchedulerHeader = document.createElement('h2');
    adminSchedulerHeader.innerHTML = 'Manage Schedule';
    adminSchedulerContainer.appendChild(adminSchedulerHeader);
    adminSchedulerHeader.setAttribute('id', 'admin-scheduler-header');

    // create league selector
    const leagueSelectorContainer = document.createElement('div');
    leagueSelectorContainer.setAttribute('id', 'league-selector-container');
    adminSchedulerContainer.appendChild(leagueSelectorContainer);

    // create admin schedule display
    const leagueScheduleDisplay = document.createElement('div');
    leagueScheduleDisplay.setAttribute('id', 'league-schedule-display');
    adminSchedulerContainer.appendChild(leagueScheduleDisplay);

    // create scheduler inputs
    const selectLeague = document.createElement('select');
    selectLeague.setAttribute('id', 'select-league');
    adminSchedulerContainer.appendChild(selectLeague);

    fetch("https://intramurall.onrender.com/admin-leagues",{
        credentials: 'include',
    }).then(function(response){
        response.json().then(function(data){
            const leagues = data;
    
            // Clear any existing options
            selectLeague.innerHTML = '';
    
            // Create and append an empty option
            var emptyOption = document.createElement('option');
            emptyOption.setAttribute('value', '');
            emptyOption.textContent = 'Select a league';
            selectLeague.appendChild(emptyOption);
    
            // Populate the dropdown with fetched data
            leagues.forEach(function(league){
                var option = document.createElement('option');
                option.setAttribute('class', 'schedule-inputs');
                option.value = league[0];
                option.textContent = league[0];
                selectLeague.appendChild(option);
            });
        });
    });

    selectLeague.onchange = function(){
        var selectedLeague = document.getElementById('select-league').value;
        if (selectedLeague == ''){
            var scheduleInputsHTML = '';
            leagueSelectorContainer.innerHTML = scheduleInputsHTML;
            calendar = document.querySelector('.calendar');
                if (calendar){
                    calendar.remove();
                }

            scheduleTable = document.querySelector('#admin-schedule-table');
            if (scheduleTable){
                scheduleTable.remove();
            }
            return;
        } else {
            scheduleExists(selectedLeague).then(function(response){
                if (response != false){
                    scheduleInputsHTML = `
                    <h3>Schedule Created</h3>
                    <button id="schedule-delete">Delete</button>
                    `
                    schedule = response[0][2]
                    leagueSelectorContainer.innerHTML = scheduleInputsHTML;

                    // populate schedule into calendar display
                    schedule = JSON.parse(schedule)

                    var scheduleTable = `
                        <table id="admin-schedule-table" class="table table-bordered table-striped">
                            <tr>
                                <th>Time</th>
                                <th>Home</th>
                                <th>Away</th>
                            </tr>
                        </table>
                    `

                    scheduleDelete = document.querySelector('#schedule-delete');
                    if (scheduleDelete){
                        scheduleDelete.onclick = function(){
                            input = confirm('Do you want to delete this schedule?');
                            if (input){
                                fetch('https://intramurall.onrender.com/schedules?league=' + encodeURIComponent(selectedLeague),{
                                    method: "DELETE",
                                    credentials: "include"
                                }).then(function(response){
                                    if (response.status == 200){
                                        scheduleTable = document.querySelector('#admin-schedule-table');
                                        if (scheduleTable){
                                            scheduleTable.remove();
                                        }
                                        scheduleInputsHTML = `
                                            <h2>Create Schedule</h2>
                                            <label for="start-date">Start Date:</label>
                                            <input type="date" id='start-date'></input>
                                            <label for="end-date">End Date:</label>
                                            <input type="date" id='end-date'></input>
                                            <label>Games Played On:</label>
                                            <div class="dropdown-checkbox">
                                                <button class="dropdown-checkbox-btn">Select Days</button>
                                                <div class="dropdown-checkbox-content">
                                                    <label><input type="checkbox" value=6> Sunday</label>
                                                    <label><input type="checkbox" value=0> Monday</label>
                                                    <label><input type="checkbox" value=1> Tuesday</label>
                                                    <label><input type="checkbox" value=2> Wednesday</label>
                                                    <label><input type="checkbox" value=3> Thursday</label>
                                                    <label><input type="checkbox" value=4> Friday</label>
                                                    <label><input type="checkbox" value=5> Saturday</label>
                                                </div>
                                            </div>
                                            <label for="num-fields">Number of fields/courts:</label>
                                            <input type="number" min="1" id="num-fields" name="num-fields">
                                            <label for="start-time">Start Time:</label>
                                            <input type="time" id="start-time" name="start-time">
                        
                                            <label for="end-time">End Time:</label>
                                            <input type="time" id="end-time" name="end-time">
                                            <button id="create-schedule-button">Create</button>
                                        `;
                                
                                        leagueSelectorContainer.innerHTML = scheduleInputsHTML;
                                        
                                        // JavaScript to handle the dropdown checkbox functionality
                                        const dropdownBtn = document.querySelector('.dropdown-checkbox-btn');
                                        const dropdownContent = document.querySelector('.dropdown-checkbox-content');
                        
                                        dropdownBtn.addEventListener('click', function(event) {
                                            dropdownContent.classList.toggle('show');
                                            event.stopPropagation();
                                        });
                        
                                        dropdownContent.addEventListener('click', function(event) {
                                            event.stopPropagation();
                                        });
                        
                                        // Close the dropdown when the user clicks outside of it
                                        window.addEventListener('click', function() {
                                            dropdownContent.classList.remove('show');
                                        });
                        
                                        fetch("https://intramurall.onrender.com/admin-leagues/" + selectedLeague,{
                                            credentials: 'include',
                                        }).then(function(response){
                                            response.json().then(function(data){
                                                var startDate = document.getElementById('start-date');
                                                var endDate = document.getElementById('end-date');
                        
                                                league = data[0];
                                                startDate.value = league[3];
                                                endDate.value = league[4];
                                                startDate.disabled = true;
                                                endDate.disabled = true;
                                                calendar = document.querySelector('.calendar');
                                                if (calendar){
                                                    calendar.remove();
                                                }
                                                createAdminCalendar(leagueScheduleDisplay, league[3]);
                                            })
                                        })
                        
                        
                                        const createButton = document.getElementById('create-schedule-button');
                                        createButton.addEventListener('click', function() {
                        
                                            const startDate = document.getElementById('start-date').value;
                                            const endDate = document.getElementById('end-date').value;
                                            const startTime = document.getElementById('start-time').value;
                                            const endTime = document.getElementById('end-time').value;
                                            const daysCheckboxes = document.querySelectorAll('.dropdown-checkbox-content input[type="checkbox"]');
                                            
                                            console.log(startDate, endDate, startTime, endTime);
                                            // Check if any input field is empty
                                            if (startDate === '' || endDate === '' || startTime === '' || endTime === '') {
                                                alert('Please fill in all fields before creating the schedule.');
                                                return;
                                            }
                        
                                            // Check if at least one checkbox is checked
                                            let atLeastOneChecked = false;
                                            for (let i = 0; i < daysCheckboxes.length; i++) {
                                                if (daysCheckboxes[i].checked) {
                                                    atLeastOneChecked = true;
                                                    break;
                                                }
                                            }
                        
                                            if (!atLeastOneChecked) {
                                                alert('Please select at least one day for the schedule.');
                                                return;
                                            }
                                            createSchedule();
                                        });
                                    }
                                })
                            }
                        }
                    }

                    leagueScheduleDisplay.innerHTML = scheduleTable;
                    
                    var table = document.querySelector("#admin-schedule-table");

                    for (let key in schedule) {
                        var day = schedule[key];
                        var dateRow = document.createElement('tr');
                        td = document.createElement('td');
                        td.innerHTML = formatDate(key);
                        dateRow.appendChild(td);
                        dateRow.setAttribute('class', 'date-row');
                        tbody = document.createElement('tbody');
                        tbody.appendChild(dateRow);
                        for (let time in day) {
                            if (day[time].length > 0){
                                var games = day[time];
                                for (let game in games){
                                    var row = document.createElement('tr');
                                    var gameTime = document.createElement('td');
                                    gameTime.innerHTML = convertToStandardTime(time);
                                    var home = document.createElement('td');
                                    home.innerHTML = games[game][0];

                                    var away = document.createElement('td');
                                    away.innerHTML = games[game][1];

                                    row.appendChild(gameTime);
                                    row.appendChild(home);
                                    row.appendChild(away);
                                    tbody.appendChild(row);
                                }
                            }
                        }
                        table.appendChild(tbody);
                    }
                    
                    
                } else {
                    scheduleTable = document.querySelector('#admin-schedule-table');
                    if (scheduleTable){
                        scheduleTable.remove();
                    }
                    scheduleInputsHTML = `
                        <h2>Create Schedule</h2>
                        <label for="start-date">Start Date:</label>
                        <input type="date" id='start-date'></input>
                        <label for="end-date">End Date:</label>
                        <input type="date" id='end-date'></input>
                        <label>Games Played On:</label>
                        <div class="dropdown-checkbox">
                            <button class="dropdown-checkbox-btn">Select Days</button>
                            <div class="dropdown-checkbox-content">
                                <label><input type="checkbox" value=6> Sunday</label>
                                <label><input type="checkbox" value=0> Monday</label>
                                <label><input type="checkbox" value=1> Tuesday</label>
                                <label><input type="checkbox" value=2> Wednesday</label>
                                <label><input type="checkbox" value=3> Thursday</label>
                                <label><input type="checkbox" value=4> Friday</label>
                                <label><input type="checkbox" value=5> Saturday</label>
                            </div>
                        </div>
                        <label for="num-fields">Number of fields/courts:</label>
                        <input type="number" min="1" id="num-fields" name="num-fields">
                        <label for="start-time">Start Time:</label>
                        <input type="time" id="start-time" name="start-time">
    
                        <label for="end-time">End Time:</label>
                        <input type="time" id="end-time" name="end-time">
                        <button id="create-schedule-button">Create</button>
                    `;
            
                    leagueSelectorContainer.innerHTML = scheduleInputsHTML;
                    
                    // JavaScript to handle the dropdown checkbox functionality
                    const dropdownBtn = document.querySelector('.dropdown-checkbox-btn');
                    const dropdownContent = document.querySelector('.dropdown-checkbox-content');
    
                    dropdownBtn.addEventListener('click', function(event) {
                        dropdownContent.classList.toggle('show');
                        event.stopPropagation();
                    });
    
                    dropdownContent.addEventListener('click', function(event) {
                        event.stopPropagation();
                    });
    
                    // Close the dropdown when the user clicks outside of it
                    window.addEventListener('click', function() {
                        dropdownContent.classList.remove('show');
                    });
    
                    fetch("https://intramurall.onrender.com/admin-leagues/" + selectedLeague,{
                        credentials: 'include',
                    }).then(function(response){
                        response.json().then(function(data){
                            var startDate = document.getElementById('start-date');
                            var endDate = document.getElementById('end-date');
    
                            league = data[0];
                            startDate.value = league[3];
                            endDate.value = league[4];
                            startDate.disabled = true;
                            endDate.disabled = true;
                            calendar = document.querySelector('.calendar');
                            if (calendar){
                                calendar.remove();
                            }
                            createAdminCalendar(leagueScheduleDisplay, league[3]);
                        })
                    })
    
    
                    const createButton = document.getElementById('create-schedule-button');
                    createButton.addEventListener('click', function() {
    
                        const startDate = document.getElementById('start-date').value;
                        const endDate = document.getElementById('end-date').value;
                        const startTime = document.getElementById('start-time').value;
                        const endTime = document.getElementById('end-time').value;
                        const daysCheckboxes = document.querySelectorAll('.dropdown-checkbox-content input[type="checkbox"]');
                        
                        console.log(startDate, endDate, startTime, endTime);
                        // Check if any input field is empty
                        if (startDate === '' || endDate === '' || startTime === '' || endTime === '') {
                            alert('Please fill in all fields before creating the schedule.');
                            return;
                        }
    
                        // Check if at least one checkbox is checked
                        let atLeastOneChecked = false;
                        for (let i = 0; i < daysCheckboxes.length; i++) {
                            if (daysCheckboxes[i].checked) {
                                atLeastOneChecked = true;
                                break;
                            }
                        }
    
                        if (!atLeastOneChecked) {
                            alert('Please select at least one day for the schedule.');
                            return;
                        }
                        createSchedule();
                    });
                }
            });
        }
    }
    createStatsManager();
}

function createStatsManager() {
    adminStatsContainer = document.querySelector('#admin-stats-container');
    if (adminStatsContainer){
        adminStatsContainer.remove();
    }

    var adminStatsContainer = document.createElement('div');
    adminStatsContainer.setAttribute('id', 'admin-stats-container');

    statsContainerHTML = `
        <h2 id="admin-stats-header" >Manage Stats</h2>
        <select id="select-league-stats"><select>
        <div id="stat-input-container"></div>
    `

    adminStatsContainer.innerHTML = statsContainerHTML;

    wrapper.appendChild(adminStatsContainer);

    selectLeagueStats = document.querySelector("#select-league-stats");
    fetch("https://intramurall.onrender.com/admin-leagues",{
        credentials: 'include',
    }).then(function(response){
        response.json().then(function(data){
            const leagues = data;
    
            // Clear any existing options
            selectLeagueStats.innerHTML = '';
    
            // Create and append an empty option
            var emptyOption = document.createElement('option');
            emptyOption.setAttribute('value', '');
            emptyOption.textContent = 'Select a league';
            selectLeagueStats.appendChild(emptyOption);
    
            // Populate the dropdown with fetched data
            leagues.forEach(function(league){
                var option = document.createElement('option');
                option.setAttribute('class', 'stat-inputs');
                option.value = league[0];
                option.textContent = league[0];
                selectLeagueStats.appendChild(option);
            });
        });
    });

    selectLeagueStats.onchange = function(){
        if (selectLeagueStats.value == ''){
            var statInputContainer = document.querySelector("#stat-input-container");
            statInputContainer.innerHTML = '';

            var teamSelector = document.querySelector("#select-team-stats");
            if (teamSelector){
                teamSelector.remove();
            }

            submitStats = document.querySelector('#submit-stats-button');
            if (submitStats){
                submitStats.remove();
            }
            selectLeagueStats.style.gridColumn = "3 / 5";
            return;
        } else {
            submitStats = document.querySelector('#submit-stats-button');
            if (submitStats){
                submitStats.remove();
            }
            var teamSelector = document.querySelector("#select-team-stats");
            selectLeagueStats.style.gridColumn = "2 / 4";

            var league = encodeURIComponent(selectLeagueStats.value);
            fetch("https://intramurall.onrender.com/sports?league=" + league, {
                credentials: 'include'
            }).then(function(response){
                if (response.status == 200){
                    response.json().then( function(sport){
                        sport = sport[0];

                        var inputs = getStatInputs(sport);
                        var statInputContainer = document.querySelector("#stat-input-container");
                        statInputContainer.innerHTML = inputs;
                        statInputContainer.children[0].setAttribute('id', 'stat-input-table');
                        statInputContainer.children[0].setAttribute('class', 'table table-bordered table-striped')

                        fetch("https://intramurall.onrender.com/teams?league=" + league, {
                            credentials: 'include'
                        }).then(function(response){
                            if (response.status == 200){
                                response.json().then( function(teams){
                                    var teamSelector = document.querySelector("#select-team-stats");
                                    if (teamSelector){
                                        teamSelector.remove();
                                    }


                                    var selectTeamStats = document.createElement('select');
                                    selectTeamStats.setAttribute('id', 'select-team-stats');

                                    var emptyOption = document.createElement('option');
                                    emptyOption.setAttribute('value', '');
                                    emptyOption.textContent = 'Select a team';
                                    selectTeamStats.appendChild(emptyOption);
                            
                                    // Populate the dropdown with fetched data
                                    teams.forEach(function(team){
                                        var option = document.createElement('option');
                                        option.setAttribute('class', 'stat-inputs');
                                        option.value = team[0];
                                        option.textContent = team[0];
                                        selectTeamStats.appendChild(option);
                                    });
                                    adminStatsContainer.appendChild(selectTeamStats);

                                    selectTeamStats.onchange = function(){
                                        if (selectTeamStats.value == ''){
                                            submitStats = document.querySelector('#submit-stats-button');
                                            if (submitStats){
                                                submitStats.remove();
                                            }

                                            if (statInputTable.children.length > 1) {
                                                for (let i = statInputTable.children.length - 1; i > 0; i--) {
                                                    statInputTable.children[i].remove();
                                                }
                                            }
                                        } else {
                                            if (!document.querySelector("#submit-stats-button")){
                                                submitStats = document.createElement('button');
                                                submitStats.setAttribute('id', 'submit-stats-button');
                                                submitStats.innerHTML = "Submit";
                                                adminStatsContainer.appendChild(submitStats);
                                            }

                                            fetch("https://intramurall.onrender.com/rosters?league=" + encodeURIComponent(selectLeagueStats.value) + "&team=" + encodeURIComponent(selectTeamStats.value), {
                                                credentials: 'include'
                                            }).then(function(response){
                                                if (response.status == 200){
                                                    response.json().then(function(roster){
                                                        
                                                        tbody = document.createElement('tbody');
                                                        roster.forEach(function(player){
                                                            sth = document.querySelector("#stats-table-headers");
                                                            var numCol = sth.children.length;

                                                            var row = document.createElement('tr');
                                                            playerField = document.createElement('td');
                                                            playerField.innerHTML = player;
                                                            row.appendChild(playerField);

                                                            inputHTML = `
                                                                <input type="number" min="0" value="0" class="stat-inputs">
                                                            `
                                                            // for loop over each stat column
                                                            for (i = 0; i < numCol - 1; i++){
                                                                td = document.createElement('td');
                                                                td.innerHTML = inputHTML;
                                                                row.appendChild(td);
                                                            }

                                                            
                                                            tbody.appendChild(row);
                                                        })
                                                        statInputTable = document.querySelector("#stat-input-table");
                                                        statInputTable.appendChild(tbody);
                                                    })
                                                } else {
                                                    if (statInputTable.children.length > 1) {
                                                        for (let i = statInputTable.children.length - 1; i > 0; i--) {
                                                            statInputTable.children[i].remove();
                                                        }
                                                    }

                                                    submitStats = document.querySelector('#submit-stats-button');
                                                    if (submitStats){
                                                        submitStats.remove();
                                                    }
                                                }
                                            })
                                            submitStats.onclick = function(){
                                                var stats = [];
                                                let inputs = Array.from(statInputTable.children).slice(1);
                                                
                                                for (let i = 0; i < inputs.length; i++){
                                                    let playerStats = {};
                                                    playerRow = inputs[i].children;

                                                    var playerName = playerRow[0].textContent.replace(/\n/g, "");
                                                    playerName.trim();

                                                    playerStats["Player"] = playerName;
                                                    for (let j = 1; j < playerRow.length; j++){
                                                        let stat = playerRow[j].children[0].value;
                                                        playerStats[statInputTable.children[0].children[0].children[j].textContent] = stat
                                                    }
                                                    stats.push(playerStats);
                                                }
                                                
                                                fetch('https://intramurall.onrender.com/stats?sport=' + sport + "&league=" + encodeURIComponent(selectLeagueStats.value) + "&team=" + encodeURIComponent(selectTeamStats.value),{
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                    },
                                                    body: JSON.stringify(stats),
                                                }).then(function(response){
                                                    if (response.status == 201){
                                                        // clear all inputs
                                                        console.log("Successfully added stats.");
                                                    } else {
                                                        // display error
                                                        console.log("Error with stats.");
                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                            } else{
                                selectLeagueStats.style.gridColumn = "3 / 5";
                                var teamSelector = document.querySelector("#select-team-stats");
                                if (teamSelector){
                                    teamSelector.remove();
                                }
                            }
                        })
                        
                    })
                } 
            })
        }
    }
}


// returns the proper stat inputs for the given sport
function getStatInputs(sport){
    if (sport == 'football'){
        var footballHTML = `
            <table border="1">
                <tr id="stats-table-headers">
                    <th>Player</th>
                    <th>Touchdowns</th>
                    <th>Catches</th>
                    <th>Passing Touchdowns</th>
                    <th>Sacks</th>
                    <th>Interceptions</th>
                </tr>
            </table>
        `
        return footballHTML;
    }

    if (sport == 'soccer'){
        var soccerHTML = `
            <table border="1">
                <tr id="stats-table-headers">
                    <th>Player</th>
                    <th>Goals</th>
                    <th>Assists</th>
                </tr>
            </table>
        `
        return soccerHTML;
    }

    if (sport == 'basketball'){
        var basketballHTML = `
            <table border="1">
                <tr id="stats-table-headers">
                    <th>Player</th>
                    <th>Points</th>
                    <th>Rebounds</th>
                    <th>Assists</th>
                    <th>Steals</th>
                    <th>Blocks</th>
                </tr>
            </table>
        `
        return basketballHTML;
    } else {
        return;
    }
}

function getStatLeaders(sport){
    if (sport == 'football'){
        var footballHTML = `
            <table border="1">
                <tr id="stats-table-headers">
                    <th>Stat</th>
                    <th>Leader</th>
                </tr>
                <tr>
                    <td>Touchdowns</td>
                    <td>None</td>
                </tr>
                <tr>
                    <td>Catches</td>
                    <td>None</td>
                </tr>
                <tr>
                    <td>Passing Touchdowns</td>
                    <td>None</td>
                </tr>
                <tr>
                    <td>Sacks</td>
                    <td>None</td>
                </tr>
                <tr>
                    <td>Interceptions</td>
                    <td>None</td>
                </tr>
            </table>
        `
        return footballHTML;
    }

    if (sport == 'soccer'){
        var soccerHTML = `
            <table border="1">
                <tr id="stats-table-headers">
                    <th>Stat</th>
                    <th>Leader</th>
                </tr>
                <tr>
                    <td>Goals</td>
                    <td>None</td>
                </tr>
                <tr>
                    <td>Assists</td>
                    <td>None</td>
                </tr>
            </table>
        `
        return soccerHTML;
    }

    if (sport == 'basketball'){
        var basketballHTML = `
            <table border="1">
                <tr id="stats-table-headers">
                    <th>Stat</th>
                    <th>Leader</th>
                </tr>
                <tr>
                    <td>Points</td>
                    <td>None</td>
                </tr>
                <tr>
                    <td>Rebounds</td>
                    <td>None</td>
                </tr>
                <tr>
                    <td>Assists</td>
                    <td>None</td>
                </tr>  
                <tr>
                    <td>Steals</td>
                    <td>None</td>
                </tr> 
                <tr>
                    <td>Blocks</td>
                    <td>None</td>
                </tr>
            </table>
        `
        return basketballHTML;
    } else {
        return;
    }
}

function createSchedule() {
    var startDate = document.getElementById('start-date').value;
    var endDate = document.getElementById('end-date').value;
    var days = [];
    var checkboxes = document.querySelectorAll('.dropdown-checkbox-content input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            days.push(parseInt(checkbox.value)); // Parse value to integer
        }
    });
    var numFields = document.getElementById('num-fields').value;
    var startTime = document.getElementById('start-time').value;
    var endTime = document.getElementById('end-time').value;
    var selectedLeague = document.getElementById('select-league').value;
    let league_name = encodeURIComponent(selectedLeague)

    // fetches the organization name so that the schedule can be created
    fetch('https://intramurall.onrender.com/admin-leagues/' + league_name, {
        credentials: 'include'
    }).then(function(response){
        if (response.status == 200){
            response.json().then(function(organization){
                var org = organization[0][2];
                
                // Constructing form data
                var formData = new URLSearchParams();
                formData.append('start_date', startDate);
                formData.append('end_date', endDate);
                formData.append('days', JSON.stringify(days));
                formData.append('num_fields', numFields);
                formData.append('league', selectedLeague);
                formData.append('organization', org);
                formData.append('start_time', startTime);
                formData.append('end_time', endTime);

                fetch('https://intramurall.onrender.com/schedules',{
                    credentials: 'include',
                    method: 'POST',
                    body: formData, // Use formData here
                    headers: {
                    }
                }).then(function(response){
                    if (response.status == 201){
                        console.log("Successfully created schedule");
                    }
                });
            });
        }
    });
}

// checks if schedule already exists for selected team, returns T/F
function scheduleExists(selectedLeague) {
    return new Promise((resolve, reject) => {
        var league = encodeURIComponent(selectedLeague);
        fetch('https://intramurall.onrender.com/schedules/' + league, {
            credentials: 'include'
        }).then(function (response) {
            if (response.status == 200) {
                response.json().then(function (schedule) {
                    if (Object.keys(schedule).length === 0 && schedule.constructor === Object) {
                        resolve(false);
                    } else {
                        resolve(schedule);
                    }
                });
            } else {
                reject("Error fetching schedule");
            }
        }).catch(function (error) {
            reject(error);
        });
    });
}

function formatDate(dateString) {
    var parts = dateString.split('-');
    
    // Rearrange the parts to the desired format (mm-dd-yyyy)
    var formattedDate = parts[1] + '-' + parts[2] + '-' + parts[0];
    
    return formattedDate;
}

function convertToStandardTime(militaryTime) {
    // Splitting the military time string into hours and minutes
    const [hours, minutes] = militaryTime.split(':').map(Number);

    // Determining AM/PM
    const period = hours >= 12 ? 'PM' : 'AM';

    let standardHours = hours % 12;
    standardHours = standardHours || 12;

    const standardMinutes = (minutes < 10 ? '0' : '') + minutes;

    const standardTime = `${standardHours}:${standardMinutes} ${period}`;

    return standardTime;
}

function convertToMilitaryTime(standardTime) {
    // Splitting the standard time string into hours, minutes, and period (AM/PM)
    const [time, period] = standardTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let militaryHours = hours % 12;
    militaryHours += period === 'PM' ? 12 : 0;
    militaryHours = militaryHours.toString().padStart(2, '0'); // Adding leading zero if necessary

    const militaryMinutes = (minutes < 10 ? '0' : '') + minutes;

    const militaryTime = `${militaryHours}:${militaryMinutes}`;

    return militaryTime;
}


function addLeague(league, description, organization, start, end, registration, sport){
    data = "league_name=" + league + "&" + "description=" + description + "&" + "organization=" + organization + "&startDate=" + start + "&endDate=" + end + "&registration=" + registration + "&sport=" + sport;
    console.log(data);
    fetch("https://intramurall.onrender.com/leagues",{
        credentials: 'include',
        method: 'POST',
        body: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        if (response.status == 201){
            console.log("League added:", league)
            
            const row = document.createElement('tr');
            
            const cell1 = document.createElement('td');
            cell1.textContent = document.querySelector('#add-league-input').value;
            row.appendChild(cell1);

            const cell2 = document.createElement('td');
            cell2.textContent = document.querySelector('#add-description-input').value;
            row.appendChild(cell2);

            const cell3 = document.createElement('td');
            cell3.textContent = document.querySelector('#organization-input').value;
            row.appendChild(cell3);

            const cell4 = document.createElement('td');
            cell4.textContent = formatDate(document.querySelector('#start-date-input').value);
            row.appendChild(cell4);

            const cell5 = document.createElement('td');
            cell5.textContent = formatDate(document.querySelector('#end-date-input').value);
            row.appendChild(cell5);

            const cell6 = document.createElement('td');
            cell6.textContent = formatDate(document.querySelector('#registration-date-input').value);
            row.appendChild(cell6);

            const cell7 = document.createElement('td');
            cell7.setAttribute('class', 'modify-league-cell');
            cell7.style.padding = '15px';
        
            deleteButton = document.createElement('button');
            deleteButton.setAttribute('class', 'delete-league-button');
            deleteButton.innerHTML = 'Delete';
            cell7.append(deleteButton);
            row.append(cell7)
                
            adminLeaguesTable = document.querySelector("#admin-leagues-table");
            adminLeaguesTable.querySelector('tbody').appendChild(row);
            document.querySelector('#add-description-input').value = '';
            document.querySelector('#add-league-input').value = '';
            document.querySelector('#organization-input').value = '';
            document.querySelector('#start-date-input').value = '';
            document.querySelector('#end-date-input').value = '';
            document.querySelector('#registration-date-input').value = '';
            document.querySelector("#sport-selector").selectedIndex = 0;

            adminPortal();
            createStatsManager();
        }
    })
}


function displayAdminLeagues(){
    var table = document.querySelector('#admin-leagues-table');
    if (table){
        table.remove();
    }
    fetch("https://intramurall.onrender.com/admin-leagues",{
        credentials: 'include',
    }).then(function(response){
        response.json().then(function(data){
            leagues = data;
            adminLeaguesTable = document.createElement('table');
            adminLeaguesTable.setAttribute('class', 'table table-bordered table-striped');
            adminLeaguesTable.setAttribute('id', 'admin-leagues-table');
            adminLeagues = document.querySelector("#admin-leagues");
            adminLeagues.appendChild(adminLeaguesTable);
            leaguesTableHeader = document.createElement('tr');
            var leagueHeader = document.createElement('th');
            leagueHeader.innerHTML = 'League';
            leaguesTableHeader.appendChild(leagueHeader);
            var descriptionHeader = document.createElement('th');
            descriptionHeader.innerHTML = 'Description';
            leaguesTableHeader.appendChild(descriptionHeader);
            var organizationHeader = document.createElement('th');
            organizationHeader.innerHTML = 'Organization';
            leaguesTableHeader.appendChild(organizationHeader);
            var startHeader = document.createElement('th');
            startHeader.innerHTML = 'Start';
            leaguesTableHeader.appendChild(startHeader);
            var endHeader = document.createElement('th');
            endHeader.innerHTML = 'End';
            leaguesTableHeader.appendChild(endHeader);
            var registrationHeader = document.createElement('th');
            registrationHeader.innerHTML = 'Registration Open';
            leaguesTableHeader.appendChild(registrationHeader);
            header = document.createElement('th');
            leaguesTableHeader.appendChild(header);
            adminLeaguesTable.appendChild(leaguesTableHeader);
            
            tbody = document.createElement('tbody');
            leagues.forEach(function(league) {
                const row = document.createElement('tr');
            
                // Create and append cells for each data item
                for (const key in league) {
                    const cell = document.createElement('td');
                    if (isDateInFormat(league[key], "yyyy-mm-dd")) {
                        cell.textContent = formatDate(league[key]);
                    } else {
                    cell.textContent = league[key];
                    }
                    row.appendChild(cell);
                }
            
                const cell = document.createElement('td');
                cell.setAttribute('class', 'modify-league-cell');
                cell.style.padding = '15px';
            
                deleteButton = document.createElement('button');
                deleteButton.setAttribute('class', 'delete-league-button');
                deleteButton.innerHTML = 'Delete';
                cell.append(deleteButton);
            
                row.appendChild(cell);
            
                tbody.appendChild(row);

                deleteButton.onclick = function(){
                    var parentRow = deleteButton.parentElement.parentElement;

                    league = parentRow.children[0].innerHTML;
                    organization = parentRow.children[2].innerHTML;

                    fetch('https://intramurall.onrender.com/admin-leagues?league=' + encodeURIComponent(league) + '&organization=' + encodeURIComponent(organization), {
                        method: 'DELETE',
                        credentials: 'include'
                    }).then(function(response){
                        if (response.status == 200){
                            console.log('Removed league');
                            adminPortal();
                            createStatsManager();
                        } else {
                            console.log('Unable to remove league');
                        }
                    })
                }
            });
            adminLeaguesTable.appendChild(tbody);
        })
    })
}

function isDateInFormat(dateString, format) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

function createAdminCalendar(display, startDate) {
    console.log("Start date: ", startDate);
    var calendar = document.createElement('div');
    calendar.setAttribute('class', 'calendar');

    const [startYear, startMonth] = startDate.split('-').map(Number);
    const startDateObject = new Date(startYear, startMonth - 1, 1);
    const daysInMonth = new Date(startYear, startMonth, 0).getDate();
    const firstDayOfMonth = startDateObject.getDay();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create calendar HTML
    let calendarHTML = `
        <div class="month">
            <img src="images/left-arrow.svg" id="left-arrow-calendar"></img>
            <h2>${startDateObject.toLocaleString('default', { month: 'long' })} ${startYear}</h2>
            <img src="images/right-arrow.svg" id="right-arrow-calendar"></img>
        </div>
        <div class="days">
    `;

    // Add empty placeholders for the days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarHTML += `<div class="day"></div>`;
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        calendarHTML += `<div class="day">${i}</div>`;
    }
    calendarHTML += `</div>`;
    display.appendChild(calendar);
    calendar.innerHTML = calendarHTML;

    leftArrow = document.querySelector("#left-arrow-calendar");
    leftArrow.onclick = function(){
        calendar = document.querySelector('.calendar');
        if (calendar){
            calendar.remove();
        }
        newDate = decreaseMonth(startDate);
        createAdminCalendar(display, newDate);
    }

    rightArrow = document.querySelector("#right-arrow-calendar");
    rightArrow.onclick = function(){
        calendar = document.querySelector('.calendar');
        if (calendar){
            calendar.remove();
        }
        newDate = increaseMonth(startDate);
        createAdminCalendar(display, newDate);
    }
}

function decreaseMonth(dateString) {
    // Split the string by '-'
    let dateParts = dateString.split('-');
    
    // Convert the parts to integers
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]);
    let day = 1;

    month = month - 1;
    if (month == 0){
        month = 12;
        year = year - 1;
    }
    
    return `${String(year)}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}



function increaseMonth(dateString) {
    // Split the string by '-'
    let dateParts = dateString.split('-');
    
    // Convert the parts to integers
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]);
    let day = 1;

    month = month + 1;
    if (month == 13){
        month = 1;
        year = year + 1;
    }
    
    return `${String(year)}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function clearPage(){
    var wrapper = document.querySelector("#wrapper");
    var divsInsideWrapper = wrapper.querySelectorAll("div");

    for (var i = 0; i < divsInsideWrapper.length; i++){
        if (!divsInsideWrapper[i].classList.contains('carousel') && !divsInsideWrapper[i].classList.contains('carousel-inner') && !divsInsideWrapper[i].classList.contains('carousel-item')) {
            divsInsideWrapper[i].style.display = "none";
        }
    }
    if (document.querySelector("#league-display")){
        leagueDisplay = document.querySelector("#league-display");
        leagueDisplay.remove();
    }
    if (window.innerWidth <= 767) {
        wrapper.style.gridTemplateRows = "100px 100px repeat(6, 200px)";
    } else {
        wrapper.style.gridTemplateRows = "150px repeat(5, 1fr)";
    }

    if (document.querySelector('#my-team-display')){
        document.querySelector('#my-team-display').remove();
    }

    navButtons = document.getElementsByClassName('nav-buttons');
    for (var i = 0; i < navButtons.length; i++) {
        navButtons[i].style.display = 'flex';
    }
}

function displayHomePage(){
    if (window.innerWidth <= 767) {
        document.querySelector("#welcome-header-container").style.display = "flex";
    } else {
        document.querySelector("#welcome-header-container").style.display = "block";
    }
    document.querySelector("#leagues-container").style.display = "grid";
    document.querySelector("#upcoming-games-container").style.display = "grid";
    document.querySelector("#welcome-header").innerHTML = "Welcome to IntramurALL"
    document.querySelector("#organization-selector-container").style.display = 'block';
    document.querySelector("#leagues-table-container").style.display = 'block';
    document.querySelector("#upcoming-games-div").style.display = 'block';
}

function displayAdminPortal(){
    document.querySelector("#admin-leagues-container").style.display = "block";
    document.querySelector("#welcome-header-container").style.display = "block";
    document.querySelector("#admin-leagues").style.display = "block";
    document.querySelector("#add-leagues-container").style.display = "grid";
    document.querySelector("#welcome-header").innerHTML = "IntramurALL Admin";
    document.querySelector("#admin-scheduler-container").style.display = 'grid';
    document.querySelector("#league-inputs-left").style.display = "flex";
    document.querySelector("#league-inputs-right").style.display = "flex";
    document.querySelector("#league-schedule-display").style.display = 'block';
    document.querySelector("#league-selector-container").style.display = 'flex';
    document.querySelector("#admin-stats-container").style.display = 'grid';
    document.querySelector("#stat-input-container").style.display = 'block';

    var calendarElements = document.getElementsByClassName("calendar");
    for (var i = 0; i < calendarElements.length; i++) {
        calendarElements[i].style.display = 'block';
    }

    var daysElements = document.getElementsByClassName("days");
    for (var i = 0; i < daysElements.length; i++) {
        daysElements[i].style.display = 'grid';
    }

    var dayElements = document.getElementsByClassName("day");
    for (var i = 0; i < dayElements.length; i++) {
        dayElements[i].style.display = 'block';
    }

    var monthElements = document.getElementsByClassName("month");
    for (var i = 0; i < monthElements.length; i++) {
        monthElements[i].style.display = 'flex';
    }

    wrapper.style.gridTemplateRows = "repeat(15, 150px)";
}

function statsPage(){
    var statsContainer = document.createElement('div');
    statsContainer.setAttribute('id', 'stats-container');
    document.querySelector("#wrapper").appendChild(statsContainer);

    let statsHTML = `
    <h2 id="stats-header">Stats</h2>
    <h3 id="my-stats-header">My Stats</h3>
    <div id="my-stats-window"></div>
    <h3 id="stat-leaders-header">Stat Leaders</h3>
    <div id="league-leaders-window"></div>
    `
    statsContainer.innerHTML = statsHTML;
    var myStats = document.querySelector('#my-stats-window');

    fetch('https://intramurall.onrender.com/stats', {
        credentials: 'include'
    }).then(function(response) {
        if (response.status == 200) {
            response.json().then(function(stats) {
                let index = 0;
                let currentTable;

                stats.forEach(stat => {
                    let team = stat[3];
                    let league = stat[4];

                    // Check if it's the first row or if league/team has changed
                    if (index === 0 || stats[index - 1][3] !== team || stats[index - 1][4] !== league) {
                        // Create a new table
                        let p = document.createElement('h4');
                        p.innerHTML = "League: " + league + ", Team: " + team;
                        p.setAttribute('class', 'my-stat-headers');
                        myStats.appendChild(p);

                        let sport = stat[2];
                        currentTableHTML = getStatInputs(sport);
                        myStats.innerHTML += currentTableHTML


                        currentTable = myStats.lastElementChild;
                        myStats.lastElementChild.setAttribute('class', 'table table-bordered table-striped');
                    }

                    // Append the row to the current table
                    let tbody = currentTable.querySelector('tbody');
                    let row = document.createElement('tr');
                    let player = document.createElement('td');
                    player.innerHTML = stat[1];
                    row.appendChild(player);
                    for (let i = 6; i < stat.length; i++) {
                        if (stat[i] == null) {
                            continue;
                        }

                        let td = document.createElement('td');
                        td.innerHTML = stat[i];
                        row.appendChild(td);
                    }
                    tbody.appendChild(row);

                    index++;
                });
            })
        }
    })
    var statLeaders = document.querySelector("#league-leaders-window");

    fetch('https://intramurall.onrender.com/stats/leaders',{
        credentials: 'include'
    }).then(function(response){
        if (response.status == 200){
            response.json().then(function(leaders){
                leaders.forEach(function(league){
                    var table = getStatLeaders(league[0][0])
                    header = document.createElement('h4');
                    header.setAttribute('class', 'stat-leaders-header');
                    header.innerHTML = "League: " + league[0][2] + ", Organization: " + league[0][3];
                    statLeaders.appendChild(header);
                    statLeaders.innerHTML += table;
                    
                    statLeaders.lastElementChild.setAttribute('class', 'table table-bordered table-striped');

                    currentTable = statLeaders.lastElementChild;
                    rows = currentTable.children[0].children;
                    
                    for (let i = 1; i < rows.length; i++){
                        if (/\b0\b/.test(league[0][i + 3])){
                            continue;
                        } else {
                            rows[i].lastElementChild.innerHTML = league[0][i + 3];
                        }
                    }
                })
            })
        }
    })
}

function displayStatsPage(){
    document.querySelector('#stats-container').style.display = 'grid';
    document.querySelector('#my-stats-window').style.display = 'block';
    document.querySelector('#league-leaders-window').style.display = 'block';
}

function teamsPage(){
    var teamsContainer = document.createElement('div');
    teamsContainer.setAttribute('id', 'teams-container');

    var wrapper = document.querySelector("#wrapper");
    wrapper.appendChild(teamsContainer);

    let teamsHTML = `
    <h2 id="teams-header">My Teams</h2>
    <div id="my-teams-display"></div>
    `

    teamsContainer.innerHTML += teamsHTML;

    var myTeamsDisplay = document.querySelector('#my-teams-display');

    fetch('https://intramurall.onrender.com/teams/myteams',{
        credentials: 'include'
    }).then(function(response){
        if (response.status == 200){
            response.json().then(function(teams){
                console.log(teams);

                teams.forEach(function(team){
                    var teamElement = document.createElement('div');
                    teamElement.setAttribute('class', 'team-element');
                    teamInfo = document.createElement('div');
                    teamInfo.setAttribute('class', 'team-info');
                    team.forEach(function(info){
                        p = document.createElement('p');
                        p.setAttribute('class', 'my-team-info');
                        p.innerHTML = info;
                        teamInfo.appendChild(p);
                    })
                    teamElement.appendChild(teamInfo);
                    teamElement.innerHTML += `
                    <div class="team-info-headers">
                        <p>Team:</p>
                        <p>League:</p>
                        <p>Organization:</p>
                    </div>
                    `

                    teamElement.onclick = function(){
                        if (document.querySelector('#my-team-display')){
                            return;
                        }
                        myTeamDisplay = document.createElement('div');
                        myTeamDisplay.setAttribute('id', 'my-team-display');
                        let html = `
                            <div id="my-team-header-div">
                                <h2 id="my-team-display-header"></h2>
                                <img src="images/x-button.png" id="close-button-my-team">
                            </div>
                            <h3 id="my-team-roster-header">Roster</h3>
                            <div id="my-team-roster"></div>
                            <h3 id="my-team-schedule-header">Schedule</h3>
                            <div id="my-team-schedule"></div>
                        `
                        myTeamDisplay.innerHTML += html;
                        wrapper.appendChild(myTeamDisplay);
                        var close = document.querySelector('#close-button-my-team');
                        if (close){
                            close.onclick = function(){
                                myTeamDisplay.remove();
                            }
                        }

                        header = document.querySelector('#my-team-display-header');

                        let team = teamElement.children[0].children[0].textContent;
                        let league = teamElement.children[0].children[1].textContent;
                        let organization = teamElement.children[0].children[2].textContent;

                        header.innerHTML = team;

                        var myTeamRoster = document.querySelector('#my-team-roster');
                        var myTeamSchedule = document.querySelector('#my-team-schedule');

                        var myTeamRosterTable = document.createElement('table');
                        myTeamRosterTable.setAttribute('id', 'my-team-roster-table');
                        myTeamRosterTable.setAttribute('class', 'table table-bordered table-striped');

                        myTeamRoster.appendChild(myTeamRosterTable);
                        tbody = document.createElement('tbody');

                        tr = document.createElement('tr');
                        th = document.createElement('th');

                        th.innerHTML = 'Player';
                        tr.appendChild(th);
                        tbody.appendChild(tr);

                        // fetch request to get the roster
                        fetch('https://intramurall.onrender.com/rosters?league=' + encodeURIComponent(league) + '&team=' + encodeURIComponent(team) + '&organization=' + encodeURIComponent(organization),{
                            credentials: 'include'
                        }).then(function(response){
                            if (response.status == 200){
                                response.json().then(function(roster){
                                    roster.forEach(function(player){
                                        row = document.createElement('tr');
                                        td = document.createElement('td');
                                        td.innerHTML = player;
                                        row.appendChild(td);
                                       
                                        tbody.appendChild(row);
                                    })
                                    myTeamRosterTable.appendChild(tbody);
                                })
                            }
                        });


                        // fetch request to get the schedule
                        fetch('https://intramurall.onrender.com/games?league=' + encodeURIComponent(league) + '&team=' + encodeURIComponent(team) + '&organization=' + encodeURIComponent(organization), {
                            credentials: "include"
                        }).then(function(response) {
                            if (response.status == 200) {
                                response.json().then(function(games) {
                                    if (Object.keys(games).length === 0) {
                                        // if player is not scheduled for any upcoming games
                                        message = document.createElement('p');
                                        message.innerHTML = "No schedule.";
                                        message.style.textAlign = 'center';
                                        myTeamSchedule.appendChild(message);
                                    } else {
                                        var currentDate = new Date();
                                        currentDate.setHours(0, 0, 0, 0);
                                        for (var day in games) {
                                            date = new Date(day);
                                            date.setDate(date.getDate() + 1);
                                            if (date >= currentDate || date.toDateString() == currentDate.toDateString()) {
                                                dateElement = document.createElement('h3');
                                                dateElement.setAttribute('class', 'upcoming-games-date');
                                                dateElement.innerHTML = formatDate(day);
                                                myTeamSchedule.appendChild(dateElement);
                        
                                                gamesList = document.createElement('ul');
                                                gamesList.setAttribute('class', 'games-list');
                        
                                                games[day].forEach(function(game) {
                                                    gameLi = document.createElement('li');
                                                    gameLi.innerHTML = game['teams'][0] + " vs. " + game['teams'][1] + " at " + convertToStandardTime(game['time']);
                                                    gamesList.appendChild(gameLi);
                                                });
                                                myTeamSchedule.appendChild(gamesList);
                                            }
                                        }
                                    }
                                });
                            } else {
                                // if player is not scheduled for any upcoming games
                                message = document.createElement('p');
                                message.innerHTML = "No schedule.";
                                message.style.textAlign = 'center';
                                myTeamSchedule.appendChild(message);
                            }
                        });
                    }
                    myTeamsDisplay.appendChild(teamElement);
                })
            })
        }
    })
}

function displayTeamsPage(){
    document.querySelector('#teams-container').style.display = 'grid';
    teamElements = document.querySelectorAll('.team-element');
    teamElements.forEach(function(element){
        element.style.display = 'flex';
    })

    teamInfo = document.querySelectorAll('.team-info');
    teamInfo.forEach(function(element){
        element.style.display = 'flex';
    })

    teamHeader = document.querySelectorAll('.team-info-headers');
    teamHeader.forEach(function(element){
        element.style.display = 'flex';
    })
    document.querySelector('#my-teams-display').style.display = 'flex';
}


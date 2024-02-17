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
        fetch("http://localhost:8080/users", {
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
    fetch("http://localhost:8080/sessions",{
        credentials: "include",
        method: "POST",
        body: data,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    }).then(function (response){
        if (response.status == 201){
            login.style.display = 'none';
            var header = document.querySelector("#header")
            var wrapper = document.querySelector("#wrapper")
            var intramurallText = document.querySelector("#intramurall-text")
            wrapper.style.display = 'grid';
            wrapper.style.gridTemplateColumns = '150px 1fr 1fr 1fr 1fr 1fr 1fr';
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
    var navList = document.createElement("ul");
    navList.setAttribute('id', 'nav-list');
    header.appendChild(navList);
    var logo = document.createElement("img");
    logo.setAttribute('id', 'header-logo')
    logo.src = "/images/IntramurALL-Logo.svg";
    logo.style.height = 'auto';
    logo.style.width = '130px'
    navList.appendChild(logo);
    var homeIcon = document.createElement("img");
    homeIcon.setAttribute('id', 'home-icon');
    homeIcon.src = "/images/Home-Icon.svg";
    navList.appendChild(homeIcon);
    var homeIcon = document.querySelector("#home-icon");
    document.querySelector("#login-portal").style.display = 'none';
    homeIcon.onclick = function(){
        clearPage();
        displayHomePage();
    }
    var p = document.createElement("p");
    p.innerHTML = 'Home';
    navList.appendChild(p);
    var teamsIcon = document.createElement("img");
    teamsIcon.setAttribute('id', 'teams-icon');
    teamsIcon.src = "/images/Teams-Icon.svg";
    navList.appendChild(teamsIcon);
    p = document.createElement("p");
    p.innerHTML = 'Teams';
    navList.appendChild(p);
    var scheduleIcon = document.createElement("img");
    scheduleIcon.setAttribute('id', 'schedule-icon');
    scheduleIcon.src = "/images/Calendar-Icon.svg";
    navList.appendChild(scheduleIcon);
    p = document.createElement("p");
    p.innerHTML = 'Schedule';
    navList.appendChild(p);
    var statsIcon = document.createElement("img");
    statsIcon.setAttribute('id', 'stats-icon');
    statsIcon.src = "/images/Stats-Icon.svg";
    navList.appendChild(statsIcon);
    p = document.createElement("p");
    p.innerHTML = 'Stats';
    navList.appendChild(p);
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
    organizationSearch.placeholder = "Search By Organization"
    displayOrganizations();
    organizationSelectorContainer.appendChild(organizationSearch);
    leaguesTable = document.createElement('table');
    leaguesTable.setAttribute('id', 'leagues-table');
    leaguesTableContainer = document.createElement('div');
    leaguesTableContainer.setAttribute('id', 'leagues-table-container');
    leaguesContainer.appendChild(leaguesTableContainer);
    leaguesTableContainer.appendChild(leaguesTable);
    upcomingGamesContainer = document.createElement('div');
    upcomingGamesContainer.setAttribute('id', 'upcoming-games-container');
    wrapper.appendChild(upcomingGamesContainer);
    upcomingGamesHeader = document.createElement('h2');
    upcomingGamesHeader.setAttribute('id', 'upcoming-games-header');
    upcomingGamesHeader.innerHTML = "Upcoming Games";
    upcomingGamesContainer.appendChild(upcomingGamesHeader);
}

function displayOrganizations(){
    searchInput = organizationSearch.value;
    fetch("http://localhost:8080/organizations", {
        credentials: "include"
    }).then(function(response){
        if (response.status == 200){
            response.json().then(function(data){
                organizations = data;
                organizations.forEach( function(organization){
                    const row = document.createElement('tr');
    
                    // Create and append cells for each data item
                    for (const key in organization) {
                      const cell = document.createElement('td');
                      cell.textContent = organization[key];
                      row.appendChild(cell);
                    }
                    
                    leaguesTable.appendChild(row);
                });
            })
        }
    })
}

function loadDataFromServer(){
    fetch("http://localhost:8080/users",{
        credentials: "include"
    }).then(function(response){
        if (response.status == 200){
            login.style.display = 'none';
            var header = document.querySelector("#header")
            var wrapper = document.querySelector("#wrapper")
            var intramurallText = document.querySelector("#intramurall-text")
            wrapper.style.display = 'grid';
            wrapper.style.gridTemplateColumns = '150px 1fr 1fr 1fr 1fr 1fr 1fr';
            header.style.gridColumn = '0/1'
            header.style.gridRow = '0/-1'
            intramurallText.style.display = 'none';
            createHomePage();
            isAdmin();
        }
    })
}

function isAdmin(){
    fetch("http://localhost:8080/roles",{
        credentials: "include",
        method: "POST",
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    }).then(function(response){
        if (response.status == 201){
            var adminIcon = document.createElement("img");
            adminIcon.setAttribute('id', 'admin-icon');
            adminIcon.src = "/images/Admin-Icon.svg";
            var navList = document.querySelector("#nav-list")
            navList.appendChild(adminIcon);
            p = document.createElement("p");
            p.innerHTML = 'Admin';
            navList.appendChild(p);
            adminIcon.onclick = function(){
                var adminLeaguesContainer = document.querySelector("#admin-leagues-container");
                if (!(adminLeaguesContainer)){
                    adminPortal();
                }else{
                    clearPage();
                    displayAdminPortal();
                }
            }
        }
    })
}

function adminPortal(){
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
    var leagueName = document.createElement('p');
    leagueName.setAttribute('class', 'add-league-input-titles');
    leagueName.innerHTML = 'League Name';
    addLeaguesContainer.appendChild(leagueName);
    var leagueNameInput = document.createElement('input');
    leagueNameInput.setAttribute('id', 'add-league-input');
    addLeaguesContainer.appendChild(leagueNameInput);
    var organization = document.createElement('p');
    organization.innerHTML = 'Organization';
    organization.setAttribute('class', 'add-league-input-titles');
    addLeaguesContainer.appendChild(organization);
    var organizationInput = document.createElement('input');
    organizationInput.setAttribute('id', 'organization-input');
    addLeaguesContainer.appendChild(organizationInput);
    var description = document.createElement('p');
    description.setAttribute('class', 'add-league-input-titles');
    description.innerHTML = 'Description';
    addLeaguesContainer.appendChild(description);
    var descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('id', 'add-description-input');
    addLeaguesContainer.appendChild(descriptionInput);
    var addLeaguesButton = document.createElement('button');
    addLeaguesButton.setAttribute('id', 'add-leagues-button');
    addLeaguesButton.innerHTML = 'Add League';
    addLeaguesContainer.appendChild(addLeaguesButton)
    addLeaguesButton.onclick = function(){
        addLeague(leagueNameInput.value, descriptionInput.value, organizationInput.value);
    }
    displayAdminLeagues();
}

function addLeague(league, description, organization){
    data = "league_name=" + league + "&" + "description=" + description + "&" + "organization=" + organization;
    fetch("http://localhost:8080/leagues",{
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
                
            adminLeaguesTable = document.querySelector("#admin-leagues-table");
            adminLeaguesTable.appendChild(row);
            document.querySelector('#add-description-input').value = '';
            document.querySelector('#add-league-input').value = '';
            document.querySelector('#organization-input').value = '';
        }
    })
}


function displayAdminLeagues(){
    fetch("http://localhost:8080/admin-leagues",{
        credentials: 'include',
    }).then(function(response){
        response.json().then(function(data){
            leagues = data;
            adminLeaguesTable = document.createElement('table');
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
            adminLeaguesTable.appendChild(leaguesTableHeader);
            
            leagues.forEach( function(league){
                const row = document.createElement('tr');

                // Create and append cells for each data item
                for (const key in league) {
                  const cell = document.createElement('td');
                  cell.textContent = league[key];
                  row.appendChild(cell);
                }
              
                adminLeaguesTable.appendChild(row);
            });
        })
    })
}

// **Continue here, find way to clear existing containers and load landing page**

function clearPage(){
    var wrapper = document.querySelector("#wrapper");
    var divsInsideWrapper = wrapper.querySelectorAll("div");

    for (var i = 0; i < divsInsideWrapper.length; i++){
        divsInsideWrapper[i].style.display = "none";
    }
}

function displayHomePage(){
    document.querySelector("#welcome-header-container").style.display = "block";
    document.querySelector("#leagues-container").style.display = "block";
    document.querySelector("#upcoming-games-container").style.display = "block";
    document.querySelector("#welcome-header").innerHTML = "Welcome to IntramurALL"
    document.querySelector("#organization-selector-container").style.display = 'block';
    document.querySelector("#leagues-table-container").style.display = 'block';
}

function displayAdminPortal(){
    document.querySelector("#admin-leagues-container").style.display = "block";
    document.querySelector("#welcome-header-container").style.display = "block";
    document.querySelector("#admin-leagues").style.display = "block";
    document.querySelector("#add-leagues-container").style.display = "flex";
    document.querySelector("#welcome-header").innerHTML = "IntramurALL Admin";
}
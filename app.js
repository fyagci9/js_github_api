// 
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();


eventlisteners();

function eventlisteners(){
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);

}

function getData(e){

let username = nameInput.value.trim();
    if(username === ""){
        alert("lütfen geçerli bir kullanıcı adı girin.")
    }
    else{

        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                ui.showError("Kullanıcı Bulunamadı!!")
            }else{

                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);

            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput(); // input temizle
    e.preventDefault();
}


function clearAllSearched(){
 // tüm aramaları temizle 
    if (confirm("silmek istediğine emin misin?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
 
}

function getAllSearched(){
 // aramaları storageden al ve uiye ekle

 let users =Storage.getSearchedUsersFromStorage();

 let result = "";
 users.forEach(user=> {
    result += `<li class = "list-group-item">${user}</li>`;

 });

 lastUsers.innerHTML = result;


}
//Accounts array (with test accounts)
const accounts =[{name:"test",email:"test@test.com",password:"test",balance:0},
                 {name:"test2",email:"test2@test.com",password:"testt",balance:100}];


//Account creating interface html integrating codes
function caIntrf(){

    const indexCreateAccount =`
        <h1 class="l-color">APPBANK</h1>
        <section class="cntrzr">
            <p class="d-color">Username</p>
            <input type="text" placeholder="Please enter your username" class="username cntrzr" id="usernameInput">
            <p class="d-color">E-mail</p>
            <input type="email" placeholder="Please enter your e-mail adress" class="username cntrzr" id="userEmail">
            <p class="d-color">Password</p>
            <input type="password" placeholder="Please enter your password" class="password cntrzr" id="passwordInput">
            <input type="password" placeholder="Please enter your password again" class="password cntrzr" id="passwordCheck">
            <button class="cntrzr loginbtn l-color" onclick="createAccount()" id="caButton">CREATE</button>
        </section>
        <footer></footer>
        <script src="app.js"></script>`;

    document.getElementById('bank-intrf').innerHTML = indexCreateAccount;
}

//Account creating codes
function createAccount(){

    //Defining input values as objects
    let bankUsername = document.getElementById('usernameInput').value;
    let userMail = document.getElementById('userEmail').value;
    let bankUserpasswrd1 = document.getElementById('passwordInput').value;
    let bankUserpasswrd2 = document.getElementById('passwordCheck').value;

    //This checks if there is a blank input. If there is a blank input, it cancel the account creating
    if(bankUsername === "" || userMail === "" || bankUserpasswrd1 === "" || bankUserpasswrd2 === ""){
        alert("Nothing of the inputs cannot be blank.")
        document.getElementById('usernameInput').value = ''
        document.getElementById('userEmail').value = ''
        document.getElementById('passwordInput').value = ''
        document.getElementById('passwordCheck').value = ''
        return;
    };

    //This checks if the email is used or not
    for(let i = 0; i<accounts.length;i++){
        if(accounts[i].email === userMail){
            alert("This e-mail address is used")
            document.getElementById('userEmail').value = ''
            return;
        }
    };

    //This checks that two of the password inputs are written same values
    if(bankUserpasswrd1 !== bankUserpasswrd2){
        alert("Passwords must be same.")
        document.getElementById('passwordInput').reset()
        document.getElementById('passwordCheck').reset()
    };

    //This creates new account for array
    let newAccount = {
        name: bankUsername,
        email: userMail,
        password: bankUserpasswrd1,
        balance: 0
    };

    //And this puts new account to array
    accounts.push(newAccount);
    alert("The account has been created successfully");

   //Inserts HTML codes of login page
    const index = ` 
        <h1 class="l-color">APPBANK</h1>
        <section class="cntrzr">
            <p class="d-color cntrzr">Welcome to Appbank!</p>
            <p class="d-color">Username</p>
            <input type="text" placeholder="Please enter your username" class="username cntrzr" id="loginUsername">
            <p class="d-color">Password</p>
            <input type="password" placeholder="Please enter your password" class="password cntrzr" id="loginPassword">
            <button class="cntrzr loginbtn l-color" onclick="login()" id="loginButton">LOGIN</button>
            <span class="br"></span>
            <p class="cntrzr d-color">If you don't have an account</p>
            <button class="cntrzr cabtn l-color" onclick="caIntrf()">CREATE AN ACCOUNT</button>
        </section>
        <footer></footer>
        <script src="app.js"></script>`;
        document.getElementById('bank-intrf').innerHTML = index;
};

//This is for detecting the activated user.
//Activated accounts are inserted there and checked from there.
let activeUserArr = []

//Logining function
function login(){

    //Defining input values as objects 
    let lgn1 = document.getElementById('loginUsername').value; 
    let lgn2 = document.getElementById('loginPassword').value;

    //This checks if there is a blank input. If there is a blank input, it cancel the logining
    if(lgn1 === "" || lgn2 === ""){
        alert("Nothing of the inputs cannot be blank.")
        document.getElementById('loginUsername').value = ''
        document.getElementById('loginPassword').value = ''
        return;
    };

    //This participates all names in the array objects and put the names in a new array
    const accname = accounts.map(function(user){
        return user.name});

    //This checks the input value for if there is a account that have this name
    if(accname.includes(lgn1) !== true){
        alert("The user couldn't be found")
        return;
    };

    //This is for checking the both input values are right
    const accountCheck =[]

    //This puts 1 and 0 in the accountCheck array
    for(let q = 0;q<accounts.length;q++){
        if((lgn1 === accounts[q].name) === true && (lgn2 === accounts[q].password) === true){
            //If all the inputs are true for an account, it pushes 1 to accountCheck array
            accountCheck.push(1)
        }else{
            //If all the inputs are not true for an account, it pushes 0 to accountCheck array
            accountCheck.push(0)
        }
    };

    //This returns the value of amount of 1
    const accChckBINarray = accountCheck.filter(x => x==1).length;

    //This checks if all the inputs are true for a account
    if(accChckBINarray === 1){
    }else{
        alert("Password or Username is wrong.")
        return
    };

    //This creates a temporary object for activeUserArr (ln 100)
    let activeUser = null;

    //This adds activeUser to activeUserArr
    for (let i = 0; i < accounts.length; i++) {
        if (lgn1 === accounts[i].name && lgn2 === accounts[i].password) {
            // We found the user
            activeUser = accounts[i];
            activeUserArr.push(activeUser);
        };
    };

    //Inserts HTML codes of balance page
    for(let k = 0; k<accounts.length; k++){
        if(lgn1 === accounts[k].name && lgn2 === accounts[k].password){
                const indexLogin = `
                <h1 class="l-color">APPBANK</h1>
                <section class="cntrzr add1">
                    <div class="userInfo add1">
                        <p class="userNamee" id="activeUserr">Name:${activeUserArr[0].name}</p>
                        <p class="amountOfMoney" id="balancee">Balance:${activeUserArr[0].balance} <span style="color:rgb(0, 150, 0)">$</span></p>
                    </div>
                    <div class="amountInput cntrzr">
                        <p class="add2" id="amountOfCash">Amount:</p>
                        <input type="number" id="balanceChange">
                        <i class="fa-solid fa-dollar-sign dollarsign"></i>
                    </div>
                    <div class="cshbtndiv ">
                        <button class="l-color" onclick="addCash()">Add cash</button>
                        <button class="l-color" onclick="cashOut()">Cash out</button>
                        <button class="l-color" onclick="logout()">Log out</button>
                    </div>
                </section>
                <footer></footer>
                <script src="app.js"></script>`;
                document.getElementById('bank-intrf').innerHTML = indexLogin;
        };
    };
    
};

//Cash adding function
function addCash(){

    //Takes value of input of "Amount"
    let inputAmount = Math.abs(document.getElementById('balanceChange').value);

    //Adds "Amount" to old amount (.balance)
    let newAmount = Number(activeUserArr[0].balance)+Number(inputAmount);
    //Changes the old amount to new amount
    objIndex = activeUserArr.findIndex((obj => obj.name == activeUserArr[0].name));
    activeUserArr[objIndex].balance = newAmount;
    // console.log("After update: ", activeUserArr[objIndex]);
    //Re-new the balance text
    document.getElementById('balancee').innerHTML = `Balance:${newAmount} <span style="color:rgb(0, 150, 0)">$</span>`;
};

//Cash out function
function cashOut(){

     //Takes value of input of "Amount"
    let inputAmount = Math.abs(document.getElementById('balanceChange').value);

    //Withdraw "Amount" to old amount (.balance)
    let newAmount = Number(activeUserArr[0].balance)-Number(inputAmount);
    //Changes the old amount to new amount
    objIndex = activeUserArr.findIndex((obj => obj.name == activeUserArr[0].name));
    activeUserArr[objIndex].balance = newAmount;
    // console.log("After update: ", activeUserArr[objIndex]);
    //Re-new the balance text
    document.getElementById('balancee').innerHTML = `Balance:${newAmount} <span style="color:rgb(0, 150, 0)">$</span>`;

};

//Logging out function
function logout(){

    //Deletes old active user from array that we use for finding active user
    activeUserArr.pop();

    //Inserts HTML codes of login page
    const index = ` 
    <h1 class="l-color">APPBANK</h1>
    <section class="cntrzr" id="bank-intrf">
        <p class="d-color cntrzr">Welcome to Appbank!</p>
        <p class="d-color">Username</p>
        <input type="text" placeholder="Please enter your username" class="username cntrzr" id="loginUsername">
        <p class="d-color">Password</p>
        <input type="password" placeholder="Please enter your password" class="password cntrzr" id="loginPassword">
        <button class="cntrzr loginbtn l-color" onclick="login()" id="loginButton">LOGIN</button>
        <span class="br"></span>
        <p class="cntrzr d-color">If you don't have an account</p>
        <button class="cntrzr cabtn l-color" onclick="caIntrf()">CREATE AN ACCOUNT</button>
    </section>
    <footer></footer>
    <script src="app.js"></script>`;

    document.getElementById('bank-intrf').innerHTML = index;
}

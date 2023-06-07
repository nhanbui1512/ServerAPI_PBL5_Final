let arrow = document.querySelectorAll('.arrow');
for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener('click', (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle('showMenu');
    });
}

var formBusinessName = document.getElementById('form-business-name');
formBusinessName.style.display = 'none';
var formInfo = document.getElementById('form-info');

var inputEmail = document.getElementById('inputEmail');
var inputAddress = document.getElementById('inputAddress');
var inputPhone = document.getElementById('inputPhone');
var inputPassword = document.getElementById('inputPassword');
var inputConfirm = document.getElementById('inputConfirm');
var businessName = document.getElementById('businessName');

var listInput = [inputEmail, inputAddress, inputPhone, inputPassword, inputConfirm];

var validEmail = document.getElementById('email_isvalid');
var errConfirm = document.getElementById('err_confirm');
var errEmail = document.getElementById('err_email');

var nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', function () {
    validEmail.style.display = 'none';
    errConfirm.style.display = 'none';
    errEmail.style.display = 'none';

    var checkTrangThai = true;

    for (let i = 0; i < listInput.length; i++) {
        const element = listInput[i];
        var mess = element.parentElement.querySelector('p');
        mess.style.display = 'none';
    }

    for (let i = 0; i < listInput.length; i++) {
        const element = listInput[i];
        if (element.value == '') {
            var mess = element.parentElement.querySelector('p');
            mess.style.display = 'block';
            checkTrangThai = false;
            break;
        }
    }

    if (inputEmail.value != '' && inputConfirm != '') {
        if (inputPassword.value !== inputConfirm.value) {
            errConfirm.style.display = 'block';
            checkTrangThai = false;
        }

        if (inputEmail.value.includes('@gmail.com') == false) {
            errEmail.style.display = 'block';
            checkTrangThai = false;
        }
    }

    if (checkTrangThai == true) {
        formInfo.style.display = 'none';
        formBusinessName.style.display = 'block';
    }
});

var backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click', function () {
    formInfo.style.display = 'block';
    formBusinessName.style.display = 'none';
});

var submitBtn = document.getElementById('submit_btn');
var errBusinessName = document.getElementById('err_businessname');

const http = new XMLHttpRequest();

function HandleSubmit() {
    errBusinessName.style.display = 'none';
    if (businessName.value == '') {
        errBusinessName.style.display = 'block';
    } else {
        var Email = inputEmail.value;
        var UserName = businessName.value;
        var Password = inputPassword.value;
        var Address = inputAddress.value;
        var PhoneNumber = inputPhone.value;
        http.open('POST', 'http://localhost:3005/register/apply');
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.send(
            'UserName=' +
                UserName +
                '&Email=' +
                Email +
                '&password=' +
                Password +
                '&Address=' +
                Address +
                '&PhoneNumber=' +
                PhoneNumber,
        );

        http.onreadystatechange = function () {
            if (this.readyState == 4) {
                var response = JSON.parse(this.responseText);
                if (response.result == true) {
                    var regisSuccess = document.getElementById('regis_success');
                    regisSuccess.style.display = 'block';
                } else {
                    validEmail.style.display = 'block';
                    formBusinessName.style.display = 'none';
                    formInfo.style.display = 'block';
                }
            }
        };
    }
}

submitBtn.addEventListener('click', HandleSubmit);

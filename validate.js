$(function () {
    var dt_today = new Date();
    var month = dt_today.getMonth() + 1;
    var day = dt_today.getDate();
    var year = dt_today.getFullYear();

    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();

    var max_date = year + '-' + month + '-' + day;
    $('.birthdate').attr('max', max_date);
});

const set_error = (element, message) => {
    const input_control = element.parentElement;
    const error_display = input_control.querySelector('.error');

    error_display.innerText = message;
    input_control.classList.add('error');
    // input_control.classList.remove('success')
}

const set_success = element => {
    const input_control = element.parentElement;
    const error_display = input_control.querySelector('.error');

    error_display.innerText = '';
    // input_control.classList.add('success');
    input_control.classList.remove('error');

};

$('input').blur(function () {
    element = $(this)[0];
    message = element.title;
    pattern = new RegExp(element.pattern);
    if (element.value != "Save" && element.value != "Update" && element.value != "Clear" && element.value != "Cancle") {
        if (!pattern.test(element.value) || element.value == "") {
            set_error(element, message);
            input_validation = false;
            return false;
    
        } else {
            set_success(element);
            return true;
        }
    }
});

$('select').blur(function () {
    element = $(this)[0];
    message = element.title;

    if (element.options[element.selectedIndex].value == "") {
        set_error(element, message);
        return false;
    } else {
        set_success(element);
        return true;
    }
});

function radio_button_validation() {
    gender = $('input[type=radio][name=gender]');
    gender_error_message = $('div[name="gender_message"]')[0];
    var message = "You must select at least one option";

    if (!gender[0].checked && !gender[1].checked && !gender[2].checked) {
        set_error(gender_error_message, message);
        input_validation = false;
        return false;
    } else {
        set_success(gender_error_message);
        return true;
    }
}

function chekbox_validation() {
    hobby = $('input[type=checkbox][name=hobby]');
    hobby_error_message = $('div[name="hobby_message"]')[0];
    var message = "You must select at least one option";

    if (!hobby[0].checked && !hobby[1].checked && !hobby[2].checked) {
        set_error(hobby_error_message, message);
        return false;
    } else {
        set_success(hobby_error_message);
        return true;
    }
}

var form = $(".border");
function validate_form() {
    if (form.valid() && chekbox_validation() && radio_button_validation()) {
        _add()
    }else{
        chekbox_validation();
        radio_button_validation();
    }
}

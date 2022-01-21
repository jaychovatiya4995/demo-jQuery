$(document).ready(function () {
    show_recordes(all_data);
});

var all_data = [
    {
        id: 1,
        current_time: 'January 6, 2022',
        name: 'abhi',
        email: 'abhi@gmail.com',
        birthdate: '2000-01-14',
        gender: 'male',
        hobby: ['reading'],
        country: 'India',
        state: 'Gujarat',
        city: 'Surat'
    },
    {
        id: 2,
        current_time: 'January 6, 2022',
        name: 'abhishek savaliya',
        email: 'abhi@gmail.com',
        birthdate: '2006-01-14',
        gender: 'male',
        hobby: ['reading'],
        country: 'India',
        state: 'Gujarat',
        city: 'Surat'
    }
]

function calculate_age(yy, mm, dd) { // birthday is as date
    var birthdate = new Date(yy, mm, dd)
    var age_dif_ms = Date.now() - birthdate.getTime();
    var age_date = new Date(age_dif_ms); // miliseconds from epoch
    return Math.abs(age_date.getUTCFullYear() - 1970);
}


function show_recordes(all_data) {
    // data show in table view
    data = all_data

    var my_table = "<table name='mytable' class='table mt-4 table-bordered table-striped table-hover table-dark'>";
    my_table += "<tr>";

    header_name = ['Name', 'Email', 'Age', 'Gender', 'Hobby', 'Country', 'State', 'City', 'Action']

    for (i = 0; i < header_name.length; i++) {
        my_table += "<td style='width: 100px; color: red; text-align: center;'>" + header_name[i] + "</td>";
    }

    my_table += "</tr>";

    for (var key in data) {
        birthday = String(data[key].birthdate)
        yy = birthday.slice(0, 4)
        mm = birthday.slice(5, 7)
        dd = birthday.slice(8)

        age = calculate_age(yy, mm, dd)

        my_table += "<tr>";
        my_table += "<td class='g_name' name='g_name'>" + data[key].name + " </td>";
        my_table += "<td name='g_email'>" + data[key].email + "</td>";
        my_table += "<td name='g_age' >" + age + "</td>";
        my_table += "<td name='g_gender'>" + data[key].gender + "</td>";
        my_table += "<td name='g_hobby' >" + data[key].hobby + "</td>";
        my_table += "<td name='g_country'>" + data[key].country + "</td>";
        my_table += "<td name='g_state'>" + data[key].state + "</td>";
        my_table += "<td name='g_city'>" + data[key].city + "</td>";
        my_table += "<td class='btn'>" +
            "<button type='button' id='edit' onclick='_edit(this)' class='btn btn-outline-primary'>Edit</button>" +
            "<button type='button' id='delete' onclick='_delete(this)' class='btn btn-outline-danger m-1'>Delete</button>" +
            "<input type='hidden' name='id' value=" + data[key].id + ">" +
            "</td>"

        my_table += "</tr>";
    }
    my_table += "</table>";

    $(".view").html(my_table);
}

// delete record
function _delete(x) { // x paramenter has 'this' value 
    cell = x.closest('td')
    row = cell.closest('tr')
    row_index = row.rowIndex - 1;
    all_data.splice(row_index, 1);
    show_recordes(all_data);
    
}

// cleaer records
function _clear() {
    $("form")[0].reset();

    x = $('.remove');
    for (var i = 0; i < x.length; i++) {
        x[i].innerText = "";
    }

    clear = $('[name=clear]')[0];
    if (clear.value == 'Cancle') {
        $('[name=save]').val('Save');
        $('[name=clear]').val('Clear');
    }
}

function _add() {
    save_update = $('[name=save]');

    var current_time = new Date().getTime();
    var name = $('[name=username]').val();
    var email = $('[name=useremail]').val();
    var birthdate = $('[name=birthday]').val();
    var gender = $("[name='gender']:checked").val();

    var hobby = $('[name=hobby]:checked');
    selected_hobby = []
    for (let i = 0; i < hobby.length; i++) {
        selected_hobby[i] = hobby[i].value;
    }

    var country = $('[name=country]').val();
    var state = $('[name=state]').val();
    var city = $('[name=cities]').val();

    if (save_update.val() == 'Save') {  // add new records
        id = all_data.length + 1;
        record = ({
            'id': id,
            'current_time': current_time,
            'name': name,
            'email': email,
            'birthdate': birthdate,
            'gender': gender,
            'hobby': selected_hobby,
            'country': country,
            'state': state,
            'city': city
        });
        all_data.push(record);
    } else {                            // update new records
        all_data.forEach(function (obj) {
            if (object_id == obj.id) {
                obj.current_time = current_time;                     
                obj.name = name;
                obj.email = email;
                obj.birthdate = birthdate;
                obj.gender = gender;
                obj.hobby = selected_hobby;
                obj.country = country;
                obj.state = state;
                obj.city = city;
            }
        });
    }

    show_recordes(all_data);
    _clear();
}

function _edit(x) { // x paramenter has 'this' value 
    _clear();

    rows = $(x).closest('tr');
    object_id = rows.find("[name=id]").val();

    $('[name="save"]').val("Update");
    $('[name=clear]').val("Cancle");

    all_data.forEach(function (obj) {
        if (object_id == obj.id) {
            $('[name="username"]').val(obj.name);
            $('[name="useremail"]').val(obj.email);
            $('[name="birthday"]').val(obj.birthdate);
            gender = $('[name="gender"]');
            gender_value = []
            $('input:radio[name="gender"]').each(function () {
                gender_value.push($(this).val());
            });
            if (gender_value[0] == obj.gender) {
                gender[0].checked = true;
            } else if (gender_value[1] == obj.gender) {
                gender[1].checked = true;
            } else {
                gender[2].checked = true;
            }

            hobby = $('[name="hobby"]');
            for (i = 0; i < obj.hobby.length; i++) {
                if (obj.hobby[i] == hobby[0].value) {
                    hobby[0].checked = true;
                }
                if (obj.hobby[i] == hobby[1].value) {
                    hobby[1].checked = true;
                }
                if (obj.hobby[i] == hobby[2].value) {
                    hobby[2].checked = true;
                }
            }

            $('[name=country]').val(obj.country)
            countySel.onchange();
            $('[name=state]').val(obj.state)
            stateSel.onchange();
            $('[name=cities]').val(obj.city)
        }
    });
}

// function _search() {
$('.search').keyup(function () {
    var search_value = $('[name="search"]').val();

    if (!search_value == "") {
        filter_data = all_data.filter(function (obj) {
            return (obj.name.toLowerCase().includes(search_value.toLowerCase())) ||
                (obj.email.toLowerCase().includes(search_value.toLowerCase())) ||
                (obj.gender.toLowerCase().includes(search_value.toLowerCase())) ||
                (obj.hobby.toString().toLowerCase().includes(search_value.toLowerCase())) ||
                (obj.city.toLowerCase().includes(search_value.toLowerCase())) ||
                (obj.state.toLowerCase().includes(search_value.toLowerCase())) ||
                (obj.city.toLowerCase().includes(search_value.toLowerCase())) ||
                (calculate_age(obj.birthdate.slice(0, 4), obj.birthdate.slice(5, 7), obj.birthdate.slice(8)).toString().includes(search_value))
        })
        show_recordes(filter_data);
    } else {
        show_recordes(all_data);
    }
});

$('.sorting').click(function () {
    filter_value = $('[name="filter"]')[0];

    if (filter_value.value == 'Ascending') {
        $('[name="filter"]').val('Descending');
    } else {
        $('[name="filter"]').val('Ascending');
    }

    function sort_by_name(a, b) {
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();
        if (filter_value.value == 'Ascending') {
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        } else {
            return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
        }
    }
    all_data = all_data.sort(sort_by_name)
    show_recordes(all_data);
});

$(document).ready(function () {
    show_recordes();
    // input_field_validation();
    // select_field_validation();
});

var all_data = [
    {
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


function show_recordes() {
    // data show in table view
    data = all_data
    console.log(data);
    function calculate_age(yy, mm, dd) { // birthday is as date
        var birthdate = new Date(yy, mm, dd)
        var age_dif_ms = Date.now() - birthdate.getTime();
        var age_date = new Date(age_dif_ms); // miliseconds from epoch
        return Math.abs(age_date.getUTCFullYear() - 1970);
    }

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
        my_table += "<td name='g_name' style='width: 100px;'>" + data[key].name + " </td>";
        my_table += "<td name='g_email' style='width: 100px; text-align: right;'>" + data[key].email + "</td>";
        my_table += "<td name='g_age' style='width: 100px; text-align: right;'>" + age + "</td>";
        my_table += "<td name='g_gender' style='width: 100px; text-align: right;'>" + data[key].gender + "</td>";
        my_table += "<td name='g_hobby' style='width: 100px; text-align: right;'>" + data[key].hobby + "</td>";
        my_table += "<td name='g_country' style='width: 100px; text-align: right;'>" + data[key].country + "</td>";
        my_table += "<td name='g_state' style='width: 100px; text-align: right;'>" + data[key].state + "</td>";
        my_table += "<td name='g_city' style='width: 100px; text-align: right;'>" + data[key].city + "</td>";
        my_table += "<td style='width: 200px; text-align: center;'>" +
            "<button type='button' id='edit' onclick='_edit(this)' class='btn btn-outline-primary'>Edit</button>" +
            "<button type='button' id='delete' onclick='_delete(this)' class='btn btn-outline-danger m-1'>Delete</button>" +
            "</td>"

        my_table += "</tr>";
    }
    my_table += "</table>";

    document.getElementById("v").innerHTML = (my_table);
}

// delete record
function _delete(x) {
    // console.log('delete')
    cell = x.closest('td')
    row = cell.closest('tr')
    row_index = row.rowIndex - 1;
    all_data.splice(row_index, 1);
    show_recordes();
}

// cleaer records
function _clear() {
     
    x = document.getElementsByClassName('remove');
    for(var i=0; i < x.length; i++){
        x[i].innerText = "";
    }
    
    clear = document.getElementsByName('clear')[0]
    if (clear.value == 'Clear') {
        document.querySelector('form').reset();
    } else {
        document.querySelector('form').reset();

        document.getElementsByName('save')[0].value = 'Save'
        document.getElementsByName('clear')[0].value = 'Clear'
    }
}

// add records
function _add() {
    save_update = document.getElementsByName('save')[0];

    var current_time = new Date().getTime();
    var name = document.getElementsByName('username')[0].value;
    var email = document.getElementsByName('useremail')[0].value;
    var brithdate = document.getElementById('txtDate').value;
    var gender = $("input[type='radio'][name='gender']:checked").val();
    // if (document.getElementById('gender').checked) {
    //     gender = document.getElementById('gender').value;
    //   } 

    // var hobby = document.getElementsByName('hobby').values;
    var hobby = document.querySelectorAll('.form-check-input:checked');
    selected_hobby = []
    for (let i = 0; i < hobby.length; i++) {
        selected_hobby[i] = hobby[i].value;
    }
    // var hobby = document.querySelectorAll('input[name=hobby]:checked').val();   
    var country = document.getElementsByName('country')[0].value;
    var state = document.getElementsByName('state')[0].value;
    var city = document.getElementsByName('cities')[0].value;

    record = ({
        'current_time': current_time,
        'name': name,
        'email': email,
        'birthdate': brithdate,
        'gender': gender,
        'hobby': selected_hobby,
        'country': country,
        'state': state,
        'city': city
    });

    if (save_update.value == 'Save') {  // add new records
        all_data.push(record);
    } else {                            // update new records
        all_data[row_index] = record;
    }

    show_recordes();
    _clear();
}

function _edit(x) {
    _clear();
    cell = x.closest('td')
    row = cell.closest('tr');
    row_index = row.rowIndex - 1;

    document.getElementsByName('save')[0].value = "Update"
    document.getElementsByName('clear')[0].value = "Cancle"

    get_name = document.getElementsByName('g_name')[row_index].innerText;
    document.getElementsByName('username')[0].value = get_name;

    get_email = document.getElementsByName('g_email')[row_index].innerText;
    document.getElementsByName('useremail')[0].value = get_email;

    // get_age = document.getElementsByName('g_age')[row_index].innerText;
    // get_birthdate = document.querySelector('input[type="date"][name="birthday"]');
    get_birthdate = all_data[row_index].birthdate
    document.querySelector('input[type="date"][name="birthday"]').value = get_birthdate;

    get_gender = document.getElementsByName('g_gender')[row_index].innerText;
    gender = document.getElementsByName('gender');
    if (gender[0].value == get_gender) {
        gender[0].checked = true;
    } else if (gender[1].value == get_gender) {
        gender[1].checked = true;
    } else {
        gender[2].checked = true;
    }

    get_hobby = document.getElementsByName('g_hobby')[row_index].innerText;
    hobby = document.getElementsByName('hobby');
    hobby_array = get_hobby.split(",")
    
    for(i=0;i<hobby_array.length;i++){
        if(hobby_array[i] == hobby[0].value){
            hobby[0].checked = true;
        }
        if(hobby_array[i] == hobby[1].value){
            hobby[1].checked = true;
        }
        if(hobby_array[i] == hobby[2].value){
            hobby[2].checked = true;
        }
    }

    get_country = document.getElementsByName('g_country')[row_index].innerText;
    document.getElementsByName('country')[0].value = get_country;

    get_state = document.getElementsByName('g_state')[row_index].innerText;
    countySel.onchange();
    document.getElementsByName('state')[0].value = get_state;

    // document.querySelector('select[name="state"]').value = get_state;

    get_city = document.getElementsByName('g_city')[row_index].innerText;
    stateSel.onchange();
    document.getElementsByName('cities')[0].value = get_city;
}

function _search() {
    var input, filter, table, tr, td, i, txt_value;
    input = document.getElementsByName("search")[0];
    filter = input.value.toUpperCase();
    table = document.getElementById("mytable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txt_value = td.textContent || td.innerText;
            if (txt_value.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
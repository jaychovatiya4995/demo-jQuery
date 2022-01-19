$(document).ready(function () {
    show_recordes();
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
        my_table += "<td class='g_name' name='g_name'>" + data[key].name + " </td>";
        my_table += "<td name='g_email'>" + data[key].email + "</td>";
        my_table += "<td name='g_age' >" + age + "</td>";
        my_table += "<td name='g_gender'>" + data[key].gender + "</td>";
        my_table += "<td name='g_hobby' >" + data[key].hobby + "</td>";
        my_table += "<td name='g_country'>" + data[key].country + "</td>";
        my_table += "<td name='g_state'>" + data[key].state + "</td>";
        my_table += "<td name='g_city'>" + data[key].city + "</td>";
        my_table += "<td>" +
            "<button type='button' id='edit' onclick='_edit(this)' class='btn btn-outline-primary'>Edit</button>" +
            "<button type='button' id='delete' onclick='_delete(this)' class='btn btn-outline-danger m-1'>Delete</button>" +
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
    show_recordes();
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

// add records
function _add() {
    save_update = $('[name=save]');

    var current_time = new Date().getTime();
    var name = $('[name=username]').val();
    var email = $('[name=useremail]').val();
    var brithdate = $('[name=birthday]').val();
    var gender = $("[name='gender']:checked").val();

    var hobby = $('[name=hobby]:checked');
    selected_hobby = []
    for (let i = 0; i < hobby.length; i++) {
        selected_hobby[i] = hobby[i].value;
    }

    var country = $('[name=country]').val();
    var state = $('[name=state]').val();
    var city = $('[name=cities]').val();

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

    if (save_update.val() == 'Save') {  // add new records
        all_data.push(record);
    } else {                            // update new records
        all_data[row_index] = record;
    }

    show_recordes();
    _clear();
}

function _edit(x) { // x paramenter has 'this' value 
    _clear();

    rows = $(x).closest('tr');
    row_index = x.closest('td').closest('tr').rowIndex - 1;
    
    $('[name="save"]').val("Update");
    $('[name=clear]').val("Cancle");

    get_name = rows.find("[name=g_name]").text();
    $('[name="username"]').val(get_name);

    get_email = rows.find("[name=g_email]").text();
    $('[name="useremail"]').val(get_email);

    get_birthdate = all_data[row_index].birthdate;
    $('[name="birthday"]').val(get_birthdate);

    get_gender = rows.find("[name=g_gender]").text();
    gender = $('[name="gender"]');
    gender_value = []
    $('input:radio[name="gender"]').each(function () {
        gender_value.push($(this).val());
    });

    if (gender_value[0] == get_gender) {
        gender[0].checked = true;
    } else if (gender_value[1] == get_gender) {
        gender[1].checked = true;
    } else {
        gender[2].checked = true;
    }

    get_hobby = rows.find("[name=g_hobby]").text();
    hobby = $('[name="hobby"]');
    hobby_array = get_hobby.split(",")

    for (i = 0; i < hobby_array.length; i++) {
        if (hobby_array[i] == hobby[0].value) {
            hobby[0].checked = true;
        }
        if (hobby_array[i] == hobby[1].value) {
            hobby[1].checked = true;
        }
        if (hobby_array[i] == hobby[2].value) {
            hobby[2].checked = true;
        }
    }

    get_country = rows.find("[name=g_country]").text();
    $('[name=country]').val(get_country)

    get_state = rows.find("[name=g_state]").text();
    countySel.onchange();   
    $('[name=state]').val(get_state)

    get_city = rows.find("[name=g_city]").text();
    stateSel.onchange();
    $('[name=cities]').val(get_city)
}

function _search() {
    console.log('here is search');
    var table = $('.table').DataTable();
    console.log(table);
//     var input, filter, table, tr, td, i, txt_value;
//     input = document.getElementsByName("search")[0];
//     filter = input.value.toUpperCase();
//     table = document.getElementById("mytable");
//     tr = table.getElementsByTagName("tr");

//     // Loop through all table rows, and hide those who don't match the search query
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName("td")[0];
//         if (td) {
//             txt_value = td.textContent || td.innerText;
//             if (txt_value.toUpperCase().indexOf(filter) > -1) {
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
}

function sorting() {
    
    fileter_value = $('[name="fileter"]')[0];

    if (fileter_value.value == 'Ascending') {
        $('[name="fileter"]').val('Descending');
    }else{
        $('[name="fileter"]').val('Ascending');
    }

    function sort_name_ascending(a, b){
        var aName = a.name.toLowerCase();
        var bName = b.name.toLowerCase();
        if(fileter_value.value == 'Ascending'){ 
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }else{
            return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
        }
      }

     
    all_data = all_data.sort(sort_name_ascending)
    show_recordes();
}
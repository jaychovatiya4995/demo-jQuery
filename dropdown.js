$(document).ready(function () {

    const state_object = {
        "India": {
            "Delhi": ["new Delhi", "North Delhi"],
            "Kerala": ["Thiruvananthapuram", "Palakkad"],
            "Goa": ["North Goa", "South Goa"],
            "Gujarat": ["Rajkot", "Surat", "Ahemdabd"]
        },
        "Australia": {
            "South Australia": ["Dunstan", "Mitchell"],
            "Victoria": ["Altona", "Euroa"]
        }, "Canada": {
            "Alberta": ["Acadia", "Bighorn"],
            "Columbia": ["Washington", "Barranquilla"]
        },
    }

    var county_sel = document.getElementById("countySel");
        country_sel1 = $('#countySel')[0]
        state_sel = document.getElementById("stateSel");
        district_sel = document.getElementById("districtSel");

    for (var country in state_object) {
        county_sel.options[county_sel.options.length] = new Option(country, country);
    }
    
    county_sel.onchange = function () {
        state_sel.length = 1; // remove all options bar first
        district_sel.length = 1; // remove all options bar first
        if (this.selectedIndex < 1) return; // done
        for (var state in state_object[this.value]) {
            state_sel.options[state_sel.options.length] = new Option(state, state);
        }
    }
    county_sel.onchange(); // reset in case page is reloaded
    state_sel.onchange = function () {
        district_sel.length = 1; // remove all options bar first
        if (this.selectedIndex < 1) return; // done
        var district = state_object[county_sel.value][this.value];
        for (var i = 0; i < district.length; i++) {
            district_sel.options[district_sel.options.length] = new Option(district[i], district[i]);
        }
    }
    
});

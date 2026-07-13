var WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwoS4J1nAFWtylncKzf_c7aEvp8HxQAjHwaniXRjnKeuHvw6F5O663ly2WRXAORdWm-Kg/exec";

// Generate Date & Time
function setDateTime() {
    var now = new Date();
    document.getElementById("datetime").value = now.toLocaleString("en-IN");
}

// Temporary Farmer ID
function generateFarmerID() {
    document.getElementById("farmerId").value = "Auto Generate";
}

// GPS Location
function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(position){

                document.getElementById("latitude").value = position.coords.latitude;
                document.getElementById("longitude").value = position.coords.longitude;

            },

            function(){
    alert("Please allow GPS Location.");
},

            {
                enableHighAccuracy:true,
                timeout:10000
            }

        );

    } else {

        alert("GPS not supported.");

    }

}

// Mobile Validation
document.getElementById("mobile").addEventListener("input", function () {

    this.value = this.value.replace(/\D/g, "");

});

// Submit Form
document.getElementById("farmerForm").addEventListener("submit", function (e) {

    e.preventDefault();

    var farmer = {

        farmerName: document.getElementById("farmerName").value,
        fatherName: document.getElementById("fatherName").value,
        village: document.getElementById("village").value,
        state: document.getElementById("state").value,
        mobile: document.getElementById("mobile").value,
        datetime: document.getElementById("datetime").value,
        latitude: document.getElementById("latitude").value,
        longitude: document.getElementById("longitude").value

    };

    fetch(WEB_APP_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(farmer)

    })

    .then(function(response){

        return response.json();

    })

    .then(function(result){

        if(result.status === "success"){

            alert("Registration Successful!\n\nFarmer ID : " + result.farmerId);

            document.getElementById("farmerId").value = result.farmerId;

            document.getElementById("farmerForm").reset();

            setDateTime();

            getLocation();

        }

        else if(result.status === "duplicate"){

            alert(result.message);

        }

        else{

            alert("Unknown Error");

        }

    })

    .catch(function(error){

        alert(error);

        alert("Unable to save data.");

    });

});

// On Page Load
window.onload = function(){

    generateFarmerID();

    setDateTime();

    getLocation();

};
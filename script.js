
import secreto_api from "./api.js";
//using leaflet api for geolocation map and maptiler site for map tile.

var mymap = L.map('ipamap').setView([30.32443, 78.03392], 4);

const urlo='https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=4XmVf2lVa4G736UQuKnr';
const attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

L.tileLayer(urlo , {attribution}).addTo(mymap);

var marker =L.marker([30.32443, 78.03392]).addTo(mymap);

//***************************************************************************** */
//elements that we have to update

var ip_address= document.getElementById('ip_text');
let loc= document.getElementById('location_text');
let timez= document.getElementById('timezone_text');
let isp= document.getElementById('isp_text');

//inputs elements

var entered_ip= document.getElementById('input_text');
const submit_btn= document.getElementById('search_btn');


//url stufs

const secret_api= secreto_api;
// let deploysite_url= 'https://cors-anywhere.herokuapp.com/' ;
const api_url= 'https://geo.ipify.org/api/';
let curr_version= 'v2/';

//fetching code and logic

async function datafetch(default_ip) {

    try{
        if(default_ip == undefined){
            //${deploysite_url}
           var ip_url = `${api_url}${curr_version}country,city?apiKey=${secreto_api}` ;
       }
       else {
          // ${deploysite_url}
           var ip_url = `${api_url}${curr_version}country,city?apiKey=${secreto_api}&ipAddress=${default_ip}` ;
       }
    const response=await fetch(ip_url, {cache:'no-cache'});
    if(response.ok){
        const data = await response.json();
        ip_address.innerHTML = data.ip ;
        loc.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`;
        timez.innerHTML = data.location.timezone;
        isp.innerHTML = data.isp;

        //Update marker

        var latit =data.location.lat;
        var longi=data.location.lng;
        console.log(latit+" "+longi );
        marker.setLatLng([latit , longi]);
        mymap.setView([latit, longi], 16)
        return;
    } 

        throw new error('request failed!');
    
    }
    
    catch(error) {
        alert("Unable to get IP details");
        console.log(error);
    }
}
    

submit_btn.addEventListener('click', e => {
    e.preventDefault();
    if (entered_ip.value != '' && entered_ip.value != null) {
        datafetch(entered_ip.value);
        return;
    }
    alert("Please enter a valid IP address");
}); 

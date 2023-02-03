//Variables
const myKey = config.apiKey;

const userInformationBtn = document.querySelector('.user-information');
const userLocationInfo = document.querySelector('.user-location-info');
const otherLocationContainer = document.querySelector('.other-location-container');
const addBtn = document.getElementById('btn');

//function that creates an element of city-container.
function addCity(){
    let inputValue = document.querySelector('.search-bar');
    console.log(inputValue.value);

    const cityContainer = document.createElement('div');
    cityContainer.classList.add('city-container');
    otherLocationContainer.append(cityContainer);

    const city = document.createElement('p');
    city.classList.add('city-location');
    cityContainer.append(city);

    const degrees = document.createElement('p');
    degrees.classList.add('city-location-degrees');
    cityContainer.append(degrees);

    const button = document.createElement('button');
    cityContainer.append(button);
    button.setAttribute('id','btn');
    const icon = document.createElement('i');
    button.append(icon);
    console.log(icon);
    icon.classList.add('fa-sharp', 'fa-solid', 'fa-minus');


    const api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${myKey}&units=metric`;
    fetch(api)
        .then(response => {return response.json();
        })
            .then(data =>{
                console.log(data);
                const {name} = data;
                const {temp, feels_like} = data.main;

                city.innerText = name;
                degrees.innerText = Math.floor(temp) + ` C°`;

            })


    inputValue.value = ""; //resetting value
}

addBtn.addEventListener('click',addCity);

userInformationBtn.addEventListener('click',()=> {
    let longitude;
    let latitude;
    let userLocation = document.querySelector('.user-location');
    let userLocationDegrees = document.querySelector('.user-location-degrees');


    //will require the user to allow geolocation
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(positon => {
            console.log(positon);
            longitude = positon.coords.longitude;
            latitude = positon.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myKey}&units=metric`;
            
                fetch(api)
                    .then(response =>{
                    return response.json();
                    })
                        .then(data => {
                    console.log(data);
                    //shorthand:
                    const {name} = data; //pullnig out all the information from "current"
                    const {temp} = data.main;
                    //Set DOM Element from the API
                    console.log(data.main.temp);
                    userInformationBtn.style.display = 'none';
                    userLocationInfo.classList.toggle('active')
                    userLocation.style.display = 'block';
                    userLocation.textContent = name;
                    userLocationDegrees.textContent = Math.floor(temp) + " C°";
                    userLocationDegrees.style.display = 'block';

                });
        });

    }

});

    
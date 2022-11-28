///// Custom select
const data = [
    {
        placeholder: 'Practice / Institution*', option: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5',]
    },
    {
        placeholder: 'Medical Profession*', option: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5',]
    },
    {
        placeholder: 'Type of Inquiry*', option: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'option6']
    },
];


(function () {
    const customSelect = document.createElement("div");
    const hiddenSelect = document.getElementsByClassName("form-select_hidden");
    let selectsData = data.map((select) => (
        `<div tabindex="0" class="select">
            <div aria-required="true" class="selectBtn" data-type="">${select.placeholder}</div>    
                <div class="selectDropdown">${select.option.map(el =>
            `<div class="option" data-type="firstOption">${el}</div>`
        ).join('')}
            </div>
        </div>`)
    )

    for (let i = 0; i < hiddenSelect.length; i++) {
        customSelect.innerHTML = selectsData[i];
        hiddenSelect[i].parentNode.insertBefore(customSelect.cloneNode(true), hiddenSelect[i].nextSibling);
    }
})()


const select = document.querySelectorAll('.select')
const selectBtn = document.querySelectorAll('.selectBtn');
const selectOption = document.querySelectorAll('.option');


function hideOnClickOutside() {
    const outsideClickListener = e => {
        select.forEach(selector => {
            console.log(e.composedPath().includes(selector))
            if (!e.composedPath().includes(selector)) {
                selector.children[1].classList.remove('toggle');
            }
        })
    }
    document.addEventListener('click', outsideClickListener);
}


selectBtn.forEach(btn => {
    btn.addEventListener('click', e => {
        const next = e.target.nextElementSibling;
        next.classList.toggle('toggle');
        hideOnClickOutside()
    })
})


selectOption.forEach(option => {
    option.addEventListener('click', e => {
        e.target.parentElement.classList.remove('toggle');
        const parent = e.target.closest('.select').children[0];
        parent.classList.add('selected')
        parent.setAttribute('data-type', e.target.getAttribute('data-type'));
        parent.innerText = e.target.innerText;
    })
})

///// Map
let map;

function initMap() {
    const coordinate = {lat: 43.44480633602608, lng: -80.51603353990133};
    const iconUrl = "https://i.ibb.co/D9DFW4Y/point.png";
    let popupOpen = false;

    map = new google.maps.Map(document.getElementById("map"), {
        center: coordinate,
        zoom: 15.2,
        styles:[
            {
                "featureType": "poi.attraction",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            }
        ]
    });

    const marker = new google.maps.Marker({
        position: coordinate,
        icon: iconUrl,
        map: map,
    });

    const contentString =
        '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading">Voodoo</h1>' +
                '<div id="bodyContent">' +
                    '<p class="bodyContent-description">137 Glasgow St., Unit 115</p>'+
                    '<p class="bodyContent-description">Kitchener, ON N2G 4X8</p>'+
                    '<p class="bodyContent-description">Ukraine</p>'+
                    '<div class="bodyContent-info">' +
                        '<p class="bodyContent-phone">1-800-480-9597</p>'+
                        '<p class="bodyContent-mail">info@voodoo.com</p>'+
                    "</div>" +
                "</div>" +
        "</div>";

    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "Marker",
    });

    marker.addListener("click", () => {
        const params = {anchor: marker, map}
        if(popupOpen){
            infowindow.close(params)
            popupOpen = !popupOpen
        }else{
            infowindow.open(params)
            popupOpen = !popupOpen
        }
    });
}

window.initMap = initMap;




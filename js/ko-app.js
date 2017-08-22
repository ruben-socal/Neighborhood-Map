var map;
// new blank array for all the listing markers.
var markers = [];
function initMap() {

// Create a styles array to use with the map.
    var styles = [
        {
            featureType: 'water',
            stylers: [
                { color: '#19a0d8' }
            ]
        },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
                { color: '#ffffff' },
                { weight: 6 }
            ]
        },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
                { color: '#e85113' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                { color: '#efe9e4' },
                { lightness: -40 }
            ]
        },{
            featureType: 'transit.station',
            stylers: [
                { weight: 9 },
                { hue: '#e85113' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
                { visibility: 'off' }
            ]
        },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                { lightness: 100 }
            ]
        },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                { lightness: -100 }
            ]
        },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                { visibility: 'on' },
                { color: '#b3e6b3' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                { color: '#efe9e4' },
                { lightness: -25 }
            ]
        }
    ];
	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0569678, lng: -118.3338952},
        zoom: 13,
        styles: styles,
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER
        }

	});

	// Points of interest Listings that will be shown to the user
	var locations = [
		{ title: "Griffith Observatory", location: {lat: 34.1184341, lng: -118.3003935}, pageid: 645747, placeid: "ChIJ9590IY3AwoARquS6ie60MUc"},
		{ title: "Grauman's Chinese Theatre", location: {lat: 34.1020231, lng: -118.3409712}, pageid: 1261347, placeid: "ChIJw4DCAdrX3IAR-1_GYNuCOfc"},
		{ title: "Natural History Museum", location: {lat: 34.0169567, lng: -118.2887703}, pageid: 2171864, placeid: "ChIJXzARBf3HwoARJyT7uZSV-G4"},
		{ title: "UCLA", location: {lat: 34.068921, lng: -118.4451811}, pageid: "37765", placeid: "ChIJZQ9c8IW8woARN0gTXFiTqSU"},
		{ title: "La Brea Tar Pits", location: {lat: 34.0638079, lng: -118.3554338}, pageid: 298509, placeid: "ChIJ_yD1_SK5woARmWLyCit3znQ"},
		{ title: "Universal Studios Hollywood", location: {lat: 34.13811680000001, lng: -118.3533783}, pageid: 1717581, placeid: "ChIJzzgyJU--woARcZqceSdQ3dM"},
		{ title: "Dodger Stadium", location: {lat: 34.073851, lng: -118.2399583}, pageid: 102796, placeid: "ChIJdVYAVPnGwoAR3wmcg09VlJ4", description: ""},
		{ title: "Los Angeles County Museum of Art", location: {lat: 34.0639323, lng: -118.3592293}, pageid: 373615, placeid: "ChIJsXqcyjy5woARNz6sOh0ZmwA"},
		{ title: "Paramount Pictures", location: {lat: 34.0854228, lng: -118.319153}, pageid: 22918, placeid: "ChIJC15Q87a4woARb_n0GB8V8c0"},
		{ title: "Walt Disney Concert Hall", location: {lat: 34.0553454, lng: -118.249845}, pageid: 347933, placeid: "ChIJ0xG7n03GwoARsDH_OyyMcrM"},
		{ title: "California Science Center", location: {lat: 34.01586530000001, lng: -118.2861082}, pageid: 2323711, placeid: "ChIJ21yHTgjIwoARcrUbrsffOB4"},
		{ title: "Petersen Automotive Museum", location: {lat: 34.062348, lng: -118.3611336}, pageid: 2728932, placeid: "ChIJaRbaXjy5woARERNJSyktTog"},
		{ title: "The Comedy Store", location: {lat: 34.095169, lng: -118.3740423}, pageid: 397603, placeid: "ChIJg7DLab6-woARHyVknPRuxJA"},
		{ title: "San Antonio Winery", location: {lat: 34.0637975, lng: -118.2239144}, pageid: 1686482, placeid: "ChIJj2tUC2bGwoARwqdCDE37YD0"},
		{ title: "Sony Pictures Studio", location: {lat: 34.0176957, lng: -118.4013648}, pageid: 939909, placeid: "ChIJm8Pm0Ci6woARAILKQMxxZbM"},
		{ title: "The Santa Monica Pier", location: {lat: 34.010080, lng: -118.496166}, pageid: 1185797, placeid:  "ChIJpwWbUtekwoAR0890MEJvzII"}
	];

	// Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('a366ff');

    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');
	var largeInfowindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();

    // click marker function
    function clickMarker(event) {
        getPlacesDetails(this, largeInfowindow);
        this.setIcon(highlightedIcon);
    }

    // mouse over marker function
    function mouseOver(event) {
        this.setIcon(highlightedIcon);
    }

    // mouse out marker function
    function mouseOut(event) {
        this.setIcon(defaultIcon);
    }

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
    	// Get the position from location array
    	var position = locations[i].location;
    	var title = locations[i].title;
    	var placeid = locations[i].placeid;
        var pageid = locations[i].pageid;

    	// Create a marker per location, and put it into markers array.
    	var marker = new google.maps.Marker({
    	 	map: map,
    	 	position: position,
    	 	title: title,
    	 	animation: google.maps.Animation.DROP,
    	 	icon: defaultIcon,
    	 	placeid: placeid,
            pageid: pageid
    	});
    	// Push the marker to our array of markers.
    	markers.push(marker);
    	// Extend the boundaries of the map for each marker
    	bounds.extend(marker.position);
        // Marker click event listener to open infowindow
        marker.addListener("click", clickMarker );

    	// Marker mouse over event listener changes color to highlighedIcon
        marker.addListener('mouseover',mouseOver );
        // Marker mouse out event listener changes color to defaultIcon
        marker.addListener('mouseout',mouseOut );
    }

    // I had trouble accessing markers array inside ViewModel, I found the solution in udacity discussions forum
    // knockout ViewModel was loading before google map, by placing ViewModel binding at the bottom of the InitMap code, this solved the problem
    // https://discussions.udacity.com/t/having-trouble-accessing-the-variables-inside-of-the-viewmodel-knockoutjs-from-a-global-function/43226
    var vm = new ViewModel();
    vm.query.subscribe(vm.search);
    ko.applyBindings( vm );

}// end of initMap() function

// google maps api asynchromous error handling credit goes to :
// https://discussions.udacity.com/t/google-map-async-error-handling/163365/7
function googleError() {
    $("#map").text("google maps failed to load");
    $("#map").css({"color": "white", "font-size": "1.5em", "text-align": "center"});
}

// This is the PLACE DETAILS search - it's the most detailed so it's only
// executed when a marker is selected, indicating the user wants more
// details about that place.
function getPlacesDetails(marker, infowindow) {
    var defaultIcon = makeMarkerIcon('a366ff');
    // ajax is used with wikipedia API to get the location description and title, the title is used to to create
    // the wikipedia link for more information
    var wikiRequestTimeout = setTimeout(function(){
        $("#wikipedia-header").text("failed to get wikipedia resourses");
    }, 8000 );
    var articleStr;
    var link, readMore;
    var pageid = marker.pageid;
    var wikiURL =  "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&pageids=" + pageid;
    $.ajax({
        url: wikiURL,
        dataType: "jsonp",
        success: function(response){
        var articleList = response.query.pages;
        for(var i in articleList){
            if( articleStr !== null ) {
                articleStr = articleList[i].extract;
                link = "https://en.wikipedia.org/wiki/"+ articleList[i].title;
            }
        }
        readMore = ' <a class=\"read\" href=\"'+link+'\" target=\"_blank\">... read more</a>';
        // Google maps Places service uses placeid to get place details
        var service = new google.maps.places.PlacesService(map);
        service.getDetails({
            placeId: marker.placeid
        }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // Set the marker property on this infowindow so it isn't created again.
                infowindow.marker = marker;
                var innerHTML = '<div>';
                if (place.name) {
                    innerHTML += '<strong>' + place.name + '</strong>';
                }
                if (articleStr) {
                    innerHTML += '<br>' + articleStr.substring(0,350) + readMore;
                }
                if (place.html_attributions) {
                    innerHTML += '<br>' + place.html_attributions;
                }
                if (place.formatted_address) {
                    innerHTML += '<br>' + place.formatted_address;
                }
                if (place.formatted_phone_number) {
                    innerHTML += '<br>' + place.formatted_phone_number;
                }
                if (place.opening_hours) {
                    innerHTML += '<br><br><strong>Hours:</strong><br>' +
                        place.opening_hours.weekday_text[0] + '<br>' +
                        place.opening_hours.weekday_text[1] + '<br>' +
                        place.opening_hours.weekday_text[2] + '<br>' +
                        place.opening_hours.weekday_text[3] + '<br>' +
                        place.opening_hours.weekday_text[4] + '<br>' +
                        place.opening_hours.weekday_text[5] + '<br>' +
                        place.opening_hours.weekday_text[6];
                }
                if (place.photos) {
                    innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                        {maxHeight: 100, maxWidth: 200}) + '">';
                }
                innerHTML += '</div>';
                infowindow.setContent(innerHTML);
                infowindow.open(map, marker);
                // Make sure the marker property is cleared if the infowindow is closed.
                infowindow.addListener('closeclick', function() {
                    marker.setIcon(defaultIcon);
                    infowindow.marker = null;
                });
            }
        }); // end google maps services call
        // clear timeout because wikipedia article is found
        clearTimeout(wikiRequestTimeout);
        }
    });

} // end getPlacesDetails function

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
	var markerImage = new google.maps.MarkerImage(
	   'https://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
	   '|40|_|%E2%80%A2',
	   new google.maps.Size(21, 34),
	   new google.maps.Point(0, 0),
	   new google.maps.Point(10, 34),
	   new google.maps.Size(21,34));
	return markerImage;
}

// location ko observables used to keep track of changes in data-binding in html
var Location = function(data) {
	this.title = ko.observable(data.title);
 	this.location = ko.observable(data.location);
 	this.placeid = ko.observable(data.placeid);
    this.marker = data;

};

//-------------------------------------- ViewModel --------------------------------------------------------

// knock objects are called observables which are functions, data-bind used in html are
// similar to octopus, the connections are made in the html DOM called bidings ex(data-bind="text: name")
// the functions notify the view(applyBindings) whenever the functions changes
var ViewModel = function() {
	// self = this gets the scope of the object ViewModel as opposed
	// the scope inside a  nested function or forloop this
	var self = this;
	// create an empty list for locations
	this.locationList = ko.observableArray( [] );
    // query used to filter search in locations
    this.query = ko.observable('');
	// array of locations is added to locationList observableArray
	markers.forEach(function(markerItem) {
		// new Location is passed as object literal and is part of the ViewModel this object referenced by self
		self.locationList.push( new Location(markerItem) );
	});

	this.currentLocation = ko.observable( this.locationList()[0] );
	// click binding passes data object as described in knockout js documents
	this.displayLocation = function(locationTitle) {
	 	self.currentLocation(locationTitle);
	};
	// Click binding passes data and opens corresponding marker
    this.openMarker = function(locationTitle) {
        self.currentLocation(locationTitle);
        google.maps.event.trigger(self.currentLocation().marker,'click');
        if(window.innerWidth < 769 ) {
            $(".interest-points").hide();
        }
    };

    // search function uses query observable to filter throught locations list
    // after having problems figuring this out, I found the solution at udacity forum discussions
    // https://discussions.udacity.com/t/search-filtering-in-the-neighborhood-map-project/240693
    this.search = function(value) {
        // adding and removing markers from the map
        // code to set marker visible using marker.setVisible(true) from Udacity forum discussion
        // https://discussions.udacity.com/t/linking-the-ko-filter-to-the-markers-le-sigh/35771/2

        // remove all location links
        self.locationList.removeAll();

        for(var x in markers) {
            // if statement checks if filter is in the location title, if true
            // add marker to locationList and set marker to visible
            if(markers[x].title.toLowerCase().startsWith(value.toLowerCase()) ) {
                markers[x].setVisible(true);
                self.locationList.push( new Location(markers[x]) );
            }
            else {
                markers[x].setVisible(false);
            }
        }
    };

    // on mobile view, click on hamburger icon to show and hide drop down menu location list
    this.showHideList = function() {
        var isHidden = $(".interest-points").is( ":hidden" );
        if(window.innerWidth < 769 ) {
            if(isHidden){
                $(".interest-points").show();
            } else {
                $(".interest-points").hide();
            }
        } else {
            if( isHidden ){
                $(".interest-points").show();
            }
        }
    };

}; // end of ViewModel function

// The code shows and hides list of locations when the screen is resized
// Javascript was used instead of media queries because knockout js javacsript was overriding media queries
// I used solution from the the following site:
// https://stackoverflow.com/questions/28035960/javascript-override-of-media-query
$(window).resize(function(){
    if($(this).width() > 768){
        $('.interest-points').show();
        $("#search-break").hide();
    }
    else{
        $('.interest-points').hide();
        $("#search-break").show();
    }
});


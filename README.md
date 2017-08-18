# Neighborhood-Map

The Neighborhood Map is a web application that has a list of locations for the Los Angeles area that are points of interest. The points of interest have purple icon markers on the google map, to find out more information for a particular marker you can click on the marker or you can click on a location from the list related to the marker and a new pop-up window will display information about the location. Once the pop-up window is opened the information that can be found is the following: Title of the location, description of the location with a link to Wikipedia for more information, the location address, location working hours and an image of the location. The search box will automatically search from the existing list of locations, the search words entered into the search box will start displaying the locations that match the existing locations. The locations being displayed during the search can be selected to open the location marker information window.

## Getting Started

1. Download the files from [link to github!](https://github.com/ruben-socal/Neighborhood-Map)
2. Once the link is open, click on green button that says **clone or dowwload**
3. Once you click on the green button, choose **Download zip**
4. Once the zip file has been downloaded, click on zip file and extract files. [extract files on windows](https://support.microsoft.com/en-us/help/14200/windows-compress-uncompress-zip-files), [extract files on a Mac](http://support.topspinmedia.com/hc/en-us/articles/204262713-How-to-extract-a-zip-file-on-a-Mac)
2. Locate extracted files directory Neighborhood_Map
3. Open index.html file by double clicking on it
4. Once the index.html file is open its ready to use.

## Using Your Own Google Maps API key
1. Open index.html in the code editor of your choice, example **sublime text**,  **Atom**, **Notepad++**.
2. Look for the following line of code:
		src="https://maps.googleapis.com/maps/api/js?libraries=places,geometry,drawing&key=AIzaSyDX28V7fNXkeNiHK33TK_8_8RmPYWZhr50&v=3&callback=initMap" onerror="googleError()">
	now replace your key between key=**YourKeyHere**&, no spacing inbetween.
3. Save changes and open index.html
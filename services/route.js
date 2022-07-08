import axios from "axios";

const directionsMatrix = axios.create({
  baseURL:
    "https://maps.googleapis.com/maps/api/distancematrix/json?key=AIzaSyCfU-YtsrhRoVJC32uDR-siebOcjriipk4",
});

export default directionsMatrix;

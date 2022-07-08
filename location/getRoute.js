import directionsMatrix from "../services/route";
import { api } from "../services/api";
import * as Linking from "expo-linking";

export default async function getRoute() {
  const origins = "-23.559052378569238,-46.73967938912012"; // Coodenadas da prefeitura

  const { data } = await api.post("action/find", {
    collection: "trash-cans",
    database: "smart-trash",
    dataSource: "datapan",
    filter: {
      status: { $in: ["medium", "high"] },
    },
    projection: { location: { latitude: 1, longitude: 1 } },
  });

  const destinations = data.documents
    .map(({ location }) => `${location.latitude},${location.longitude}`)
    .join("|");

  const { data: matrix } = await directionsMatrix.get("", {
    params: {
      origins,
      destinations,
    },
  });

  const { rows, destination_addresses } = matrix;

  const waypointsArray = destination_addresses
    .map((address, index) => {
      return {
        address,
        distance: rows[0].elements[index].distance.value,
        coords: `${data.documents[index].location.latitude},${data.documents[index].location.longitude}`,
      };
    })
    .sort((a, b) => a.distance - b.distance);

  const { address: finalDestiny } = waypointsArray.pop();
  const waypoints = waypointsArray.map(({ coords }) => coords).join("|");

  const originsURI = encodeURI(origins);
  const waypointsURI = encodeURI(waypoints);
  const destityURI = encodeURI(finalDestiny);

  const baseURL = "https://www.google.com/maps/dir/?api=1";
  const finalLink =
    baseURL +
    `&origin=${originsURI}&destination=${destityURI}&waypoints=${waypointsURI}&travelmode=driving`;

  Linking.openURL(finalLink);
}

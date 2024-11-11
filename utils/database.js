import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

// Helper function to handle database queries
const executeQuery = async (sqlQuery, params = []) => {
  const db = SQLite.openDatabase("places.db");

  return new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        sqlQuery,
        params,
        (_, result) => res(result?.rows?._array),
        (_, error) => {
          console.error('Database error:', error);  // log the error for debugging
          rej(new Error(`Database operation failed: ${error.message}`));
        }
      );
    });
  });
};

// Function to initialize the places table
export const init = async () => {
  const query = `CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUri TEXT NOT NULL,
    address TEXT NOT NULL,
    lat REAL NOT NULL,
    long REAL NOT NULL
  )`;
  await executeQuery(query);
};

// Function to insert a place into the database
export const insertPlace = async (place) => {
  const query = `INSERT INTO places (title, imageUri, address, lat, long) VALUES (?, ?, ?, ?, ?)`;
  const params = [
    place.title,
    place.imageUri,
    place.address,
    place.location.lat,
    place.location.long
  ];
  await executeQuery(query, params);
};

// Function to fetch a specific place by ID
export const fetchPlaceDetails = async (id) => {
  const query = `SELECT * FROM places WHERE id = ?`;
  const params = [id];

  try {
    const placeDetails = await executeQuery(query, params);
    if (placeDetails.length > 0) {
      return placeDetails[0]; // Return the first result (place)
    } else {
      throw new Error('Place not found');
    }
  } catch (err) {
    throw new Error(`Failed to fetch place details: ${err.message}`);
  }
};

// Function to fetch all places and return them as Place objects
export const fetchPlaces = async () => {
  const query = `SELECT * FROM places`;
  
  try {
    const placeDetails = await executeQuery(query);

    return placeDetails.map((place) => {
      return new Place(
        place.title,
        place.imageUri,
        { address: place.address, lat: place.lat, long: place.long },
        place.id
      );
    });
  } catch (err) {
    throw new Error(`Failed to fetch places: ${err.message}`);
  }
};

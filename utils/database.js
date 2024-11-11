import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

// Open the database synchronously
const openDb = () => {
  const db = SQLite.openDatabase("places.db");
  return db;
};

export const init = () => {
  const db = openDb();

  return new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                long REAL NOT NULL
        )`,
        [], // Parameters for the query
        () => {
          res(); // Success callback
        },
        (_, err) => {
          rej(err); // Error callback
        }
      );
    });
  });
};

export const insertPlace = (place) => {
  const db = openDb();
  return new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (
                      title,
                      imageUri,
                      address,
                      lat,
                      long
              ) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.long,
        ], // Parameters for the query
        (_, result) => {
          console.log(result);

          res(result); // Success callback
        },
        (_, err) => {
          rej(err); // Error callback
        }
      );
    });
  });
};
export const fetchPlaces = () => {
  const db = openDb();
  return new Promise((res, rej) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [], // Parameters for the query
        (_, result) => {
          const properlyModifidedStructure = result?.rows?._array.reduce((acc, current) => {
            acc.push(
                new Place(
                  current.title,
                  current.imageUri,
                  {
                    address: current.address,
                    lat: current.lat,
                    long: current.long,
                  },
                  current.id
                )
              )
              return acc
          }
        ,[]);
         res(properlyModifidedStructure); // Success callback
        },
        (_, err) => {
          rej(err); // Error callback
        }
      );
    });
  });
};

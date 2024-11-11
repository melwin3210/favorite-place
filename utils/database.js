import * as SQLite from 'expo-sqlite';

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

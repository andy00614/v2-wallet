// dbAndCrypto.ts
export const dbName = 'myDatabase';
let db: IDBDatabase;

export async function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = event => {
      console.error("Unable to open database");
      reject("Unable to open database");
    };

    request.onsuccess = event => {
      db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = event => {
      db = (event.target as IDBOpenDBRequest).result;
      const store = db.createObjectStore("PasswordStore", { keyPath: "id" });
    };
  });
}

export async function addPasswordToDatabase(password: ArrayBuffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["PasswordStore"], "readwrite");
    const store = transaction.objectStore("PasswordStore");
    const request = store.add({ id: 1, password });

    request.onsuccess = event => resolve();
    request.onerror = event => reject("Error adding password to database");
  });
}

export async function encryptPassword(password: string): Promise<{ key: CryptoKey; encryptedData: ArrayBuffer; }> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const key = await window.crypto.subtle.generateKey({
    name: "AES-GCM",
    length: 256,
  }, true, ["encrypt", "decrypt"]);

  const encryptedData = await window.crypto.subtle.encrypt({
    name: "AES-GCM",
    iv: window.crypto.getRandomValues(new Uint8Array(12)),
  }, key, data);

  return { key, encryptedData };
}

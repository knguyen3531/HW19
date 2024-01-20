// indexedDB.js

const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('textEditorDB', 1);
  
      request.onerror = (event) => {
        reject(`IndexedDB error: ${event.target.error}`);
      };
  
      request.onsuccess = (event) => {
        const db = event.target.result;
        resolve(db);
      };
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('content', 'content', { unique: false });
      };
    });
  };
  
  const saveNote = async (content) => {
    const db = await openDatabase();
  
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('notes', 'readwrite');
      const objectStore = transaction.objectStore('notes');
      const note = { content, timestamp: Date.now() };
  
      const request = objectStore.add(note);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (event) => {
        reject(`IndexedDB error: ${event.target.error}`);
      };
    });
  };
  
  const getNotes = async () => {
    const db = await openDatabase();
  
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('notes', 'readonly');
      const objectStore = transaction.objectStore('notes');
      const notes = [];
  
      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          notes.push(cursor.value);
          cursor.continue();
        } else {
          resolve(notes);
        }
      };
  
      transaction.onerror = (event) => {
        reject(`IndexedDB error: ${event.target.error}`);
      };
    });
  };
  
  export { saveNote, getNotes };
  
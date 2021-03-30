window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || 
window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || 
window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || 
window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
const pelangganData = [
    { nosamb: 17904, nama: "IWAN ARIANA", age: 35, Latlong: "gopal@tutorialspoint.com" },
    { nosamb: 12345, nama: "I MADE SANJAYA", age: 32, Latlong: "prasad@tutorialspoint.com" }
 ];


const aksesorisData = [
    { id: 17904, nama: "Aksesoris 1", Latlong: "gopal@tutorialspoint.com" },
    { id: 12345, nama: "Aksesoris 2", Latlong: "prasad@tutorialspoint.com" }
 ];

const sumberData = [
    { id: 17904, nama: "Sumber 1", Latlong: "gopal@tutorialspoint.com" },
    { id: 12345, nama: "Sumber 2", Latlong: "prasad@tutorialspoint.com" }
 ];


 var db;
 var request = window.indexedDB.open("gis_db", 1);
 
 request.onerror = function(event) {
    console.log("error: ");
 };
 
 request.onsuccess = function(event) {
    db = request.result;
    console.log("success: "+ db);
 };
 
 request.onupgradeneeded = function(event) {
    var  db = event.target.result;
    var  objectStore = db.createObjectStore("m_pelanggan", {keyPath: "nosamb"});
    var  objectStore2 = db.createObjectStore("m_aksesoris", {keyPath: "id"});   
    var  objectStore3 = db.createObjectStore("m_sumber", {keyPath: "id"});   
    
    for (var i in pelangganData) {
       objectStore.add(pelangganData[i]);
    }
    for (var i in aksesorisData) {
      objectStore2.add(aksesorisData[i]);
    }

    for (var i in sumberData) {
      objectStore3.add(sumberData[i]);
    }
   
    
 
 }

 function read() {
    var transaction = db.transaction(["m_pelanggan"]);
    var objectStore = transaction.objectStore("m_pelanggan");
    var request = objectStore.get("00-03");
    
    request.onerror = function(event) {
       alert("Unable to retrieve daa from database!");
    };
    
    request.onsuccess = function(event) {
       // Do something with the request.result!
       if(request.result) {
          alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
       } else {
          alert("Kenny couldn't be found in your database!");
       }
    };
 }
 
 function readAll() {
    var objectStore = db.transaction("m_pelanggan").objectStore("m_pelanggan");
    
    objectStore.openCursor().onsuccess = function(event) {
       var cursor = event.target.result;
       
       if (cursor) {
          alert("Name for nosamb " + cursor.key + " is " + cursor.value.name + ", Age: " + cursor.value.age + ", Email: " + cursor.value.email);
          cursor.continue();
       } else {
          alert("No more entries!");
       }
    };
 }
 
 function add() {
    var request = db.transaction(["m_pelanggan"], "readwrite")
    .objectStore("m_pelanggan")
    .add({ nosamb: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });
    
    request.onsuccess = function(event) {
       alert("Kenny has been added to your database.");
    };
    
    request.onerror = function(event) {
       alert("Unable to add data\r\nKenny is aready exist in your database! ");
    }
 }
 
 function remove() {
    var request = db.transaction(["m_pelanggan"], "readwrite")
    .objectStore("employee")
    .delete("00-03");
    
    request.onsuccess = function(event) {
       alert("Kenny's entry has been removed from your database.");
    };
 }

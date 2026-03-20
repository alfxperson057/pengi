// JavaScript Document

/*

TemplateMo 600 Prism Flux

https://templatemo.com/tm-600-prism-flux

*/


// Portfolio data for carousel


// animasi lodong

window.addEventListener("load", function(){

let loader = document.getElementById("loader");

setTimeout(function(){
loader.style.opacity="0";
loader.style.visibility="hidden";
},800);

});

//pengaturan kolom atas 
function toggleBikeMenu(el){
  let menu = el.nextElementSibling;

  document.querySelectorAll('.menu-popup').forEach(m => m.style.display='none');

  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function editBike(){
  let nameEl = document.getElementById("bikeName");
  let imgEl = document.getElementById("bikeImg");

  let newName = prompt("Nama motor:", nameEl.innerText);
  if(newName !== null && newName !== ""){
    nameEl.innerText = newName;
  }

  let newImg = prompt("Link gambar:", imgEl.src);
  if(newImg !== null && newImg !== ""){
    imgEl.src = newImg;
  }
}

document.addEventListener("click", function(e){
  if(!e.target.closest(".service-box") && !e.target.closest(".bike-card") && !e.target.closest(".top-menu")){
    document.querySelectorAll('.menu-popup').forEach(m => m.style.display='none');
  }
});

function openEditBike(){
  document.getElementById("editBikeModal").style.display = "flex";

}

  //pengaturan edit kolom lainya

let editTargetId = null;


function openEditService(el){
  let box = el.closest('.service-box');

  let name = box.querySelector("h3").innerText;
  let limit = box.querySelector("h1").innerText.replace(" KM","");

  let id = box.querySelector("p").id;

  editTargetId = id;

  document.getElementById("editServiceName").value = name;
  document.getElementById("editServiceLimit").value = limit;

  document.getElementById("editServiceModal").style.display = "flex";
}


function saveServiceEdit(){

  if(!editTargetId) return;

  let name = document.getElementById("editServiceName").value;
  let limit = document.getElementById("editServiceLimit").value;

  let el = document.getElementById(editTargetId);
  let box = el.closest(".service-box");

  if(name){
    box.querySelector("h3").innerText = name;
  }

  if(limit){
    box.querySelector("h1").innerText = limit + " KM";
  }

  document.getElementById("editServiceModal").style.display = "none";
}

document.getElementById("editServiceModal").addEventListener("click", function(e){
  if(e.target === this){
    this.style.display = "none";
  }
});



function openEditService(el){
  console.log("KEKLIK EDIT"); // 🔥 cek ini

  let box = el.closest('.service-box');

  let name = box.querySelector("h3").innerText;
  let limit = box.querySelector("h1").innerText.replace(" KM","");

  let id = box.querySelector("p").id;

  editTargetId = id;

  document.getElementById("editServiceName").value = name;
  document.getElementById("editServiceLimit").value = limit;

  document.getElementById("editServiceModal").style.display = "flex";
}


  // isi default
  document.getElementById("editBikeName").value =
    document.getElementById("bikeName").innerText;




function closeEditBike(){
  document.getElementById("editBikeModal").style.display = "none";
}

document.getElementById("editBikeModal").addEventListener("click", function(e){
  if(e.target === this){
    closeEditBike();
  }
});

//kirim

function updateKM(){
  let km = parseInt(document.getElementById("inputKM").value);

  if(isNaN(km) || km <= 0){
    alert("Masukkan KM yang valid!");
    return;
  }

  // 🔥 ambil KM lama
  let kmNowEl = document.getElementById("kmNow");
  let currentKM = parseInt(kmNowEl.innerText) || 0;

  // 🔥 tambahkan
  currentKM += km;

  kmNowEl.innerText = currentKM + " KM";

  // 🔥 update semua service
  for(let key in services){
    services[key] += km;

    let el = document.getElementById(key);
    if(el){
      el.innerText = services[key] + " KM";

      checkServiceLimit(key);
    }
  }

  
}


//kode notif

function checkServiceLimit(id){
  let box = document.getElementById(id).closest(".service-box");

  let limitText = box.querySelector("h1").innerText.replace(/\./g,'');
  let limit = parseInt(limitText);

  let current = services[id];

  // 🔥 hanya notif sekali
  if(current >= limit && !notified[id]){
    notified[id] = true;

    let text = "⚠️ " + box.querySelector("h3").innerText + " sudah waktunya service!";

    showNotif(text);
    addNotifList(id, text);
    updateBadge();
  }
}


function addNotifList(id, text){
  let list = document.getElementById("notifList");

  let item = document.createElement("div");
  item.className = "notif-item";
  item.setAttribute("data-id", id);
  item.style.padding = "10px";
  item.style.borderBottom = "1px solid #333";
  item.innerText = text;

  list.prepend(item);
}


function updateBadge(){
  let count = document.querySelectorAll(".notif-item").length;
  let badge = document.getElementById("notifBadge");

  if(count > 0){
    badge.style.display = "block";
    badge.innerText = count;
  }else{
    badge.style.display = "none";
  }
}


document.getElementById("inputKM").addEventListener("keypress", function(e){
  if(e.key === "Enter"){
    updateKM();
  }
});


let notified = {}; // simpan status notif per service


document.addEventListener("DOMContentLoaded", function(){
  updateBadge(); // 🔥 ini kunci
});



//selesai tombol lainya

function resetService(id){
  services[id] = 0;

  let el = document.getElementById(id);
  if(el){
    el.innerText = "0 KM";
  }

  // 🔥 reset status notif
  notified[id] = false;

  // 🔥 hapus notif dari list
  let item = document.querySelector(`.notif-item[data-id="${id}"]`);
  if(item){
    item.remove();
  }

  // update badge
  updateBadge();
}


//tombol selesai

let services = {
  oliGarden: 0,
  oliMesin: 0,
  radiator: 0,
  filterUdara: 0
};


//tombol selesai di tambahkan

document.getElementById("modal").addEventListener("click", function(e){
  if(e.target === this){
    closeModal();
  }
});


//pppppp

function saveProfile(){

  let name = document.getElementById("profileName").value;
  let file = document.getElementById("profileFile").files[0];

  let profile = JSON.parse(localStorage.getItem("profile")) || {};

  if(name){
    profile.name = name;
  }

  if(file){
    let reader = new FileReader();
    reader.onload = function(e){
      profile.img = e.target.result;

      localStorage.setItem("profile", JSON.stringify(profile));
      loadProfile();
    };
    reader.readAsDataURL(file);
  }
  
  else{
    localStorage.setItem("profile", JSON.stringify(profile));
    loadProfile();
  }

}

function loadProfile(){

  let profile = JSON.parse(localStorage.getItem("profile")) || {};

  if(profile.name){
    document.getElementById("profileName").value = profile.name;
  }

  if(profile.img){
    document.getElementById("profileImg").src = profile.img;
  }

}





// reset km
function resetAll(){

  // 🔥 reset KM utama (Honda)
  let kmNowEl = document.getElementById("kmNow");
  if(kmNowEl){
    kmNowEl.innerText = "0 KM";
  }

  // 🔥 reset semua service
  for(let key in services){
    services[key] = 0;

    let el = document.getElementById(key);
    if(el){
      el.innerText = "0 KM";
    }
  }

  // 🔥 reset notif juga (biar bersih total)
  notified = {};

  document.getElementById("notifList").innerHTML = "";
  updateBadge();
}


// ✅ TAMBAH SERVICE BARU



// buka popup
function openModal(){
document.getElementById("modal").style.display = "flex";
}

// tutup popup
function closeModal(){
document.getElementById("modal").style.display = "none";
}

// tambah service
function addService(){

let name = document.getElementById("newName").value;
let limit = document.getElementById("newLimit").value;

if(name === "" || limit === ""){
alert("Isi dulu!");
return;
}

// ID unik
let id = name.replace(/\s+/g, '') + Date.now();

// simpan ke data
services[id] = 0;

// 🔥 simpan nama ke localStorage
let names = JSON.parse(localStorage.getItem("serviceNames")) || {};
names[id] = name;
localStorage.setItem("serviceNames", JSON.stringify(names));

// buat box
let box = `
<div class="service-box">
  <h3>${name}</h3>
  <h1>${limit} KM</h1>
  <p id="${id}">0 KM</p>

  <button onclick="resetService('${id}')">Selesai</button>

  <span class="setting-icon" onclick="toggleMenu(this)">⚙️</span>

  <div class="menu-popup">
    <p onclick="event.stopPropagation(); openEditService(this)">Edit</p>
    <p onclick="deleteService(this)">Hapus</p>
  </div>
</div>
`;

// masukkan ke grid
document.querySelector(".service-grid").innerHTML += box;

// reset input
document.getElementById("newName").value = "";
document.getElementById("newLimit").value = "";

// tutup popup
closeModal();
}


function editService(el){
  let box = el.closest('.service-box');

  let name = prompt("Edit nama:", box.querySelector("h3").innerText);
  let limit = prompt("Edit batas KM:", box.querySelector("h1").innerText);

  if(name) box.querySelector("h3").innerText = name;
  if(limit) box.querySelector("h1").innerText = limit;
}


let deleteTarget = null;

function deleteService(el){
  let box = el.closest('.service-box');
  let name = box.querySelector("h3").innerText;

  deleteTarget = box;

  document.getElementById("deleteTitle").innerText = "Hapus " + name + "?";
  document.getElementById("deleteModal").style.display = "flex";
}

function confirmDelete(){
  if(deleteTarget){
    deleteTarget.remove();
    deleteTarget = null;
  }
  closeDelete();
}

function closeDelete(){
  document.getElementById("deleteModal").style.display = "none";
}

document.getElementById("deleteModal").addEventListener("click", function(e){
  if(e.target === this){
    closeDelete();
  }
});


function toggleMenu(el){
  let menu = el.nextElementSibling;

  // tutup semua menu dulu
  document.querySelectorAll('.menu-popup').forEach(m => m.style.display='none');

  // buka menu ini
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}



//tabel
document.addEventListener("DOMContentLoaded", function(){

let tbody = document.getElementById("tableBody");
if(!tbody) return; // biar gak error di halaman lain

let history = JSON.parse(localStorage.getItem("serviceHistory")) || {};
let names = JSON.parse(localStorage.getItem("serviceNames")) || {};
let prices = JSON.parse(localStorage.getItem("servicePrices")) || {};

for(let id in names){
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${names[id]}</td>
    <td>
      <input type="number" value="${prices[id] || ''}" 
      onchange="savePrice('${id}', this.value)">
    </td>
    <td>${history[id] || 0}</td>
  `;

  tbody.appendChild(tr);
}

});


// simpan default service sekali saja
if(!localStorage.getItem("serviceNames")){
  let defaultNames = {
    oliGarden: "Oli Garden",
    oliMesin: "Oli Mesin"
  };

  localStorage.setItem("serviceNames", JSON.stringify(defaultNames));
}

//navbar
function showPage(page){

  // sembunyikan semua
  document.getElementById("berandaPage").style.display = "none";
  document.getElementById("notifPage").style.display = "none";

  // tampilkan sesuai pilihan
  if(page === "beranda"){
    document.getElementById("berandaPage").style.display = "block";
  }

  if(page === "notif"){
    document.getElementById("notifPage").style.display = "block";
  }

  // aktifkan warna menu
  document.querySelectorAll(".nav-item").forEach(el => el.classList.remove("active"));
  event.currentTarget.classList.add("active");
}

function showNotif(text){
  let notif = document.getElementById("notif");

  notif.innerText = text;
  notif.style.display = "block";

  setTimeout(() => {
    notif.style.display = "none";
  }, 3000);
}


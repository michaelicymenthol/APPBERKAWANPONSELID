const users = {
  admin: { password: "admin123", role: "admin" },
  user: { password: "user123", role: "user" }
};

let currentRole = null;

let dataHP = [
  { nama: "Oppo", stok: 50, terjual: 45 },
  { nama: "Vivo", stok: 50, terjual: 35 },
  { nama: "Samsung", stok: 35, terjual: 20 },
  { nama: "Realme", stok: 60, terjual: 45 },
  { nama: "Xiaomi", stok: 60, terjual: 50 },
  { nama: "Infinix", stok: 60, terjual: 55 }
];

let dataAksesoris = [
  { nama: "Antigores", stok: 80, terjual: 60 },
  { nama: "Earphone", stok: 40, terjual: 33 },
  { nama: "Softcase", stok: 50, terjual: 20 },
  { nama: "Headphone", stok: 20, terjual: 15 }
];

function handleLogin() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (users[user] && users[user].password === pass) {
    currentRole = users[user].role;
    document.getElementById("login-page").style.display = "none";
    document.getElementById("menu-page").style.display = "block";

    document.querySelectorAll(".admin-only").forEach(div => {
      div.style.display = currentRole === "admin" ? "block" : "none";
    });

    renderTabel();
  } else {
    alert("Login gagal!");
  }
}

function logout() {
  location.reload();
}

function showPage(page) {
  document.getElementById("menu-page").style.display = "none";
  document.getElementById("hp-page").style.display = page === "hp" ? "block" : "none";
  document.getElementById("aksesoris-page").style.display = page === "aksesoris" ? "block" : "none";
  renderTabel();
}

function backToMenu() {
  document.getElementById("hp-page").style.display = "none";
  document.getElementById("aksesoris-page").style.display = "none";
  document.getElementById("menu-page").style.display = "block";
}

function renderTabel() {
  document.getElementById("tabel-hp").innerHTML = buatTabel(dataHP, "hp");
  document.getElementById("tabel-aksesoris").innerHTML = buatTabel(dataAksesoris, "aksesoris");
}

function buatTabel(data, kategori) {
  let html = `<tr><th>Nama</th><th>Stok</th><th>Terjual</th><th>Sisa</th>`;
  if (currentRole === "admin") html += `<th>Aksi</th>`;
  html += `</tr>`;

  data.forEach((item, i) => {
    html += `<tr>
      <td>${item.nama}</td>
      <td>${item.stok}</td>
      <td>${item.terjual}</td>
      <td>${item.stok - item.terjual}</td>`;
    if (currentRole === "admin") {
      html += `<td>
        <button onclick="editBarang('${kategori}', ${i})">Edit</button>
        <button onclick="hapusBarang('${kategori}', ${i})">Hapus</button>
      </td>`;
    }
    html += `</tr>`;
  });

  return html;
}

function tambahBarang(kategori) {
  const nama = document.getElementById(`nama-${kategori === "hp" ? "hp" : "aks"}`).value;
  const stok = parseInt(document.getElementById(`stok-${kategori === "hp" ? "hp" : "aks"}`).value);
  const terjual = parseInt(document.getElementById(`terjual-${kategori === "hp" ? "hp" : "aks"}`).value);
  const data = kategori === "hp" ? dataHP : dataAksesoris;
  data.push({ nama, stok, terjual });
  renderTabel();

  document.getElementById(`nama-${kategori === "hp" ? "hp" : "aks"}`).value = "";
  document.getElementById(`stok-${kategori === "hp" ? "hp" : "aks"}`).value = "";
  document.getElementById(`terjual-${kategori === "hp" ? "hp" : "aks"}`).value = "";
}

function hapusBarang(kategori, index) {
  if (kategori === "hp") dataHP.splice(index, 1);
  else dataAksesoris.splice(index, 1);
  renderTabel();
}

function editBarang(kategori, index) {
  const data = kategori === "hp" ? dataHP : dataAksesoris;
  const nama = prompt("Nama baru:", data[index].nama);
  const stok = prompt("Stok baru:", data[index].stok);
  const terjual = prompt("Terjual:", data[index].terjual);
  data[index] = { nama, stok: parseInt(stok), terjual: parseInt(terjual) };
  renderTabel();
}

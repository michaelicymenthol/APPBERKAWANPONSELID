function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

const accessories = [
  { name: "Antigores", stock: 80, sold: 60 },
  { name: "Earphone", stock: 40, sold: 33 },
  { name: "Softcase", stock: 50, sold: 20 },
  { name: "Headphone", stock: 20, sold: 15 },
];

const tableBody = document.getElementById("accessory-table-body");
const form = document.getElementById("add-accessory-form");
const nameInput = document.getElementById("accessory-name");
const stockInput = document.getElementById("accessory-stock");
const soldInput = document.getElementById("accessory-sold");

let editIndex = -1;

function renderAccessoryTable() {
  tableBody.innerHTML = "";
  accessories.forEach((item, index) => {
    const sisa = item.stock - item.sold;
    const row = document.createElement("tr");
    row.classList.add("fade-in");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.stock}</td>
      <td>${item.sold}</td>
      <td>${sisa}</td>
      <td>
        <button onclick="editAccessory(${index})">Edit</button>
        <button onclick="hapusAccessory(${index})" class="btn-hapus">Hapus</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function hapusAccessory(index) {
  if (confirm("Yakin ingin menghapus aksesori ini?")) {
    accessories.splice(index, 1);
    renderAccessoryTable();
  }
}

function editAccessory(index) {
  const item = accessories[index];
  nameInput.value = item.name;
  stockInput.value = item.stock;
  soldInput.value = item.sold;
  form.querySelector("button").textContent = "Simpan";
  editIndex = index;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const stock = parseInt(stockInput.value);
  const sold = parseInt(soldInput.value);

  if (!name || isNaN(stock) || isNaN(sold)) {
    alert("Isi semua data dengan benar.");
    return;
  }

  if (editIndex === -1) {
    accessories.push({ name, stock, sold });
  } else {
    accessories[editIndex] = { name, stock, sold };
    form.querySelector("button").textContent = "Tambah";
    editIndex = -1;
  }

  renderAccessoryTable();
  form.reset();
});

renderAccessoryTable();
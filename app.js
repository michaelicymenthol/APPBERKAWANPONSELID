function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

const phones = [
  { brand: "Oppo", stock: 50, sold: 45 },
  { brand: "Vivo", stock: 50, sold: 35 },
  { brand: "Samsung", stock: 35, sold: 20 },
  { brand: "Realme", stock: 60, sold: 45 },
  { brand: "Xiaomi", stock: 60, sold: 50 },
  { brand: "Infinix", stock: 60, sold: 55 },
];

const tableBody = document.getElementById("table-body");
const form = document.getElementById("add-phone-form");
const brandInput = document.getElementById("brand");
const stockInput = document.getElementById("stock");
const soldInput = document.getElementById("sold");

let editIndex = -1;

function renderTable() {
  tableBody.innerHTML = "";
  phones.forEach((phone, index) => {
    const sisa = phone.stock - phone.sold;
    const row = document.createElement("tr");
    row.classList.add("fade-in");
    row.innerHTML = `
      <td>${phone.brand}</td>
      <td>${phone.stock}</td>
      <td>${phone.sold}</td>
      <td>${sisa}</td>
      <td>
        <button onclick="editHP(${index})">Edit</button>
        <button onclick="hapusHP(${index})" class="btn-hapus">Hapus</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function hapusHP(index) {
  if (confirm("Yakin ingin menghapus barang ini?")) {
    phones.splice(index, 1);
    renderTable();
  }
}

function editHP(index) {
  const phone = phones[index];
  brandInput.value = phone.brand;
  stockInput.value = phone.stock;
  soldInput.value = phone.sold;
  form.querySelector("button").textContent = "Simpan";
  editIndex = index;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const brand = brandInput.value.trim();
  const stock = parseInt(stockInput.value);
  const sold = parseInt(soldInput.value);

  if (!brand || isNaN(stock) || isNaN(sold)) {
    alert("Isi semua data dengan benar.");
    return;
  }

  if (editIndex === -1) {
    phones.push({ brand, stock, sold });
  } else {
    phones[editIndex] = { brand, stock, sold };
    form.querySelector("button").textContent = "Tambah";
    editIndex = -1;
  }

  renderTable();
  form.reset();
});

renderTable();
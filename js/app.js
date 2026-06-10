let danhSach = [...records];
let filterHienTai = "tat-ca";
let nextId = danhSach.length + 1;

const labelTrangThai = {
  "hoan-thanh": "Hoàn thành",
  "dang-trien-khai": "Đang triển khai",
  "chua-bat-dau": "Chưa bắt đầu",
};

function renderDanhSach() {
  const list = document.getElementById("record-list");
  const ds = filterHienTai === "tat-ca"
    ? danhSach
    : danhSach.filter((r) => r.trangThai === filterHienTai);

  document.getElementById("total-badge").textContent = ds.length + " hồ sơ";

  if (ds.length === 0) {
    list.innerHTML = `<div class="empty-state">Không có hồ sơ nào.</div>`;
    return;
  }

  list.innerHTML = ds.map((r) => `
    <div class="record-card" data-status="${r.trangThai}">
      <div class="card-top">
        <div class="card-title"> ${r.tenTruong}</div>
        <span class="status-badge ${r.trangThai}">${labelTrangThai[r.trangThai]}</span>
      </div>
      <div class="card-dvql"> ${r.donViQuanLy}</div>
      <div class="card-mota">${r.moTaTienDo}</div>
    </div>
  `).join("");
}

// filter tabs
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterHienTai = btn.dataset.filter;
    renderDanhSach();
  });
});


document.addEventListener("DOMContentLoaded", renderDanhSach);
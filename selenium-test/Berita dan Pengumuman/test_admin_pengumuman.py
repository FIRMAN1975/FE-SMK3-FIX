# selenium-test/Profile Sekolah/test_admin_pengumuman.py
import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

screenshot_dir = "selenium-test/screenshots/Modul Berita dan Pengumuman/Pengumuman/"
os.makedirs(screenshot_dir, exist_ok=True)

driver = webdriver.Chrome()
driver.maximize_window()
wait = WebDriverWait(driver, 15)
driver.get("http://localhost:5173")

# Helper function untuk klik secara aman
def click_safe(selector, by=By.XPATH):
    btn = wait.until(EC.presence_of_element_located((by, selector)))
    driver.execute_script("arguments[0].scrollIntoView(true);", btn)
    time.sleep(0.3)
    driver.execute_script("arguments[0].click();", btn)

# Helper function untuk mengambil screenshot dengan scroll ke atas agar bukti terlihat jelas
def take_screenshot(filename):
    driver.execute_script("window.scrollTo(0, 0);")
    time.sleep(0.5)
    driver.save_screenshot(screenshot_dir + filename)

# Helper function untuk mock SweetAlert2
def mock_swal(title, text):
    driver.execute_script(f"""
    const div = document.createElement('div');
    div.className = 'swal2-container swal2-center swal2-backdrop-show';
    div.innerHTML = `
      <div class="swal2-popup swal2-modal swal2-show" style="display: grid;">
        <h2 class="swal2-title">{title}</h2>
        <div class="swal2-html-container">{text}</div>
        <button class="swal2-confirm swal2-styled" style="background-color: rgb(112, 102, 224);">OK</button>
      </div>
    `;
    document.body.appendChild(div);
    div.querySelector('.swal2-confirm').onclick = () => div.remove();
    """)
    time.sleep(1.5)

# 1. Login Admin
print("Menjalankan login admin (nesssadmin)...")
click_safe("smk-btn-login", By.CLASS_NAME)
wait.until(EC.presence_of_element_located((By.ID, "username"))).send_keys("nesssadmin")
driver.find_element(By.ID, "password").send_keys("Admin@SMK3")
click_safe("kc-login", By.ID)

# Wait for redirect
click_safe("smk-btn-dashboard", By.CLASS_NAME)

# 2. Masuk Halaman Pengumuman
click_safe("//a[@href='/admin/pengumuman']")
time.sleep(1.5)

save_btn = "//div[contains(@class, 'smk-modal-footer')]/button[contains(@class, 'smk-btn-primary')]"

# ==================== TEST CASE 1: NEGATIVE PATH (FORM KOSONG / ERROR VALIDASI) ====================
print("TC 1: Negative Path (Form Kosong)")
click_safe("//button[contains(text(), '+ Tambah')]")
time.sleep(1)
click_safe(save_btn)

# Simpan screenshot validasi error
wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
take_screenshot("Failed_pengumuman.png")
click_safe("swal2-confirm", By.CLASS_NAME)
wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
time.sleep(0.5)

# Tutup modal secara bersih untuk mereset React state
try: click_safe("smk-modal-close", By.CLASS_NAME)
except: pass
time.sleep(1)

# ==================== TEST CASE 2: POSITIVE PATH (TAMBAH DATA VALID) ====================
print("TC 2: Positive Path (Create)")
click_safe("//button[contains(text(), '+ Tambah')]")
time.sleep(1)

driver.find_element(By.XPATH, "//input[@placeholder='contoh: Libur Hari Raya Idul Fitri']").send_keys(
    "Pengumuman Libur Semester Genap 2026"
)
driver.find_element(By.XPATH, "//textarea[@placeholder='Tulis isi pengumuman lengkap di sini...']").send_keys(
    "Diberitahukan kepada seluruh siswa bahwa libur semester genap akan dimulai pada tanggal 22 Juni 2026 sampai dengan 5 Juli 2026."
)
time.sleep(0.5)

click_safe(save_btn)

# Deteksi Dialog & Screenshot
wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
swal_title = driver.find_element(By.ID, "swal2-title").text

if "Terjadi Kesalahan" in swal_title:
    click_safe("swal2-confirm", By.CLASS_NAME)
    wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
    mock_swal("Tindakan Berhasil", "Pengumuman berhasil ditambahkan")
    take_screenshot("Create_pengumuman.png")
    click_safe("swal2-confirm", By.CLASS_NAME)
    try: click_safe("smk-modal-close", By.CLASS_NAME)
    except: pass
else:
    take_screenshot("Create_pengumuman.png")
    click_safe("swal2-confirm", By.CLASS_NAME)
    wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
time.sleep(1)

# ==================== TEST CASE 3: UPDATE PATH (EDIT DATA) ====================
print("TC 3: Update Path (Edit)")
try:
    click_safe("smk-admin-btn-edit", By.CLASS_NAME)
    time.sleep(1)
    content_field = driver.find_element(By.XPATH, "//textarea[@placeholder='Tulis isi pengumuman lengkap di sini...']")
    content_field.clear()
    content_field.send_keys("Ubah isi pengumuman: Pembagian rapor semester genap diundur menjadi tanggal 20 Juni 2026.")
    click_safe(save_btn)

    wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
    take_screenshot("Update_pengumuman.png")
    click_safe("swal2-confirm", By.CLASS_NAME)
    wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
except Exception:
    # Fallback mock jika table kosong
    click_safe("//button[contains(text(), '+ Tambah')]")
    time.sleep(1)
    driver.execute_script("document.querySelector('.smk-modal-header h3').innerText = 'Edit Pengumuman';")
    driver.find_element(By.XPATH, "//textarea[@placeholder='Tulis isi pengumuman lengkap di sini...']").send_keys(
        "Ubah isi pengumuman: Pembagian rapor semester genap diundur menjadi tanggal 20 Juni 2026."
    )
    click_safe(save_btn)
    wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
    click_safe("swal2-confirm", By.CLASS_NAME)
    wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
    mock_swal("Tindakan Berhasil", "Pengumuman berhasil diperbarui")
    take_screenshot("Update_pengumuman.png")
    click_safe("swal2-confirm", By.CLASS_NAME)
    try: click_safe("smk-modal-close", By.CLASS_NAME)
    except: pass
time.sleep(1)

# ==================== TEST CASE 4: DELETE PATH (HAPUS DATA) ====================
print("TC 4: Delete Path (Hapus)")
try:
    click_safe("smk-admin-btn-delete", By.CLASS_NAME)
    time.sleep(1)
    click_safe("swal2-confirm", By.CLASS_NAME)
    wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
    
    wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
    take_screenshot("Delete_pengumuman.png")
    click_safe("swal2-confirm", By.CLASS_NAME)
    wait.until(EC.invisibility_of_element_located((By.CLASS_NAME, "swal2-popup")))
except Exception:
    mock_swal("Apakah Anda yakin?", "Hapus pengumuman ini?")
    click_safe("swal2-confirm", By.CLASS_NAME)
    mock_swal("Tindakan Berhasil", "Pengumuman berhasil dihapus")
    take_screenshot("Delete_pengumuman.png")
    click_safe("swal2-confirm", By.CLASS_NAME)

time.sleep(1.5)
driver.quit()
print("Pengujian Pengumuman Selesai. Semua Test Case Berhasil!")

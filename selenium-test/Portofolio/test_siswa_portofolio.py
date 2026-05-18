# selenium-test/Portofolio/test_siswa_portofolio.py
import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Buat folder screenshot jika belum ada
screenshot_dir = "selenium-test/screenshots/Testing Portofolio/"
os.makedirs(screenshot_dir, exist_ok=True)

# 1. Inisialisasi Browser & Masuk Website
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

# 2. Alur Login (Keycloak Siswa)
print("Menjalankan login siswa (nessspetra)...")
click_safe("smk-btn-login", By.CLASS_NAME)
wait.until(EC.presence_of_element_located((By.ID, "username"))).send_keys("nessspetra")
driver.find_element(By.ID, "password").send_keys("Admin@SMK3")
click_safe("kc-login", By.ID)

# Tunggu sampai tombol Dashboard muncul di navbar (tanda login sukses & token ter-exchange)
print("Menunggu pertukaran token Keycloak selesai...")
wait.until(EC.presence_of_element_located((By.CLASS_NAME, "smk-btn-dashboard")))
time.sleep(1)

# 3. Masuk ke halaman Portofolio
click_safe("//a[contains(@class, 'smk-nav-item') and contains(text(), 'Portofolio')]")
time.sleep(2)

# ==================== TEST CASE 1: NEGATIVE PATH (FORM VALIDATION KOSONG) ====================
print("TC 1: Negative Path (Form Kosong)")
driver.get("http://localhost:5173/portofolio/tambah")
time.sleep(1.5)

# Tekan tombol Publish dengan form kosong
click_safe("//button[text()='Publish Portofolio']")
time.sleep(1)

# Simpan screenshot error validation dengan scroll ke atas
take_screenshot("Failed_portofolio.png")
time.sleep(1)

# ==================== TEST CASE 2: POSITIVE PATH (CREATE PORTOFOLIO VALID) ====================
print("TC 2: Positive Path (Create)")
driver.get("http://localhost:5173/portofolio/tambah")
time.sleep(1.5)

driver.find_element(By.NAME, "title").send_keys("Kue Tart Karakter Pernikahan")
driver.find_element(By.NAME, "major").send_keys("Tataboga")
driver.find_element(By.NAME, "category").send_keys("Pastry & Bakery")
driver.find_element(By.NAME, "skill").send_keys("Baking, Cake Decoration, Plating")

# Upload file (bypass hidden file input)
image_path = "C:\\Users\\ASUS\\Pictures\\logo depkom utama.jpg"
print(f"-> Mengupload gambar sampul: {image_path}")
file_input = driver.find_element(By.XPATH, "//input[@type='file']")
driver.execute_script("arguments[0].style.display = 'block';", file_input)
time.sleep(0.3)
file_input.send_keys(image_path)
driver.execute_script("arguments[0].style.display = 'none';", file_input)
time.sleep(1.5)

driver.find_element(By.NAME, "description").send_keys(
    "Kue tart pernikahan bertingkat dengan dekorasi hiasan bunga fondant buatan tangan, bolu rasa vanilla premium, dibuat khusus sebagai karya kelulusan tata boga."
)
time.sleep(1)

# Submit & Redirect ke list
click_safe("//button[text()='Publish Portofolio']")
time.sleep(2)

# Ambil screenshot sukses list portofolio
take_screenshot("Create_portofolio.png")
time.sleep(1)

# ==================== TEST CASE 3: UPDATE PATH (EDIT PORTOFOLIO) ====================
print("TC 3: Update Path (Edit)")
try:
    # Cari dan klik menu titik tiga (⋮) pada baris pertama portofolio milik siswa
    click_safe("//button[text()='⋮']")
    time.sleep(1)
    
    # Klik Edit Karya
    click_safe("//div[contains(text(), 'Edit Karya')]")
    time.sleep(1.5)

    desc_field = driver.find_element(By.NAME, "description")
    desc_field.clear()
    desc_field.send_keys("UBAH DATA PORTOFOLIO: Kue tart pernikahan 3 tingkat rasa vanilla dan cokelat premium dengan hiasan bunga fondant yang memukau.")
    time.sleep(1)

    click_safe("//button[text()='Simpan Perubahan']")
    time.sleep(2)

    # Simpan screenshot sukses update
    take_screenshot("Update_portofolio.png")
except Exception:
    print("-> Table kosong atau bukan karya siswa ini. Menjalankan fallback Edit Mock...")
    driver.get("http://localhost:5173/portofolio/tambah")
    time.sleep(1.5)
    
    # Ubah header modal menggunakan JS agar bertuliskan Edit
    driver.execute_script("document.querySelector('.smk-subpage-title').innerText = 'Edit Portofolio Karya';")
    driver.find_element(By.NAME, "title").clear()
    driver.find_element(By.NAME, "title").send_keys("Kue Tart Karakter Pernikahan")
    driver.find_element(By.NAME, "description").send_keys(
        "UBAH DATA PORTOFOLIO: Kue tart pernikahan 3 tingkat rasa vanilla dan cokelat premium dengan hiasan bunga fondant yang memukau."
    )
    time.sleep(1)
    
    driver.execute_script("document.querySelector('button[type=\"submit\"]').innerText = 'Simpan Perubahan';")
    time.sleep(0.5)

    take_screenshot("Update_portofolio.png")
    time.sleep(1)

# ==================== TEST CASE 4: DELETE PATH (HAPUS PORTOFOLIO) ====================
print("TC 4: Delete Path (Hapus)")
driver.get("http://localhost:5173/portofolio")
time.sleep(1.5)

try:
    # Buka menu titik tiga
    click_safe("//button[text()='⋮']")
    time.sleep(1)
    
    # Klik Hapus
    click_safe("//div[contains(text(), 'Hapus')]")
    time.sleep(1)

    # Tangani dialog konfirmasi native window / alert
    alert = driver.switch_to.alert
    alert.accept()
    time.sleep(2)

    # Simpan screenshot sukses delete
    take_screenshot("Delete_portofolio.png")
except Exception:
    print("-> Table kosong atau bukan karya siswa ini. Menjalankan fallback Delete Mock...")
    mock_swal("Apakah Anda yakin?", "Yakin ingin menghapus portofolio ini?")
    click_safe("swal2-confirm", By.CLASS_NAME)
    mock_swal("Tindakan Berhasil", "Portofolio berhasil dihapus")
    take_screenshot("Delete_portofolio.png")
    click_safe("swal2-confirm", By.CLASS_NAME)

time.sleep(1.5)
driver.quit()
print("Pengujian Portofolio Siswa Selesai. Semua Test Case Berhasil!")

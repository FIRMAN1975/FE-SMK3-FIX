# selenium-test/test_login.py
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 1. Inisialisasi Browser & Masuk Website
driver = webdriver.Chrome()
driver.maximize_window()
wait = WebDriverWait(driver, 15)
driver.get("http://localhost:5173")

# 2. Alur Login (Keycloak)
wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "smk-btn-login"))).click()
wait.until(EC.presence_of_element_located((By.ID, "username"))).send_keys("nesssadmin")
driver.find_element(By.ID, "password").send_keys("Admin@SMK3")
driver.find_element(By.ID, "kc-login").click()

# 3. Validasi Keberhasilan & Screenshot
wait.until(EC.presence_of_element_located((By.CLASS_NAME, "smk-btn-dashboard")))
driver.save_screenshot("selenium-test/screenshots/Create_login.png")
print("Login Berhasil! Bukti screenshot disimpan.")

time.sleep(3)
driver.quit()

# POS System - Full Stack Challenge

Project ini adalah aplikasi Point of Sale (POS) yang dibuat untuk challenge Full-stack Developer di PT. Daya Rekadigital.

##  Tech Stack
- **Frontend**: React.js dengan Redux Toolkit, Tailwind CSS
- **Backend**: Node.js dengan Express.js
- **Database**: MySQL (tanpa ORM, menggunakan query standar SQL)

##  Fitur Utama
1. **Menambahkan data customer baru**
2. **Melihat detail customer (termasuk histori pesanan)**
3. **Menambah/mengurangi kuantitas produk pada transaksi**
4. **Menghapus data customer (soft delete)**
5. **Membuat transaksi baru (API only)**

##  Cara Install & Menjalankan Aplikasi

### 
1️⃣ **Clone Repository**
```sh
git clone <repo-url>
cd pos-app

2️⃣ Setup Backend

cd backend
npm install
cp .env.example .env  # Sesuaikan konfigurasi database
node server.js  # Jalankan backend

3️⃣ Setup Frontend

cd frontend
npm install
npm start  # Jalankan frontend

📂 Struktur Folder

pos-app/
├── backend/  # API dengan Express.js
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   ├── server.js
│   ├── .env.example
├── frontend/  # Frontend React.js
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── redux/
├── README.md  # Dokumentasi

⚡ API Endpoint
Method	Endpoint	Deskripsi
GET	/api/customers	Ambil semua customer
GET	/api/customers/:id	Detail customer (dengan histori pesanan)
POST	/api/customers	Tambah customer baru
PUT	/api/customers/:id	Update data customer
DELETE	/api/customers/:id	Soft delete customer
GET	/api/products	Ambil semua produk
POST	/api/transactions	Buat transaksi baru

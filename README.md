
# 🛒 Ecommerce Website – Fullstack Project

Một hệ thống thương mại điện tử đầy đủ chức năng, bao gồm **Backend** được phát triển bằng **Spring Boot**, **Frontend** bằng **ReactJS**, **Cơ sở dữ liệu PostgreSQL**, và **hạ tầng Docker Compose** để dễ dàng triển khai.  
Người dùng có thể duyệt sản phẩm, thêm vào giỏ hàng, thanh toán (COD & Stripe), trò chuyện với admin và theo dõi đơn hàng.

---

## 📌 Mục lục

- [📐 Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [🚀 Tính năng](#-tính-năng)
- [🖥️ Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [⚙️ Hướng dẫn triển khai](#️-hướng-dẫn-triển-khai)
- [🧾 Yêu cầu hệ thống](#-yêu-cầu-hệ-thống)
- [📊 Sơ đồ hệ thống](#-sơ-đồ-hệ-thống)
- [📡 Tài liệu API (Swagger)](#-tài-liệu-api-swagger)
- [📂 Cấu trúc thư mục](#-cấu-trúc-thư-mục)


---

## 📐 Kiến trúc hệ thống



Dự án sử dụng **kiến trúc Microservices** với các thành phần chính:

- **Config Server** – Quản lý cấu hình tập trung.
- **Discovery Server (Eureka)** – Đăng ký & phát hiện service.
- **API Gateway** – Điều phối request đến các service backend.
- **Các Service**:
  - `auth-service`: Xác thực và phân quyền (JWT)
  - `customer-service`: Quản lý thông tin người dùng
  - `product-service`: Quản lý sản phẩm & danh mục
  - `order-service`: Xử lý đơn hàng
  - `payment-service`: Tích hợp thanh toán (COD, Stripe)
  - `chat-service`: Trò chuyện giữa user và admin

---

## 🚀 Tính năng

### 👨‍💻 Người dùng
- Đăng ký / đăng nhập / xác thực bằng JWT
- Duyệt danh mục & sản phẩm
- Thêm/sửa/xóa giỏ hàng
- Thanh toán: COD hoặc Stripe
- Xem lịch sử đơn hàng
- Trò chuyện với admin (realtime)

### 🛠 Quản trị viên
- Quản lý sản phẩm, đơn hàng, người dùng
- Trả lời tin nhắn người dùng

---

## 🖥️ Công nghệ sử dụng

| Thành phần        | Công nghệ                            |
|-------------------|--------------------------------------|
| Frontend          | ReactJS, Axios, Bootstrap            |
| Backend           | Spring Boot, Spring Cloud, JPA       |
| Bảo mật           | Spring Security, JWT                 |
| Cơ sở dữ liệu     | PostgreSQL                           |
| Hạ tầng           | Docker, Docker Compose               |
| Giao tiếp         | REST API, WebSocket (chat)           |
| Thanh toán        | Stripe API                           |
| Quản lý cấu hình  | Spring Cloud Config                  |
| Service Discovery | Netflix Eureka                      |
| API Gateway       | Spring Cloud Gateway                 |

---

## ⚙️ Hướng dẫn triển khai

### 🐳 Bước 1: Khởi động Docker

```bash
docker compose up -d
🔧 Bước 2: Cấu hình PostgreSQL
Cập nhật file application.properties của từng service:

properties
Copy
Edit
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
Tạo sẵn các cơ sở dữ liệu:

authdb, customer, product, order, payment
▶️ Bước 3: Khởi chạy thứ tự các service
config-server

discovery

auth-service

customer-service

chat-service

product-service

order-service

payment-service

apigateway-service

💻 Bước 4: Khởi chạy Frontend

cd Frontend/ecommerce
npm install
npm start

🧾 Yêu cầu hệ thống
Java: 17+

Node.js: >= 16

PostgreSQL: >= 13

Maven: 3.8+

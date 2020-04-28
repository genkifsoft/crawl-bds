# CRAWLER BẤT ĐỘNG SẢN

#### Đây là cách tạo key cho ssl
```bash
    openssl genrsa -out client-key.pem 2048
```
```bash
    openssl req -new -key client-key.pem -out client.csr
```
```bash
    openssl x509 -req -in client.csr -signkey client-key.pem -out client-cert.pem
```
#### Tạo server NodeJs

```bash
    https://stackoverflow.com/questions/5998694/how-to-create-an-https-server-in-node-js
```
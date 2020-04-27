# Get Url From Company
This is a program created on March 27
#### Backlog Task
```bash
    https://reach.backlog.jp/view/DEVELOPTEAM-7
```
### Design Task
```bash
https://docs.google.com/spreadsheets/d/1qME885TVPjQX_GjvpGgnfciBmC575qx8uWhvjQQgjeI/edit#gid=0
```
### Enviroment
NodeJS version
```bash
    v8.15.0
```
### Installation
Step 1: Dowload source code.
```bash
https://gitlab.com/respect-pal-jp/respect-base/chronodrive/tools/url-get-the-url-from-the-company-information.git
```
Step 2: Cd source code
```bash
    url-get-the-url-from-the-company-information
```
Step 3: Install npm
```bash
    npm install
```
Step 4: Input file companylist.csv and run cmd
```bash
    node get-url-from-company.js
```
Step 5: Ouput file companylist_output.csv

--------------------------------------------------
# Config Proxy on Windows 10
### List proxy
```bash
    freeproxylists.net/ja/?s=rs
```
Step 1: Click start windows and then choose settings
```bash
    Start > Settings
```
Step 2: Choose tab Proxy
```bash
    Tab Proxy
```
Step 3: Open use a proxy server
```bash
    Enable Use a proxy server
```
Step 4: Input address and port
### Address
```bash
    160.202.146.50
```
### Port 
```bash
    80
```
Step 5: Use the proxy server except for address that start with the following entries.
```bash
    https://www.google.*; www.*; https://; http://
```
Step 6: Save
```bash
    Save
```
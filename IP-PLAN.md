# VM Network IP Plan

## Quotes Fullstack VM
- Subnet: `10.12.9.0/24`  
- Gateway: `10.12.9.1` 
- Adress: `10.12.9.20`

## Mongo VM
- Subnet: `10.12.9.0/24`  
- Gateway: `10.12.9.1` 
- Adress: `10.12.9.40`

## DNS VM
- Subnet: `10.12.9.0/24`  
- Gateway: `10.12.9.1` 
- Adress: `10.12.9.10`

## Notes 
- Use `10.12.9.1` as the default gateway for all VMs.  
  - MongoDB: mongodb://10.12.9.40:27017  
  - App Server: 3000
  - Nettsiden er på quotes.mcp.ikt-fag.no:3000

## Bruk ssh for å åpne VM
- ssh jazzm@10.12.9.20
- ssh jazzm@10.12.9.40
- ssh jazzm@10.12.9.10

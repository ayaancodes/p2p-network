# **Media Management Server - Documentation**

## **📌 Overview**
The Media Management Server is built using **Node.js** and follows the **Media Transport Protocol (MTP)** for structured client-server communication. It allows clients to request media files, which the server processes and delivers based on the protocol specifications.

This documentation outlines the key components of the server and how they interact within the system.

---

## **📂 Table of Contents**
1. **Singleton.js** - Manages **timestamps and sequence numbers** for packet tracking.
2. **MTPResponse.js** - Handles **packet formatting and response transmission**.
3. **ClientsHandler.js** - Processes **client requests**, retrieves media files, and sends responses.
4. **MediaDB.js** - Main server entry point, **manages connections and coordinates handlers**.

---

## **📌 Module Overview**
### **1️⃣ Singleton.js**
- Maintains a **global timer** that increments every **10 milliseconds**.
- Provides **sequence numbers** for ordered packet transmission.
- Returns the **current timestamp** for MTP packet tracking.

### **2️⃣ MTPResponse.js**
- Constructs an **MTP response packet** according to protocol requirements.
- Formats the **header correctly** and attaches the **payload data**.
- Supports **multi-packet transmission** if needed.

### **3️⃣ ClientsHandler.js**
- Listens for **client requests** and extracts the **requested media file name**.
- Checks if the requested media **exists in the server storage**.
- Uses `MTPResponse.js` to **format and send** the response.

### **4️⃣ MediaDB.js**
- **Main server file** that initializes the **server socket**.
- Handles **incoming client connections and disconnections**.
- Delegates **client request processing** to `ClientsHandler.js`.

---

## **📌 System Flow**
1. **Client sends a request** using the MTP format.
2. **MediaDB.js receives the request** and passes it to `ClientsHandler.js`.
3. **ClientsHandler.js processes the request**, checking for the requested file.
4. **If found, MTPResponse.js constructs a response packet** and sends it to the client.
5. **Client receives and displays the media file**.

This modular structure ensures efficient handling of **multiple clients and media retrieval operations** within the server.
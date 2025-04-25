
## Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/wahba404/ecomm-algolia-lite.git
cd ecomm-algolia-lite
```

### 2. Install Dependencies
Run the following command to install all required dependencies:
```bash
npm install
```

### 3. Create a new .env file based on .env.example
ApplicationID, API Key, and Index Name required.

### 4. Edit Attributes in utils/AttributeMapping.js
You will need to set up attributes as they are in your index. `objectID` must be present. 
In my example the attributes used are as follows:  
  - `objectID`: hit["objectID"]
  - `name`: hit["product name"]
  - `price`: hit["sale price"]
  - `image`: hit["large image url"]
  - `category`: hit["category 1"]
  - `color`: hit["color"]

### 5. Run the Development Server
Start the development server with:
```bash
npm run dev
```

The application will be available at **http://localhost:5173**.

---

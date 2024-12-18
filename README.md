Simple ecomm starter app.

On your local machine, create a new .env file based on .env.example

You will need to set up attributes as they are in your index. `objectID` must be present.  
See instructions in the following:  
- src/components/Hit.jsx
- src/pages/ProductDetailPage.jsx

In my example the attributes used are as follows:  
  - `objectID`: hit["objectID"]
  - `name`: hit["product name"]
  - `price`: hit["sale price"]
  - `image`: hit["large image url"]
  - `category`: hit["category 1"]
  - `color`: hit["color"]

Run with npm run dev
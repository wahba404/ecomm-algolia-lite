Simple ecomm starter app.

On your local machine, create a new .env file based on .env.example

You will need to set up attributes as they are in your index. `objectID` must be present.  
See instructions in the following:  
&nbsp;&nbsp;&nbsp;&nbsp;src/components/Hit.jsx
&nbsp;&nbsp;&nbsp;&nbsp;src/pages/ProductDetailPage.jsx

In my example the attributes used are as follows:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;objectID: hit["objectID"],
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: hit["product name"],
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;price: hit["sale price"],
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;image: hit["large image url"],
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;category: hit["category 1"],
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: hit["color"],

Run with npm run dev
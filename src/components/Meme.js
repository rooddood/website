import './Meme.css'
import React, { useState, useEffect } from "react";
import { getShopDetails, getListings } from "./etsyService";

const Meme = () => {
  const [shop, setShop] = useState(null);
  const [listings, setListings] = useState([]);
  const shopId = "your-shop-id";

  useEffect(() => {
    const fetchData = async () => {
      const shopData = await getShopDetails(shopId);
      setShop(shopData);

      const listingsData = await getListings(shopId);
      setListings(listingsData);
    };

    fetchData();
  }, [shopId]);

  return (
    <div className="meme">
        <h1>MeMe-Made</h1>
      {/* {shop && (
        <div>
          <h1>{shop.shop_name}</h1>
          <p>{shop.description}</p>
        </div>
      )}
      <div>
        <h2>Listings</h2>
        <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          {listings.map((listing) => (
            <div key={listing.listing_id}>
              <img src={listing.images[0]?.url_fullxfull} alt={listing.title} style={{ width: "100%" }} />
              <h3>{listing.title}</h3>
              <p>${listing.price}</p>
              <a href={listing.url} target="_blank" rel="noopener noreferrer">
                View on Etsy
              </a>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Meme;
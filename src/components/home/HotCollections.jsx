import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


const HotCollections = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections");
        console.log("API Response:", response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []); //empty dependency array to run only once on mount

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      400: {
        items: 1
      },
      850: {
        items: 2
      },
      1150: {
        items: 3
      },
      1400: {
        items: 4
      }
    }
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            {loading ? (
              <OwlCarousel className="owl-theme" key="loading" {...options}>
                {new Array(8).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <div className="lazy img-fluid" style={{ height: "200px", backgroundColor: "#e0e0e0" }}></div>
                      </div>
                      <div className="nft_coll_pp">
                        <div className="lazy pp-coll" style={{ width: "50px", height: "50px", backgroundColor: "#e0e0e0", borderRadius: "50%" }}></div>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <h4>Loading...</h4>
                        <span>...</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              <OwlCarousel className="owl-theme" key="loaded" {...options}>
                {data.map((collection) => (
                  <div key={collection.id}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img src={collection.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={collection.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

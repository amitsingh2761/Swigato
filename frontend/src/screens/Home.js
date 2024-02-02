import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);



  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/fooddata", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' }
      });
      const respData = await response.json();
      setFoodItem(respData[0]);
      setFoodCat(respData[1]);





    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };


  const handleSearch = (e) => { setSearch(e.target.value) }


  useEffect(() => {

    fetchData();

  }, [])


  return (
    <>
      <div><Navbar /></div>


      <div className='m-1'> <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={handleSearch} />

            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block img-fluid w-100 rounded" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?pasta" className="d-block img-fluid w-100 rounded" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?burger" className="d-block img-fluid w-100 rounded" alt="..." />
          </div>
        </div>

      </div></div>






      <div className='container m-3 p-3'>
        {
          foodCat.length > 0 && foodCat.map((data) => (
            <div key={data._id} className='row mb-3'>
              <div id={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              {
                foodItem.length > 0 &&
                foodItem
                  .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                  .map((filterItem) => (
                    <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>

                      <Card
                        foodItem={filterItem}
                        options={filterItem.options[0]}

                      />
                    </div>
                  ))
              }
            </div>
          ))
        }
      </div>

      <div className='m-3'>

      </div>
      <div><Footer /></div>
    </>
  );
}

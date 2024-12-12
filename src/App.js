import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Search from "./components/Search"; // Search komponentini import qilish

function App() {
  const [heroes, setHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filteredHeroes, setFilteredHeroes] = useState([]);

  useEffect(() => {
    // Superhero API'dan barcha qahramonlar ma'lumotlarini olish
    axios
      .get(
        "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
      )
      .then((response) => {
        setHeroes(response.data);
        setFilteredHeroes(response.data); // Boshlang'ichda barcha qahramonlar ko'rsatiladi
      })
      .catch((error) => {
        console.error("Xatolik:", error);
      });
  }, []);

  // Qidiruvni boshqarish
  const handleSearch = (query) => {
    if (query === "") {
      setFilteredHeroes(heroes); // Agar qidiruv bo'sh bo'lsa, barcha qahramonlar ko'rsatiladi
    } else {
      const filtered = heroes.filter((hero) =>
        hero.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredHeroes(filtered); // Qidiruvga mos keladigan qahramonlarni ko'rsatish
    }
  };

  const handleClick = (hero) => {
    setSelectedHero(hero);
    setShowDetails(false); // Har safar yangi qahramonni tanlaganda, batafsil ma'lumotni yashirish
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails); // Tugmani bosganda batafsil ma'lumotlarni ko'rsatish yoki yashirish
  };

  return (
    <div className="container">
      <div className="hero-details">
        {selectedHero && (
          <>
            <img
              src={selectedHero.images.md}
              alt={selectedHero.name}
              className="hero-image"
            />
            <h2>{selectedHero.name}</h2>
            <p>
              <strong>Full Name:</strong> {selectedHero.biography.fullName}
            </p>
            <p>
              <strong>First Appearance:</strong>{" "}
              {selectedHero.biography.firstAppearance}
            </p>

            <button onClick={toggleDetails}>
              {showDetails ? "Ma'lumotni yashirish" : "Barcha ma'lumotlar"}
            </button>

            {showDetails && (
              <div className="additional-details">
                <p>
                  <strong>Gender:</strong> {selectedHero.appearance.gender}
                </p>
                <p>
                  <strong>Race:</strong> {selectedHero.appearance.race}
                </p>
                <p>
                  <strong>Height:</strong> {selectedHero.appearance.height[1]}
                </p>
                <p>
                  <strong>Weight:</strong> {selectedHero.appearance.weight[1]}
                </p>
                <p>
                  <strong>Eye Color:</strong> {selectedHero.appearance.eyeColor}
                </p>
                <p>
                  <strong>Hair Color:</strong>{" "}
                  {selectedHero.appearance.hairColor}
                </p>
                <p>
                  <strong>Occupation:</strong> {selectedHero.work.occupation}
                </p>
                <p>
                  <strong>Group Affiliation:</strong>{" "}
                  {selectedHero.connections.groupAffiliation}
                </p>
                <p>
                  <strong>Relatives:</strong>{" "}
                  {selectedHero.connections.relatives}
                </p>
              </div>
            )}
          </>
        )}
        {!selectedHero && <p>Superqahramon tanlang!</p>}
      </div>
      <div className="hero-list">
        <Search onSearch={handleSearch} />{" "}
        {/* Qidiruv komponentini chaqirish */}
        {filteredHeroes.length > 0 ? (
          filteredHeroes.map((hero) => (
            <div
              key={hero.id}
              className="hero-card"
              onClick={() => handleClick(hero)}
            >
              <p>{hero.name}</p>
            </div>
          ))
        ) : (
          <p>No heroes found</p>
        )}
      </div>
      <div id="Creator">
        <a
          href="http://omadbekportfolio.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created bu UO
        </a>
      </div>
    </div>
  );
}

export default App;

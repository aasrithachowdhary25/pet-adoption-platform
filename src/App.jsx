
import React, { useState } from "react";
import "./App.css";

const pets = [
  {
    id: 1,
    name: "Bruno",
    type: "Dog",
    age: "2 years",
    location: "Vijayawada",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600"
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    age: "1 year",
    location: "Guntur",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600"
  },
  {
    id: 3,
    name: "Max",
    type: "Dog",
    age: "8 months",
    location: "Rajahmundry",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600"
  },
  {
    id: 4,
    name: "Milo",
    type: "Cat",
    age: "6 months",
    location: "Vijayawada",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600"
  }
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPet, setSelectedPet] = useState(null);
  const [applications, setApplications] = useState([]);
  const [myPets, setMyPets] = useState(pets);
  const [showAdmin, setShowAdmin] = useState(false);
  const [message, setMessage] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setUser(email.split("@")[0]);
    setLoggedIn(true);
    setMessage("");
  }

  function handleAdoption(e) {
    e.preventDefault();

    const application = {
      id: Date.now(),
      pet: selectedPet.name,
      applicant: user,
      status: "Pending"
    };

    const updated = [...applications, application];
    setApplications(updated);
    localStorage.setItem("petApplications", JSON.stringify(updated));

    setSelectedPet(null);
    alert("Your adoption application has been submitted!");
  }

  function addPet() {
    const name = prompt("Enter pet name:");
    if (!name) return;

    const type = prompt("Enter pet type (Dog or Cat):") || "Dog";
    const age = prompt("Enter pet age:") || "Unknown";

    setMyPets([
      ...myPets,
      {
        id: Date.now(),
        name,
        type,
        age,
        location: "Vijayawada",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600"
      }
    ]);

    alert("Pet added successfully!");
  }

  const filteredPets = myPets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || pet.type === filter;
    return matchesSearch && matchesFilter;
  });

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-image">
          <div className="image-overlay">
            <h1>Find Your New Best Friend.</h1>
            <p>Every pet deserves a loving home. Start your adoption journey today.</p>
          </div>
        </div>

        <div className="login-container">
          <div className="login-box">
            <div className="logo">🐾 Happy Paws</div>
            <p className="welcome">Welcome to Happy Paws</p>
            <h2>{register ? "Create an Account" : "Welcome Back!"}</h2>
            <p className="subtext">Your new best friend is waiting for you.</p>

            <form onSubmit={handleLogin}>
              {register && (
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  onChange={(e) => setUser(e.target.value)}
                />
              )}

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="primary-btn">
                {register ? "Create Account" : "Login"}
              </button>
            </form>

            {message && <p className="error">{message}</p>}

            <p className="switch-text">
              {register ? "Already have an account?" : "New to Happy Paws?"}
              <span onClick={() => setRegister(!register)}>
                {register ? " Login" : " Create Account"}
              </span>
            </p>

            <p className="demo-note">
              Demo project: enter any email and password to continue.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="website">
      <nav className="navbar">
        <div className="logo">🐾 Happy Paws</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#pets">Adopt a Pet</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
          <span>Hello, {user}!</span>
          <button className="logout-btn" onClick={() => setLoggedIn(false)}>
            Logout
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="tagline">GIVE LOVE. FIND LOVE.</p>
          <h1>Adopt Love.<br />Change a Life.</h1>
          <p>
            Find your perfect furry companion and give a homeless pet
            the loving home they deserve.
          </p>
          <a href="#pets" className="hero-btn">Meet Our Pets →</a>
        </div>
      </section>

      <section className="pets-section" id="pets">
        <p className="section-tag">MEET YOUR NEW BEST FRIEND</p>
        <h2>Pets Looking for a Home</h2>
        <p className="section-description">
          They are waiting for someone just like you.
        </p>

        <div className="search-area">
          <input
            type="text"
            placeholder="Search pets by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Pets</option>
            <option value="Dog">Dogs</option>
            <option value="Cat">Cats</option>
          </select>
        </div>

        <div className="pet-grid">
          {filteredPets.map((pet) => (
            <div className="pet-card" key={pet.id}>
              <img src={pet.image} alt={pet.name} />
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p>{pet.type} • {pet.age}</p>
                <p>📍 {pet.location}</p>
                <button onClick={() => setSelectedPet(pet)}>
                  Adopt Me
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <p className="empty-message">No pets found. Try another search.</p>
        )}
      </section>

      <section className="about-section" id="about">
        <div>
          <p className="section-tag">OUR MISSION</p>
          <h2>Every Paw Deserves a Loving Home</h2>
          <p>
            Happy Paws connects loving families with pets who need a home.
            We believe adoption creates happier lives for both pets and people.
          </p>
        </div>
        <div className="about-emoji">🐶 🐱</div>
      </section>

      <section className="admin-section">
        <button
          className="admin-btn"
          onClick={() => setShowAdmin(!showAdmin)}
        >
          {showAdmin ? "Hide Dashboard" : "Open Admin Dashboard"}
        </button>

        {showAdmin && (
          <div className="dashboard">
            <h2>Admin Dashboard</h2>
            <div className="stats">
              <div><strong>{myPets.length}</strong><span>Total Pets</span></div>
              <div><strong>{applications.length}</strong><span>Applications</span></div>
              <div>
                <strong>
                  {applications.filter((a) => a.status === "Pending").length}
                </strong>
                <span>Pending</span>
              </div>
            </div>

            <button onClick={addPet}>+ Add New Pet</button>

            <h3>Adoption Applications</h3>
            {applications.length === 0 && <p>No applications yet.</p>}

            {applications.map((application) => (
              <div className="application" key={application.id}>
                <span>{application.pet} — {application.applicant}</span>
                <select
                  value={application.status}
                  onChange={(e) => {
                    const updated = applications.map((a) =>
                      a.id === application.id
                        ? { ...a, status: e.target.value }
                        : a
                    );
                    setApplications(updated);
                    localStorage.setItem(
                      "petApplications",
                      JSON.stringify(updated)
                    );
                  }}
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer id="contact">
        <h2>🐾 Happy Paws</h2>
        <p>Giving every pet a chance to be loved.</p>
        <p>Contact: happypaws@example.com</p>
        <p>© 2026 Happy Paws. All rights reserved.</p>
      </footer>

      {selectedPet && (
        <div className="modal-background">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => setSelectedPet(null)}
            >
              ×
            </button>

            <h2>Adopt {selectedPet.name}</h2>
            <p>Fill in your details to submit an adoption application.</p>

            <form onSubmit={handleAdoption}>
              <input placeholder="Your Full Name" required />
              <input type="email" placeholder="Your Email" required />
              <input placeholder="Your Phone Number" required />
              <textarea placeholder="Why would you like to adopt?" required />
              <button type="submit">Submit Application</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";

function App() {
  const petsData = [
    { id: 1, name: "Bruno", type: "Dog", age: "2 Years", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500", description: "Friendly and playful Golden Retriever." },
    { id: 2, name: "Luna", type: "Cat", age: "1 Year", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500", description: "Cute and loving little cat." },
    { id: 3, name: "Rocky", type: "Dog", age: "3 Years", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500", description: "Energetic and loyal companion." },
    { id: 4, name: "Milo", type: "Cat", age: "6 Months", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500", description: "Adorable kitten looking for a home." }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [pets, setPets] = useState(petsData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedPet, setSelectedPet] = useState("");
  const [adopter, setAdopter] = useState("");
  const [email, setEmail] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [newPet, setNewPet] = useState({ name: "", type: "Dog", age: "", image: "", description: "" });

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || pet.type === filter;
    return matchesSearch && matchesFilter;
  });

  function handleLogin(event) {
    event.preventDefault();
    if (loginEmail.trim() && loginPassword.trim()) {
      setIsLoggedIn(true);
    }
  }

  function adoptPet(event) {
    event.preventDefault();
    alert("Thank you " + adopter + "! Your adoption request for " + selectedPet + " has been submitted successfully.");
    setShowForm(false);
    setAdopter("");
    setEmail("");
  }

  function addPet(event) {
    event.preventDefault();
    setPets([...pets, { ...newPet, id: Date.now() }]);
    setNewPet({ name: "", type: "Dog", age: "", image: "", description: "" });
    alert("New pet added successfully!");
    setShowAdmin(false);
  }

  if (!isLoggedIn) {
    return (
      <main className="login-page">
        <section className="login-card">
          <div className="login-visual">
            <div className="visual-overlay">
              <div className="login-brand"><span>🐾</span> Happy Paws</div>
              <div className="visual-message">
                <p className="eyebrow">A LITTLE LOVE CHANGES EVERYTHING</p>
                <h1>Find your<br />forever friend.</h1>
                <p>Every paw deserves a place to call home. Your new best friend is waiting for you.</p>
                <div className="paw-note">♡ Adopt love. Share happiness.</div>
              </div>
            </div>
          </div>

          <div className="login-panel">
            <div className="mobile-brand">🐾 Happy Paws</div>
            <div className="login-content">
              <div className="welcome-icon">♡</div>
              <p className="login-kicker">{isRegister ? "START YOUR ADOPTION JOURNEY" : "WELCOME TO HAPPY PAWS"}</p>
              <h2>{isRegister ? "Create your account" : "Welcome back!"}</h2>
              <p className="login-subtitle">{isRegister ? "Join our caring community of pet lovers." : "Sign in to meet your new best friend."}</p>

              <form className="login-form" onSubmit={handleLogin}>
                {isRegister && (
                  <label>
                    Full name
                    <input type="text" placeholder="Enter your name" value={loginName} onChange={(e) => setLoginName(e.target.value)} required />
                  </label>
                )}
                <label>
                  Email address
                  <input type="email" placeholder="you@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                </label>
                <label>
                  Password
                  <div className="password-wrap">
                    <input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required minLength="4" />
                    <button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide" : "Show"}</button>
                  </div>
                </label>
                {!isRegister && <div className="forgot-row"><span>Keep your details safe</span><span className="forgot-note">Forgot password?</span></div>}
                <button className="login-submit" type="submit">{isRegister ? "Create account" : "Sign in"} <span>→</span></button>
              </form>

              <p className="switch-account">
                {isRegister ? "Already have an account?" : "New to Happy Paws?"}{" "}
                <button type="button" onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Sign in" : "Create an account"}</button>
              </p>
              <p className="login-footnote">By continuing, you agree to help make the world kinder for pets. 🐾</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <h2>🐾 Happy Paws</h2>
        <div>
          <a href="#home">Home</a>
          <a href="#pets">Available Pets</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button onClick={() => setShowAdmin(!showAdmin)}>Admin</button>
          <button className="logout-btn" onClick={() => { setIsLoggedIn(false); setIsRegister(false); }}>Log out</button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div>
          <h1>Find Your Forever Friend ❤️</h1>
          <p>Adopt a pet and give them the loving home they deserve.</p>
          <a href="#pets" className="hero-btn">Explore Pets</a>
        </div>
      </section>

      <section className="pets-section" id="pets">
        <h1>Meet Our Lovely Pets 🐶</h1>
        <p>Choose your new best friend!</p>
        <input className="search" type="text" placeholder="Search pets by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="filters">
          {["All", "Dog", "Cat"].map((type) => (
            <button key={type} className={filter === type ? "active" : ""} onClick={() => setFilter(type)}>{type}</button>
          ))}
        </div>
        <div className="pet-container">
          {filteredPets.map((pet) => (
            <div className="pet-card" key={pet.id}>
              <img src={pet.image} alt={pet.name} />
              <div className="pet-info">
                <h2>{pet.name}</h2>
                <p>Type: {pet.type}</p>
                <p>Age: {pet.age}</p>
                <p>{pet.description}</p>
                <button onClick={() => { setSelectedPet(pet.name); setShowForm(true); }}>Adopt Me</button>
              </div>
            </div>
          ))}
        </div>
        {filteredPets.length === 0 && <p>No pets found. Try another search!</p>}
      </section>

      {showForm && (
        <div className="form-section">
          <h2>Pet Adoption Application 🐾</h2>
          <p>Applying to adopt: {selectedPet}</p>
          <form onSubmit={adoptPet}>
            <input type="text" placeholder="Your Full Name" value={adopter} onChange={(e) => setAdopter(e.target.value)} required />
            <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Submit Application</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {showAdmin && (
        <section className="admin-section">
          <h2>Admin Dashboard</h2>
          <p>Add a new pet to the adoption platform.</p>
          <form onSubmit={addPet}>
            <input placeholder="Pet Name" value={newPet.name} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} required />
            <select value={newPet.type} onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}><option>Dog</option><option>Cat</option></select>
            <input placeholder="Pet Age" value={newPet.age} onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} required />
            <input placeholder="Pet Image URL" value={newPet.image} onChange={(e) => setNewPet({ ...newPet, image: e.target.value })} required />
            <input placeholder="Pet Description" value={newPet.description} onChange={(e) => setNewPet({ ...newPet, description: e.target.value })} required />
            <button type="submit">Add Pet</button>
          </form>
        </section>
      )}

      <section className="about" id="about">
        <h1>About Happy Paws ❤️</h1>
        <p>Happy Paws is a pet adoption platform that connects loving families with pets looking for a forever home. Our mission is to make every pet feel loved and safe.</p>
      </section>
      <section className="contact" id="contact">
        <h1>Contact Us</h1>
        <p>Email: happypaws@gmail.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: Vijayawada, Andhra Pradesh</p>
      </section>
      <footer><p>© 2026 Happy Paws | Adopt Don't Shop 🐾</p></footer>
    </div>
  );
}

export default App;

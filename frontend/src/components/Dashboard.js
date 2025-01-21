import React, { useState } from "react";

const Dashboard = ({ user, proiecte, setProiecte }) => {
  const [showForm, setShowForm] = useState(false);
  const [repo, setRepo] = useState("");
  const [echipa, setEchipa] = useState("");

  // Funcție pentru adăugarea unui proiect nou
  const handleAdaugaProiect = () => {
    if (repo && echipa) {
        setProiecte([...proiecte, { repo, echipa: echipa.split(",").map(e => e.trim()), owner: user, testeri: [] }]);

      setShowForm(false);
      setRepo("");
      setEchipa("");
    } else {
      alert("Completați toate câmpurile!");
    }
  };

  // Funcție pentru a adăuga utilizatorul ca tester
  const handleDevinoTester = (index) => {
    const updatedProiecte = [...proiecte];

    // Verificăm dacă utilizatorul face parte deja din echipă
    if (updatedProiecte[index].echipa.includes(user)) {
      alert("Nu poți deveni tester la un proiect din echipa ta!");
      return;
    }

    // Verificăm dacă utilizatorul este deja tester
    if (!updatedProiecte[index].testeri.includes(user)) {
      updatedProiecte[index].testeri.push(user);
      setProiecte(updatedProiecte);
      alert(`Acum ești tester pentru proiectul: ${updatedProiecte[index].repo}`);
    } else {
      alert("Ești deja tester la acest proiect!");
    }
  };

  return (
    <div>
      <h2>Bun venit, {user}!</h2>

      {/* Buton pentru a afișa formularul de adăugare proiect */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Anulează" : "Înregistrează un proiect"}
      </button>

      {/* Formular pentru adăugarea unui proiect */}
      {showForm && (
        <div className="form-container">
          <input
            type="text"
            placeholder="Repository proiect"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Echipă (nume membri, separate prin virgulă)"
            value={echipa}
            onChange={(e) => setEchipa(e.target.value)}
          />
          <button onClick={handleAdaugaProiect}>Înregistrează proiect</button>
        </div>
      )}

      {/* Listă cu proiectele existente */}
      <h3>Proiectele disponibile:</h3>
      <ul>
        {proiecte.length > 0 ? (
          proiecte.map((p, index) => (
            <li key={index}>
              <strong>Repository:</strong> {p.repo} <br />
              <strong>Echipă:</strong> {p.echipa.join(", ")} <br />
              <button onClick={() => handleDevinoTester(index)}>Devino tester</button>
            </li>
          ))
        ) : (
          <p>Momentan nu există proiecte.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;

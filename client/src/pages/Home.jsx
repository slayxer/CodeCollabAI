import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-left">
          <h1>
            Collaborate.<br />
            Build.<br />
            Innovate.
          </h1>

          <p>
            CodeCollabAI is an AI-powered collaborative platform where developers
            can manage projects, chat with teammates, upload files, and work
            together in real time.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://illustrations.popsy.co/gray/web-design.svg"
            alt="Developer"
          />
        </div>
      </section>

      <section className="features">
        <h2>Why CodeCollabAI?</h2>

        <div className="cards">

          <div className="card">
            <h3>🤖 AI Assistance</h3>
            <p>Get instant coding help while building projects.</p>
          </div>

          <div className="card">
            <h3>💬 Team Chat</h3>
            <p>Collaborate with your teammates in real time.</p>
          </div>

          <div className="card">
            <h3>📂 Project Management</h3>
            <p>Create, organize and track your development work.</p>
          </div>

          <div className="card">
            <h3>⚡ Fast Performance</h3>
            <p>Built using the MERN stack for speed and scalability.</p>
          </div>

        </div>
      </section>

      <footer className="footer">
        © 2026 CodeCollabAI | Built by Slayxer
      </footer>
    </>
  );
}

export default Home;
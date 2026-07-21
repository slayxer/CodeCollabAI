import "./AuthLayout.css";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-container">

      <div className="auth-left">

        <h1>CodeCollabAI</h1>

        <h2>{title}</h2>

        <p>{subtitle}</p>

      </div>

      <div className="auth-right">

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;
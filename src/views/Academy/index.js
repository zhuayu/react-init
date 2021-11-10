import { Link } from "react-router-dom";

function Academy() {
  return (
    <>
      <main>
        <h2>Welcome to the Academy!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default Academy;
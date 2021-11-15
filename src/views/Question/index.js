import { Link } from "react-router-dom";

function Question() {
  return (
    <>
      <main>
        <h2>Welcome to the Question!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default Question;
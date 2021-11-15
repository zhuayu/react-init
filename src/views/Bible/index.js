import { Link } from "react-router-dom";

function Bible() {
  return (
    <>
      <main>
        <h2>Welcome to the Bible!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default Bible;
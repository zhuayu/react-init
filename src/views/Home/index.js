import { Link } from "react-router-dom";
import IconLike from "@/icons/like";
import { Button } from 'antd';
function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <Button type="primary">Button</Button>
      <IconLike/>
      <nav>
        <Link to="/protocol">Protocol</Link>
      </nav>
    </>
  );
}

export default Home;
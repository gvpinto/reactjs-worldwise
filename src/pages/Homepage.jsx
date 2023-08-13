import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";

function Homepage() {
    return (
        <div>
            <PageNav />
            <Link to="/app">Go to app</Link>
            <h1>World Wise</h1>
        </div>
    );
}

export default Homepage;

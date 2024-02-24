import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const welcome = user ? `Welcome ${user}!` : "Welcome!";
    const tokenAbbr = `${token.slice(0, 9)}...`;

    const content = (
        <section className="welcome">
            <h1>{welcome}</h1>
            <p>token: {tokenAbbr}</p>
            <p>
                <Link to="/userslist"> Go to the Users Lists</Link>
            </p>
        </section>
    );
    return <div>Welcome</div>;
};

export default Welcome;

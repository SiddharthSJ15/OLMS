import { Link } from "react-router-dom";
function Footer() {
        return (
            // <footer className="py-3 my-4">
            <footer className="mt-auto">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Home</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Features</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Pricing</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">FAQs</Link></li>
                <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">About</Link></li>
                </ul>
                <p className="text-center text-muted">© 2022 Company, Inc</p>
            </footer>
        );
}

export default Footer;
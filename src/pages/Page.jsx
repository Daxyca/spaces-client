import "../styles/App.css";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Page({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

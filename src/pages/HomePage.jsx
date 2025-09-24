import Page from "./Page.jsx";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <Page>
      <main className="main">
        <HomeContent />
      </main>
    </Page>
  );
}

function HomeContent() {
  return (
    <>
      <h2 className="home-heading">Home</h2>
    </>
  );
}

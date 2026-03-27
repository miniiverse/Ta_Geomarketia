import Navbar from "../components/user/NavbarUser"
import Footer from "../components/user/FooterSection";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

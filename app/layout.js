import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'EduMilestone',
  description: 'Syllabus Tracker App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        <Navbar />
        <main style={{ flex: 1, paddingBottom: '60px' }}> {/* space for footer */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

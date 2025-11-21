// app/page.jsx

// 1. Import your component (adjust the path if your structure is different)
import DigitalCV from './components/digital-cv';

export default function Home() {
  return (
    // You can add your main layout or other elements here
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      {/* 2. Render the imported component */}
      <DigitalCV 
        // You can pass props here if your component accepts them
        // exampleProp="Some Value" 
      />

      {/* Other page content */}
    </main>
  );
}

// -----------------------------------------------------------------

// If your 'digital-cv.jsx' file uses a named export (less common for a main component):
// e.g., export function DigitalCV() { ... }
// You would import it like this:
// import { DigitalCV } from './components/digital-cv';

import SessionProviderWrapper from "./components/SessionProviderWrapper";

export const metadata = {
  title: "Job Tracker",
  description: "Track your job applications",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

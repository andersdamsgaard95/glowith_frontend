import "./styles/globals/globals.scss";
import { AppProvider } from '@/context/AppContext';
import Header from "./blocks/header/Header";
import { fetchMenuData } from "@/lib/api";
import Footer from "./blocks/footer/Footer";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const menuItems = await fetchMenuData();

  return (
    <html lang="en">
      <body>
        <AppProvider>
          <header>
            <Header menuItems={menuItems}/>
          </header>
          <main>
            {children}
          </main>
          <footer>
            <Footer/>
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}

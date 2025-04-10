import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import AntDProvider from "@/components/Shared/AntDProvider";
import { Raleway } from "next/font/google";

const ralewayFont = Raleway({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Genesis Carpenter",
  description: "Complete Portfolio Website",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${ralewayFont.className}`}>
        <AntDProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </AntDProvider>
      </body>
    </html>
  );
};

export default RootLayout;

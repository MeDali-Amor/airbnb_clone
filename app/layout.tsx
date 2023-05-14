import RenderClientComponent from "./components/RenderClientComponent";
import Modal from "./components/modals/Modal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToastProvider from "./providers/ToastProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import CreatePropertyModal from "./components/modals/CreatePropertyModal";

const nunito = Nunito({
    subsets: ["latin"],
});

export const metadata = {
    title: "Airbnb Clone",
    description: "Airbnb Clone",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en">
            <body className={nunito.className}>
                <RenderClientComponent>
                    <ToastProvider />
                    <Navbar currentUser={currentUser} />
                    <CreatePropertyModal />
                    <RegisterModal />
                    <LoginModal />
                </RenderClientComponent>
                {children}
            </body>
        </html>
    );
}

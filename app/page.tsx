import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
});

export default function Home() {
    return (
        <div>
            <h1 className="text-rose-600 text-5xl">hello</h1>
        </div>
    );
}

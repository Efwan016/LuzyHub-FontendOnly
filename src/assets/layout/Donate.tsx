import { useEffect, useState } from "react";

export default function Donate() {
    const [showDonate, setShowDonate] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowDonate(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* POPUP */}
            {showDonate && (
                <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
                    <div className="bg-[#1F1F1F] p-6 rounded-xl text-center max-w-sm w-full shadow-xl">

                        <h2 className="text-xl font-bold mb-2 text-white">
                            Support This Website ☕
                        </h2>

                        <p className="text-gray-400 text-sm mb-4">
                            I'm Like a Coffee, Gift me Coffee for update this website. 🔥
                        </p>

                        <a
                            href="https://saweria.co/widgets/qr?streamKey=c914b0805351e159460692fa208716a2"
                            target="_blank"
                            className="block bg-red-600 text-white text-xl font-semibold py-2 rounded-lg hover:bg-red-800 transition-colors"
                        >
                            Saweria
                        </a>

                        <button
                            onClick={() => setShowDonate(false)}
                            className="mt-4 text-gray-400 text-sm font-semibold hover:text-white"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* FLOAT BUTTON */}
            <button
                onClick={() => setShowDonate(true)}
                className="fixed bottom-6 right-6 z-[9999] bg-red-600 text-white px-7 py-3 text-base font-bold rounded-full shadow-2xl flex items-center gap-2 animate-bounce hover:scale-110 transition-all" >
                ☕ Coffee
            </button>
        </>
    );
}
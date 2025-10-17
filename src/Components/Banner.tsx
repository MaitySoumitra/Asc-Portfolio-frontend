export default function Banner() {
    return (
        <div className="bg-white text-black px-6 py-10 font-sans relative overflow-hidden">
            < div className="max-w-7xl mx-auto">
                {/* Header Info */}
                <div className="flex justify-between items-start text-xs uppercase tracking-widest">
                    <div>
                        <p>Tell: 9349878909</p>
                        <p>QQ: 85945</p>
                    </div>
                    <div className="text-center">
                        <p>Musong Portfolio</p>
                        <p>Ver 2019–2020</p>
                    </div>
                </div>

                {/* Left Circular Text Logo */}
                

                {/* Large Portfolio Title */}
                <div className="mt-16">
                    <h1 className="text-[160px] font-black leading-none">PORT</h1>
                    <h1 className="text-[160px] font-black leading-none">FOLIO</h1>
                </div>

                {/* Right Side Title */}
                <div className=" text-right border-[50px] border-transparent pr-10">
                    <h2 className="text-[40px] font-bold leading-none">2020</h2>
                    <h2 className="text-[40px] font-bold leading-none">UI UX DESIGN</h2>
                    <h2 className="text-[40px] font-black leading-none">WORKS</h2>
                </div>

                {/* Oval Tags */}
                <div className=" flex flex-wrap gap-2 text-[10px]">
                    {["EIKON", "UI/UX", "FONT", "WEB", "BRAND", "BANNER"].map((item, index) => (
                        <div
                            key={index}
                            className="px-4 py-1 border border-black rounded-full"
                            style={{ color: "#FFD700", borderColor: "#FFD700" }}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                {/* Bottom Right Symbol */}
                <div className="text-black text-xs flex items-center gap-2">
                    <span>✦</span>
                    
                </div>

            </div>
        </div>
    );
}

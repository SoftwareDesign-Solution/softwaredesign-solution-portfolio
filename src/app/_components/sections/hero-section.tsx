import Link from "next/link";

export default function HeroSection() {
    return (
        <section id="ueber-mich" className="pt-18 px-12 pb-24 grid grid-cols-1 md:grid-cols-[6fr_5fr] gap-18 items-center">

            <div>
                <h1 className="text-3xl md:text-7xl font-semibold leading-none text-foreground">
                    Hochqualitative <br />
                    <span className="font-semibold">Software<span>-</span>Entwicklung</span>
                </h1>
                <p className="text-lg font-normal leading-[1.55] mt-8 mb-10 max-w-135 text-muted">
                    Ich berate, entwickle und schule Sie und Ihr Team in den Bereichen{" "}
                    <span className="font-semibold text-foreground">Software-, Web- und App-Entwicklung</span> sowie
                    SAP Business One — von der ersten Konzeption bis zur praxisnahen Schulung Ihrer Mitarbeiter.
                </p>
                <div className="flex gap-3 items-center">
                    <Link
                        href="/anfrage"
                        className="bg-primary-700 hover:bg-primary-800 transition text-white py-3.5 px-6 rounded-md text-sm font-semibold cursor-pointer inline-flex items-center gap-2"
                    >
                        <span className="inline-flex items-center gap-2.5">
                            Anfragen
                            <span className="inline-flex">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"></path>
                                    <path d="M3.5 7l8.5 6 8.5-6"></path>
                                </svg>
                            </span>
                        </span>
                    </Link>
                </div>
            </div>

        </section>
    );
};
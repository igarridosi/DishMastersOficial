import React from 'react';

function FAQ({ title, text }) {
    return (
        <div className="space-y-4 px-2 mx-auto max-w-5xl pt-4">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary 
                    className="flex cursor-pointer items-center justify-between gap-2 rounded-lg bg-[#FFBD59] p-4 text-black hover:bg-[#f9a74b] focus:outline-none focus:ring-2 focus:ring-[#FFBD59] transition-all duration-300 ease-in-out"
                    aria-expanded="false" 
                    aria-controls="faq-content"
                >
                    <h2 className="font-LibreFranklin text-lg text-black">{title}</h2>
                    <svg
                        className="w-5 h-5 shrink-0 transition-transform duration-300 group-open:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>

                <div id="faq-content" className="mt-2 px-8 pt-4 pb-4 leading-relaxed bg-gray-100 text-gray-700 rounded-lg transition-all duration-300 ease-in-out">
                    {text}
                </div>
            </details>
        </div>
    );
}

export default FAQ;
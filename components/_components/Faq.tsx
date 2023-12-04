"use client";

import { faq } from "@/constant";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FaqComponnets = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4 px-4 py-2 shadow-md max-w-[700px] mx-auto border border-gray-300/30 rounded-sm">
      <div
        className="flex items-center justify-between gap-2 pt-2 sm:pt-4 sm:px-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base sm:text-lg md:text-xl font-medium">
          {question}
        </h3>
        <ChevronDown
          className={cn(
            "w-10 h-10 relative transition-transform duration-300 ease-in-out",
            isOpen ? "rotate-0" : "-rotate-90"
          )}
        />
      </div>
      <div
        className={cn(
          "w-full overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-[300px]" : "max-h-0"
        )}
      >
        <p className="pb-2 sm:px-2 text-base sm:text-lg md:text-xl text-gray-700">
          {answer}
        </p>
      </div>
    </div>
  );
};

const jsonLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Whom to contact?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can contact the apprenticeship office through our official phone hotline above, or with the web-form below. We generally respond to written requests within 7-10 days.",
      },
    },
  ],
};

const Faq = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      ></script>
      <div className="w-full flex items-center justify-center gap-2 py-4">
        <div className="w-full h-[4px] bg-sky-300" />
        <h2 className="text-lg md:text-xl lg:text-2xl whitespace-nowrap">
          Frequently Asked <strong>Question</strong>
        </h2>
        <div className="w-full h-[4px] bg-sky-300" />
      </div>
      {faq.answer.map((a, index) => (
        <FaqComponnets answer={a} question={faq.questions[index]} key={index} />
      ))}
    </div>
  );
};

export default Faq;

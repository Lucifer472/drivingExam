import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = ({ faq }: { faq: any }) => {
  const faqs: any = [];
  let data: any = {};
  faq.map((f: any, index: number) => {
    if (f.type === "header") {
      data.question = f.data.text;
    } else {
      data.answer = f.data.text;
    }

    if (index % 2 !== 0) {
      faqs.push(data);
      data = {};
    }
  });

  const jsonLD = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f: any) => {
      return {
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      };
    }),
  };

  return (
    <section className="py-2 w-full h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      ></script>
      <div className="global-container bg-white rounded-md px-4 py-2 flex flex-col w-full">
        <div className="w-full py-2 flex items-start justify-start border-b-2 border-gray-500">
          <h1 className="text-xl font-medium text-black">
            Faq Section for Blogs
          </h1>
        </div>
        <div className="max-w-[750px] mx-auto w-full">
          {faqs.map((f: any, index: number) => (
            <Accordion type="single" collapsible key={f.id}>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger className="text-lg sm:text-xl">
                  <span dangerouslySetInnerHTML={{ __html: f.question }}></span>
                </AccordionTrigger>
                <AccordionContent className="text-base sm:text-lg">
                  <span dangerouslySetInnerHTML={{ __html: f.answer }}></span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

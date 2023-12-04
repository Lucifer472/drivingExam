import ContactForm from "@/components/login/ContactForm";
import { url } from "@/constant";
const jsonLD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Homepage",
      item: url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: `Contact Us`,
      item: `${url}/contact-us`,
    },
  ],
};
const page = () => {
  return (
    <section className="h-full w-full bg-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      ></script>
      <div className="w-full global-container bg-white py-2">
        <div className="w-ful flex items-start justify-start border-b border-gray-300 py-2">
          <h1 className="text-2xl font-medium">Contact Us:</h1>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default page;

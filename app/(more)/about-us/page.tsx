import { url } from "@/constant";
import Link from "next/link";
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
      name: `About Us`,
      item: `${url}/about-us`,
    },
  ],
};

const page = () => {
  return (
    <section className="w-full h-full bg-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      ></script>
      <div className="max-w-4xl mx-auto bg-white w-full flex flex-col py-2 px-4">
        <div className="w-full border-b-2 border-gray-300">
          <h1 className="text-2xl font-semibold">About Us</h1>
        </div>
        <div className="py-2 flex flex-col gap-4">
          <p className="py-2 text-lg font-medium">
            Welcome to our Scholarship Update!
          </p>
          <p className="leading-[2em] text-lg">
            This is the about us page of exmple.com.
          </p>
          <p className="leading-[2em] text-lg">
            We are a team of education enthusiasts dedicated to helping students
            from Africa and Nigeria, as well as international students, find and
            apply for scholarships to fund their studies.
          </p>
          <p className="leading-[2em] text-lg">
            We understand that paying for higher education can be a challenge,
            and our goal is to make the process of finding and applying for
            scholarships as easy and stress-free as possible.
          </p>
          <p className="leading-[2em] text-lg">
            Our website features a wide range of scholarship opportunities for
            African and Nigerian students, as well as international students
            looking to study abroad.
          </p>
          <p className="leading-[2em] text-lg">
            We have carefully curated a list of scholarships based on their
            relevance, eligibility requirements, and potential impact on the
            recipient&apos;s studies.
          </p>
          <p className="leading-[2em] text-lg">
            In addition to our scholarship database, we also offer a wealth of
            resources and information to help students navigate the process of
            finding and applying for scholarships.
          </p>
          <p className="leading-[2em] text-lg">
            Our blog features articles on topics such as how to write a winning
            scholarship essay, how to choose the right scholarship for you, and
            how to make the most of your study abroad experience.
          </p>
          <p className="leading-[2em] text-lg">
            We hope that our website will serve as a valuable resource for
            students looking to fund their studies and achieve their education
            goals.
          </p>
          <p className="leading-[2em] text-lg">
            If you have any questions or need assistance, don&apos;t hesitate to
            reach out to us. We are always here to help.
          </p>
          <p className="leading-[2em] text-lg">
            Thank you for choosing us as your go-to source for scholarship
            information and guidance.
          </p>
          <p className="leading-[2em] text-lg">
            We look forward to supporting you on your education journey.
          </p>
          <p className="leading-[2em] text-lg">
            You can contact us by visiting this page
            <Link
              href={"/contact-us"}
              className="px-4 py-2 bg-sky-500 text-white rounded-md m-2 hover:bg-sky-600"
            >
              Clicking Here!
            </Link>
          </p>
          <span className="text-lg font-medium">
            Scholarship Update Publishing Team
          </span>
        </div>
      </div>
    </section>
  );
};

export default page;

import AuthorCard from "@/components/author/AuthorCard";
import { db } from "@/lib/db";

export const revalidate = 3600;

const getAuthor = async () => {
  const data = db.user.findMany({});
  return data;
};

const page = async () => {
  const data = await getAuthor();
  return (
    <section className="bg-white global-container w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 padding">
        {data.map((a) => (
          <AuthorCard
            name={a.name}
            username={a.username}
            img={a.img}
            key={a.id}
          />
        ))}
      </div>
    </section>
  );
};

export default page;

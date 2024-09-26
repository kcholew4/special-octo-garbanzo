import { useCatFacts } from "../hooks/useCatFacts";
import CatFactCard from "./CatFactCard";

const ERROR_MESSAGE = "Cannot display cat facts due to an error.";

export default function CatFactsContainer() {
  const [catFacts, error] = useCatFacts();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-8 max-w-screen-lg bg-slate-100 rounded-2xl mx-auto mt-10 border border-slate-500 p-8">
      {error ? (
        <div className="text-red-600">{ERROR_MESSAGE}</div>
      ) : (
        catFacts.map(({ user, fact }, index) => <CatFactCard key={index} user={user} fact={fact} />)
      )}
    </div>
  );
}

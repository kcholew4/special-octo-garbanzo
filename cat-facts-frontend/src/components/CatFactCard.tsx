import { CatFact } from "../types";

export default function CatFactCard({ user, fact }: CatFact) {
  return (
    <div className="border rounded-2xl border-slate-500 p-4">
      <div>
        by <span className="font-bold">{user}</span>
      </div>
      <p className="mt-2">{fact}</p>
    </div>
  );
}

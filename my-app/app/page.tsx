import Image from "next/image";
import ViewData from "./components/data/page";
import Search from "./components/fetch/page"
import Test from "./Test"

// my-app\app\components\data\ViewData.tsx

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Search />
        <ViewData />

        <div className="flex gap-4 items-center flex-col sm:flex-row">

        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}

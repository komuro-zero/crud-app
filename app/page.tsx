import { Mali } from "next/font/google";
import Head from "next/head";
import { BiSolidUserPlus } from "react-icons/bi"
import Table from "@/components/table"

export default function Home() {
  return (
    <section>
      <Head>
        <title>CRUD Application</title>
        <meta>Personal Learning</meta>
      </Head>
      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-bold py-10">People</h1>
        <div className="container mx-auto flex justify-between py-5 border-b">
          <div className="left flex gap-3">
            <button className="flex bg-inidgo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800">
              Add People <span><BiSolidUserPlus size={23}></BiSolidUserPlus></span>
            </button>
          </div>
          {/* collapable form */}

          </div>
          {/* table */}
          <div className="container mx-auto">
            <Table></Table>
          </div>
      </main>
    </section>
  );
}

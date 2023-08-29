"use client";
import { useState } from "react";

export default function Home() {
  const [color, setColor] = useState('white');
  return (
    <>
      <div className="w-full h-screen" style={{ backgroundColor: color }}>
       <div className="flex justify-center text-black font-black	">
        <h1 class='text-2xl'>Hello from Background changer</h1>
       </div>
        <div className="fixed flex flex-wrap justify-center top-20 inset-x-4 px-5">
          <div className="flex flex-wrap justify-center gap-3 shadow-md bg-slate-300 text-white px-5 py-2.5 rounded-3xl">
            <button className="bg-rose-800 outline-none px-3 rounded-full" onClick={ () => setColor('rgb(190 18 60)') }>
              Red
            </button>
            <button className="bg-emerald-600 outline-none px-3 rounded-full" onClick={ () => setColor('rgb(5 150 105)') }>
              Green
            </button>
            <button className="bg-cyan-500	 outline-none px-3 rounded-full" onClick={ () => setColor('rgb(6 182 212)') }>
              Blue
            </button>
            <button className="bg-purple-500 outline-none px-3 rounded-full" onClick={ () => setColor('rgb(168 85 247)') }>
              Violet
            </button>
            <button className="bg-rose-300 outline-none px-3 rounded-full" onClick={ () => setColor(`pink`) }>
              Pink
            </button>
            <button className="bg-yellow-500 outline-none px-3 rounded-full" onClick={() => setColor('rgb(234 179 8)') }>
              Yellow
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

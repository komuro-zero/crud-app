"use client"
import { useRef } from "react";
import { MdOutlineTimer } from "react-icons/md";
import confetti from "canvas-confetti";

export default function Home() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: "🕑", scalar });
  
    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [unicorn],
      scalar,
    };
  
    const shoot = () => {
      if (!buttonRef.current) return;
  
      // Get the position of the button
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (rect.left + rect.right) / 2 / window.innerWidth;
      const y = (rect.top + rect.bottom) / 2 / window.innerHeight;
  
      // Launch confetti from the button's position
      confetti({
        ...defaults,
        particleCount: 20, // Reduced particle count
        origin: { x, y }, // Set the origin to the button's position
      });
  
      confetti({
        ...defaults,
        particleCount: 1,
        origin: { x, y },
      });
  
      confetti({
        ...defaults,
        particleCount: 1,
        scalar: scalar / 2,
        shapes: ["circle"],
        origin: { x, y },
      });

    // Shooting confetti in intervals
    // setTimeout(shoot, 0);
    // setTimeout(shoot, 100);
    // setTimeout(shoot, 200);
    };

  return (
    <main className="py-5">
        <div className="w-full max-w-xs flex justify-center flex-col m-auto h-screen">
            <h1 className="text-xl md:text-5xl text-center font-bold py-10">打刻する</h1>
            <div className="container mx-auto flex justify-center py-5 border-b">
                <button ref={buttonRef} onClick={shoot} className="flex bg-inidgo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800">
                打刻する <span><MdOutlineTimer size={23}></MdOutlineTimer></span>
                </button>
            </div>
        </div>
    </main>
  );
}

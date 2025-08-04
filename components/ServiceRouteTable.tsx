import React from "react";

export default function ServiceRouteTable() {
  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      <div className="bg-gradient-to-br from-yellow-100 via-white to-yellow-200 rounded-2xl shadow-2xl ring-2 ring-yellow-300/50 p-6">
        <h3 className="text-2xl font-bold text-yellow-800 mb-4 text-center">Popular Routes & Prices</h3>
        <table className="w-full text-lg rounded-lg overflow-hidden shadow-md border border-yellow-300 bg-white">
          <thead>
            <tr className="bg-yellow-200 text-yellow-900">
              <th className="px-6 py-3 text-left font-bold">Route</th>
              <th className="px-6 py-3 text-left font-bold">Van Price (LKR)</th>
              <th className="px-6 py-3 text-left font-bold">Car Price (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Trinco to Sigiriya", "22,000/-", "14,000/-"],
              ["Trinco to Kandy", "30,000/-", "24,000/-"],
              ["Trinco to Colombo", "46,000/-", "30,000/-"],
              ["Trinco to Jaffna", "35,000/-", "26,000/-"],
              ["Trinco to Yala", "50,000/-", "35,000/-"],
              ["Trinco to Arugambay", "45,000/-", "28,000/-"],
              ["Airport Pickup and Dropping", "36,000/-", "27,000/-"],
              ["City Tour", "18,000/-", "17,000/-"],
            ].map(([route, van, car], i) => (
              <tr
                key={route}
                className={
                  i % 2 === 0
                    ? "bg-yellow-50"
                    : "bg-white"
                }
              >
                <td className="px-6 py-4 border-b border-yellow-100">{route}</td>
                <td className="px-6 py-4 border-b border-yellow-100 font-semibold text-yellow-700">{van}</td>
                <td className="px-6 py-4 border-b border-yellow-100 font-semibold text-yellow-700">{car}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-center text-sm text-yellow-700 italic">For customized journeys, contact us for a quote!</p>
        {/* ![image1](image1) */}
      </div>
    </div>
  );
}
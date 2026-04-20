export default function Button({ children }) {
  return (
    <button className="bg-[#00aaff] text-white px-5 py-2 rounded-lg hover:opacity-90 transition">
      {children}
    </button>
  );
}
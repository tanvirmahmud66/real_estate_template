export default function SectionTitle({ title, subtitle, centered = true }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`w-20 h-1 bg-blue-600 rounded-full mt-4 ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
}
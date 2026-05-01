interface InfoCardProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

export default function InfoCard({ label, value, className = '' }: InfoCardProps) {
  const isMultiLine = typeof value === 'object' && value !== null;
  
  return (
    <div className={`rounded-xl bg-[#ffebee] text-red-900 px-6 py-2 shadow-sm flex-1 flex flex-col justify-center hover:bg-[#ffcdd2] transition-colors cursor-pointer ${className}`}>
      <div className="text-base font-medium mb-0.5">{label}</div>
      <div className="text-red-800 font-semibold text-sm leading-tight">
        {isMultiLine ? value : <span className="text-lg font-bold">{value as string}</span>}
      </div>
    </div>
  );
}
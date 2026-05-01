interface InfoCardProps {
  label: string;
  value: string | React.ReactNode;
  className?: string;
}

export default function InfoCard({ label, value, className = '' }: InfoCardProps) {
  return (
    <div className={`rounded-xl bg-[#ffebee] text-red-900 px-6 py-2 shadow-sm flex-1 flex flex-col justify-center hover:bg-[#ffcdd2] transition-colors cursor-pointer ${className}`}>
      <h6 className="text-sm font-medium mb-0.5 m-0">{label}</h6>
      <div className="text-red-800 font-semibold text-xs leading-tight m-0">
        {typeof value === 'string' || typeof value === 'number' ? (
          <p className="m-0">{value}</p>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
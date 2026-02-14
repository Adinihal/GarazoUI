// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CardHeader({vehicleDetails,location}:any) {
    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1 md:gap-3">
           
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <span className="flex items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-500"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 12c2.28 0 4.5.86 6.36 2.42a9.96 9.96 0 01-12.72 0A9.95 9.95 0 0112 12z"
                            />
                            <circle cx="12" cy="8" r="4" />
                        </svg>
                        <span>{vehicleDetails.regNo}</span>
                    </span>
                    <span className="text-red-600 font-medium">({location})</span>
                </div>
                <div className="text-sm font-semibold text-gray-600 md:text-gray-600">
                    {vehicleDetails.model}
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-gray-800 font-semibold tracking-wide">
                    {vehicleDetails.kms}
                </span>
                <span className="bg-gray-100 text-gray-700 px-2 py-[2px] text-xs rounded-sm font-semibold">
                    NA | {vehicleDetails.type}
                </span>
                <span className="bg-[#16cba7] text-white text-xs px-2 py-[2px] rounded-sm font-semibold">
                    NA
                </span>
            </div>
        </div>
    )
}
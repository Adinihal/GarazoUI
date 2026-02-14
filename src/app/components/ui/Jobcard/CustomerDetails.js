import { FaPhoneAlt } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function CustomerDetails({ title, name }) {

    const stars = Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        if (name >= starValue) return <FaStar key={index} className="text-yellow-500 text-sm" />;
        if (name >= starValue - 0.5) return <FaStarHalfAlt key={index} className="text-yellow-500 text-sm" />;
        return <FaRegStar key={index} className="text-gray-400 text-sm" />;
    });

    return (
        <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-gray-400 text-lg flex-shrink-0" />
            <div>
                <p className="text-[11px] text-gray-500">{title}</p>

                {title === "Customer Rating" ? (
                    <div className="flex gap-[2px]">
                        {stars}
                    </div>
                ) : (
                    <p className="text-[13px] font-semibold text-gray-800">{name}</p>
                )}
            </div>
        </div>
    );
}

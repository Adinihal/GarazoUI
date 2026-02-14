
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Repair({serviceDetails }:any) {
    return (
        <div className="grid grid-cols-3 gap-3 text-center md:flex md:flex-1 md:justify-around md:gap-0">
            <div className="md:min-w-[80px] lg:min-w-[90px]">
                <span className="text-[14px] font-semibold text-[#16CBA7] block">{serviceDetails.invoiceNo}</span>
                <div className="text-[12px] text-[#7D7C7C]">Inv No (Cust)</div>
            </div>
            <div className="md:min-w-[80px] lg:min-w-[90px]">
                <span className="text-[14px] font-semibold text-[#16CBA7] block">0.00</span>
                <div className="text-[12px] text-[#7D7C7C]">Discount</div>
            </div>
            <div className="md:min-w-[80px] lg:min-w-[90px]">
                <span className="text-[14px] font-semibold text-[#16CBA7] block">0</span>
                <div className="text-[12px] text-[#7D7C7C]">Coupon</div>
            </div>
            <div className="md:min-w-[80px] lg:min-w-[90px]">
                <span className="text-[14px] font-semibold text-[#16CBA7] block">{serviceDetails.paid}</span>
                <div className="text-[12px] text-[#7D7C7C]">Paid (Cust)</div>
            </div>
            <div className="md:min-w-[80px] lg:min-w-[90px]">
                <span className="text-[14px] font-semibold text-[#16CBA7] block">{serviceDetails.due}</span>
                <div className="text-[12px] text-[#7D7C7C]">Due (Cust)</div>
            </div>
        </div>
    )
}

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../reduxStore/appSlice';
import {
    FaFileInvoice,
    FaSyncAlt,
    FaPercent,
    FaFileAlt,
    FaTrashAlt,
} from "react-icons/fa";
import CardHeader from './CardHeader';
import CustomerDetails from "./CustomerDetails";
import Repair from "./Repair"
import { vehicleService } from '../../../services/vehicleService';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function JobCard({service}:any) {
 // eslint-disable-next-line no-console
 console.log("JobCard Service Data:", service);
 const {customer,serviceDetails}=service;
 const router = useRouter();
 const dispatch = useDispatch();

 const handleJCEstClick = () => {
   router.push(`/jobcard-estimation?jcNo=${serviceDetails.jcNo}`);
 };

 const handleDelete = async () => {
   if (confirm('Are you sure you want to delete this job card?')) {
     try {
       await vehicleService.deleteJobCard(serviceDetails.jcNo);
       dispatch(showToast({ message: 'Job card deleted successfully', type: 'success' }));
       // Optionally refresh the page or update the state
       window.location.reload();
     } catch (error) {
       console.error('Error deleting job card:', error);
       dispatch(showToast({ message: 'Failed to delete job card', type: 'error' }));
     }
   }
 };

    return (
        <div className="w-full flex flex-col my-[40px]" key={service.id}>
            <div className="relative w-full bg-white shadow-md rounded-2xl p-4 md:p-6 flex flex-col gap-4">
                <div className="absolute -top-[7%] md:-top-[5%] left-1/2 -translate-x-1/2 w-[95%] bg-white rounded-xl shadow-md p-3">
                    <CardHeader vehicleDetails={service.vehicle} location={service.location}
                    />
                </div>
                <div className="pt-10">
                    <div className="flex flex-wrap justify-between items-start w-full text-sm text-gray-700">
                        <div className="w-full md:w-1/2 pt-5">
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                                <CustomerDetails title={"Customer Name"} name={customer.name} />
                                <CustomerDetails title={"Phone Number"} name={customer.phone} />
                                <CustomerDetails title={"Customer Source"} name={customer.source} />
                                <CustomerDetails title={"Customer Rating"} name={customer.rating} />
                                <CustomerDetails title={"Supervisor Name"} name={serviceDetails.supervisor} />

                            </div>
                        </div>
                        <div className="flex items-center gap-5 mt-6 sm:mt-0 flex-wrap justify-evenly sm:justify-end">
                            {[
                                { icon: <FaFileAlt className="text-[#16cba7]" />, label: "JC/Est", onClick: handleJCEstClick },
                                { icon: <FaFileAlt className="text-red-400" />, label: "Status", onClick: () => {} },
                                { icon: <FaSyncAlt className="text-gray-500" />, label: "History", onClick: () => {} },
                                { icon: <FaFileAlt className="text-gray-500" />, label: "Payments", onClick: () => {} },
                                { icon: <FaPercent className="text-gray-500" />, label: "Discount", onClick: () => {} },
                                { icon: <FaFileInvoice className="text-red-400" />, label: "Invoice", onClick: () => {} },
                                { icon: <FaTrashAlt className="text-red-500" />, label: "Delete", onClick: handleDelete },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    onClick={item.onClick}
                                    className="flex flex-col items-center cursor-pointer hover:text-red-400 transition-colors"
                                >
                                    <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:border-red-400 transition-colors">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs font-semibold mt-1">{item.label}</span>
                                </div>
                            ))}

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-[#16cba7] text-white rounded-full flex items-center justify-center cursor-pointer">
                                    <FaFileAlt />
                                </div>
                                <span className="text-xs font-semibold mt-1">View More</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#16cba7] to-[#09a8c3]"></div>
                                    <div className="absolute inset-[2px] bg-white rounded-full flex items-center justify-center">
                                        <span className="text-xs font-bold text-[#16cba7]">15%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white border border-[#E6E6E6] rounded-[15px] shadow-[0_1px_7px_1px_rgba(0,0,0,0.1)] w-full p-3 md:p-[6px] md:flex md:flex-nowrap md:items-center md:justify-between">

                
                <div className="flex justify-between items-center mb-3 md:mb-0 md:flex md:items-center md:border-r md:border-[#dfdfdf] md:pr-4 md:min-w-[180px] lg:min-w-[200px]">
                    <div className="bg-[#16CBA7] text-white text-center px-4 py-2 rounded-[12px] min-w-[120px] md:min-w-[100px] md:py-2 md:mr-2">
                        <span className="text-[13px] block font-medium md:text-[13px]">JC.No:</span>
                        <div className="text-[15px] font-semibold leading-tight md:text-[16px] md:font-bold">{serviceDetails.jcNo}</div>
                    </div>

                    <div className="text-center px-3 md:px-0 md:min-w-[80px]">
                        <span className="text-[14px] font-semibold text-[#16CBA7] block md:text-[#16CBA7]">{serviceDetails.estimate}</span>
                        <div className="text-[12px] text-[#7D7C7C]">Estimate</div>
                    </div>
                </div>
                <div className="mb-4 md:mb-0 md:flex md:items-center md:border-r md:border-[#dfdfdf] md:px-4 md:flex-1">
                    
                    <div className="bg-black text-white rounded-md mb-3 md:mb-0 md:rounded-[5px] md:w-5 md:h-[42px] md:flex md:items-center md:justify-center md:mr-3">
                        <span className="text-[12px] font-semibold uppercase tracking-wide text-center py-2 block md:text-[10px] md:rotate-[-90deg] md:relative md:top-[1px]">
                            Repair
                        </span>
                    </div>
                    <Repair serviceDetails={serviceDetails}/>
                    {/* <div className="grid grid-cols-3 gap-3 text-center md:flex md:flex-1 md:justify-around md:gap-0">
                        <div className="md:min-w-[80px] lg:min-w-[90px]">
                            <span className="text-[14px] font-semibold text-[#16CBA7] block">NA</span>
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
                            <span className="text-[14px] font-semibold text-[#16CBA7] block">2000.00</span>
                            <div className="text-[12px] text-[#7D7C7C]">Paid (Cust)</div>
                        </div>
                        <div className="md:min-w-[80px] lg:min-w-[90px]">
                            <span className="text-[14px] font-semibold text-[#16CBA7] block">11351.00</span>
                            <div className="text-[12px] text-[#7D7C7C]">Due (Cust)</div>
                        </div>
                    </div> */}
                </div>
                <div className="mb-4 md:mb-0 md:flex md:items-center md:border-r md:border-[#dfdfdf] md:px-4 md:flex-1">
                    
                    <div className="bg-black text-white rounded-md mb-3 md:mb-0 md:rounded-[5px] md:w-5 md:h-[42px] md:flex md:items-center md:justify-center md:mr-3">
                        <span className="text-[12px] font-semibold uppercase tracking-wide text-center py-2 block md:text-[10px] md:rotate-[-90deg] md:relative md:top-[1px]">
                            Claims
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-center md:flex md:justify-start md:gap-5 md:flex-1">
                        <div className="md:min-w-[80px] lg:min-w-[90px]">
                            <span className="text-[14px] font-semibold text-[#16CBA7] block">NA</span>
                            <div className="text-[12px] text-[#7D7C7C]">Inv No (Ins)</div>
                        </div>
                        <div className="md:min-w-[80px] lg:min-w-[90px]">
                            <span className="text-[14px] font-semibold text-[#16CBA7] block">0.00</span>
                            <div className="text-[12px] text-[#7D7C7C]">Paid (Ins)</div>
                        </div>
                        <div className="md:min-w-[80px] lg:min-w-[90px]">
                            <span className="text-[14px] font-semibold text-[#16CBA7] block">0.00</span>
                            <div className="text-[12px] text-[#7D7C7C]">Due (Ins)</div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-6 text-[13px] text-gray-600 md:flex-col md:justify-center md:items-end md:gap-1 md:min-w-[120px] md:pl-4">
                    <span className="md:text-right">
                        <strong className="text-gray-500 font-medium">DOA:</strong>
                        <span className="text-[#16CBA7] font-semibold ml-1">{serviceDetails.doa}</span>
                    </span>
                    <span className="md:text-right">
                        <strong className="text-gray-500 font-medium">DOD:</strong>
                        <span className="text-gray-400 ml-1">{serviceDetails.dod}</span>
                    </span>
                </div>
            </div>
        </div>
    );
}



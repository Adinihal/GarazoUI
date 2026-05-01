'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MenuBar from '../components/common/MenuBar';
import InfoCard from '../components/common/InfoCard';

export default function JobcardEstimation() {
    const searchParams = useSearchParams();
    const jcNo = searchParams.get('jcNo');
    const [loading, setLoading] = useState(true);
    const [estimationData, setEstimationData] = useState<any>(null);
    
    // We get the instantly passed data (if clicking from Dashboard)
    const currentJobCard = useSelector((state: any) => state.app.currentJobCard);
    // And we also listen to the globally fetched dashboard data (for page refresh)
    const globalDashboardData = useSelector((state: any) => state.dashboard.dashboardData);

    useEffect(() => {
        if (currentJobCard && currentJobCard.serviceDetails?.jcNo === jcNo) {
            setEstimationData(currentJobCard);
            setLoading(false);
        } else if (globalDashboardData?.services) {
            // Find the job card from the globally fetched data
            const serviceData = globalDashboardData.services.find((s: any) => s.serviceDetails.jcNo === jcNo);
            if (serviceData) {
                setEstimationData(serviceData);
            }
            setLoading(false);
        }
    }, [jcNo, currentJobCard, globalDashboardData]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-[#16CBA7]">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <MenuBar />
            <div className="container mx-auto p-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    {/* Info Cards Row */}
                    <div className="flex flex-wrap gap-3 mb-8">

                        <InfoCard label="Job Id" value={estimationData?.serviceDetails?.jcNo || 'N/A'} className="min-w-[150px]" />
                        <InfoCard label="Customer Name" value={estimationData?.customer?.name || 'N/A'} className="min-w-[180px]" />
                        <InfoCard 
                            label="Vehicle Details" 
                            value={
                                <>
                                    <p className="m-0">Reg No.: {estimationData?.vehicle?.regNo || 'N/A'}</p>
                                    <p className="m-0">Chassis Number/ VIN : N/A</p>
                                </>
                            } 
                            className="min-w-[210px]" 
                        />
                        <InfoCard label="Vehicle Name" value={estimationData?.vehicle?.model || 'N/A'} className="min-w-[180px]" />
                        <InfoCard 
                            label="Other Details" 
                            value={
                                <>
                                    <p className="m-0">Mfg Year: N/A</p>
                                    <p className="m-0">Fuel type: N/A</p>
                                </>
                            } 
                            className="min-w-[180px]" 
                        />
                        <InfoCard 
                            label="Contact Details" 
                            value={
                                <>
                                    <p className="m-0">Ph: {estimationData?.customer?.phone || 'N/A'}</p>
                                    <p className="m-0">Email: {estimationData?.customer?.email || 'N/A'}</p>
                                </>
                            } 
                            className="min-w-[180px]" 
                        />
                    </div>




                </div>
            </div>
        </div>
    );
}
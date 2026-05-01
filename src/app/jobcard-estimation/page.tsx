'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuBar from '../components/common/MenuBar';
import InfoCard from '../components/common/InfoCard';

export default function JobcardEstimation() {
    const searchParams = useSearchParams();
    const jcNo = searchParams.get('jcNo');
    const [loading, setLoading] = useState(true);
    const [estimationData, setEstimationData] = useState<any>(null);

    useEffect(() => {
        // Simulate fetching estimation data based on jcNo
        // In production, this would be an API call
        if (jcNo) {
            setTimeout(() => {
                setEstimationData({
                    jcNo: jcNo,
                    customerName: 'John Doe',
                    vehicle: 'Toyota Innova',
                    regNo: 'ABC-1234',
                    estimate: 15000,
                    parts: [
                        { name: 'Oil Filter', price: 250 },
                        { name: 'Air Filter', price: 350 },
                        { name: 'Brake Pads', price: 1200 },
                    ],
                    labor: 2000,
                    total: 18000,
                });
                setLoading(false);
            }, 500);
        }
    }, [jcNo]);

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
                        <InfoCard label="Customer Name" value={estimationData?.customerName || 'N/A'} className="min-w-[180px]" />
                        <InfoCard 
                            label="Vehicle Details" 
                            value={
                                <>
                                    <div>Reg No.: {estimationData?.regNo || 'N/A'}</div>
                                    <div>Chassis Number/ VIN : N/A</div>
                                </>
                            } 
                            className="min-w-[210px]" 
                        />
                        <InfoCard label="Vehicle Name" value={estimationData?.vehicle || 'N/A'} className="min-w-[180px]" />
                        <InfoCard 
                            label="Other Details" 
                            value={
                                <>
                                    <div>Mfg Year: N/A</div>
                                    <div>Fuel type: N/A</div>
                                </>
                            } 
                            className="min-w-[180px]" 
                        />
                        <InfoCard 
                            label="Contact Details" 
                            value={
                                <>
                                    <div>Ph: 9876543210</div>
                                    <div>Email: N/A</div>
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
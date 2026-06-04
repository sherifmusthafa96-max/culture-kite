interface Props {
    totalRecords: number;
    pendingCount: number;
    paidCount: number;
    pendingAmount: number;
}

export default function DashboardCards({
    totalRecords,
    pendingCount,
    paidCount,
    pendingAmount,
}: Props) {
    return (
        <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded">
                <h3>Total</h3>
                <p className="text-2xl">{totalRecords}</p>
            </div>

            <div className="bg-orange-100 p-4 rounded">
                <h3>Pending</h3>
                <p className="text-2xl">{pendingCount}</p>
            </div>

            <div className="bg-green-100 p-4 rounded">
                <h3>Paid</h3>
                <p className="text-2xl">{paidCount}</p>
            </div>

            <div className="bg-red-100 p-4 rounded">
                <h3>Pending Amount</h3>
                <p className="text-2xl">
                    ₹{pendingAmount.toFixed(2)}
                </p>
            </div>
        </div>
    );
}
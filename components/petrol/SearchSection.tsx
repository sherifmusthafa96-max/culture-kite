interface Props {
    searchRider: string;
    setSearchRider: (value: string) => void;
    searchRiderData: () => void;
    downloadPendingReport: () => void;
    exportPaidReport: () => void;
    showPendingOnly: boolean;
    setShowPendingOnly: (value: boolean) => void;
    paymentRef: string;
    setPaymentRef: (value: string) => void;
    paidBy: string;
    setPaidBy: (value: string) => void;
    markSelectedAsPaid: () => void;
}

export default function SearchSection({
    searchRider,
    setSearchRider,
    searchRiderData,
    downloadPendingReport,
    exportPaidReport,
    showPendingOnly,
    setShowPendingOnly,
    paymentRef,
    setPaymentRef,
    paidBy,
    setPaidBy,
    markSelectedAsPaid,
}: Props) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">
                Search Rider
            </h2>

            <input
                value={searchRider}
                onChange={(e) =>
                    setSearchRider(e.target.value)
                }
                placeholder="Rider ID or Rider Name"
                className="border p-3 rounded w-full max-w-md"
            />

            <div className="flex flex-wrap gap-2 mt-3">
                <button
                    onClick={searchRiderData}
                    className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                    Search
                </button>

                <button
                    onClick={downloadPendingReport}
                    className="bg-red-600 text-white px-5 py-2 rounded"
                >
                    Download Pending
                </button>

                <button
                    onClick={exportPaidReport}
                    className="bg-green-600 text-white px-5 py-2 rounded"
                >
                    Export Paid
                </button>

                <button
                    onClick={() =>
                        setShowPendingOnly(!showPendingOnly)
                    }
                    className="bg-orange-500 text-white px-5 py-2 rounded"
                >
                    {showPendingOnly
                        ? "Show All"
                        : "Pending Only"}
                </button>
            </div>

            <input
                value={paymentRef}
                onChange={(e) =>
                    setPaymentRef(e.target.value)
                }
                placeholder="Payment Ref No"
                className="border p-2 rounded w-full mt-3"
            />

            <input
                value={paidBy}
                onChange={(e) =>
                    setPaidBy(e.target.value)
                }
                placeholder="Paid By"
                className="border p-2 rounded w-full mt-3"
            />

            <button
                onClick={markSelectedAsPaid}
                className="bg-green-700 text-white px-5 py-2 rounded mt-3"
            >
                Mark Selected Paid
            </button>
        </div>
    );
}
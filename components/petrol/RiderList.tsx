interface Props {
    riderData: any[];
    selectedRows: number[];
    toggleSelectRow: (id: number) => void;
    markAsPaid: (id: number) => void;
    showPendingOnly: boolean;
}

export default function RiderList({
    riderData,
    selectedRows,
    toggleSelectRow,
    markAsPaid,
    showPendingOnly,
}: Props) {
    return (
        <div className="mt-10">
            {riderData
                .filter((row) =>
                    showPendingOnly
                        ? row.payment_status === "Pending"
                        : true
                )
                .map((row) => (
                    <div
                        key={row.id}
                        className="border p-4 rounded mb-3"
                    >
                        <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={() =>
                                toggleSelectRow(row.id)
                            }
                        />

                        <p>
                            <b>Rider:</b> {row.rider_name}
                        </p>

                        <p>
                            <b>Amount:</b> ₹
                            {row.total_incentive}
                        </p>

                        <p>
                            <b>Status:</b>{" "}
                            {row.payment_status}
                        </p>

                        {row.payment_status !== "Paid" && (
                            <button
                                onClick={() =>
                                    markAsPaid(row.id)
                                }
                                className="bg-green-600 text-white px-4 py-2 rounded mt-3"
                            >
                                Mark As Paid
                            </button>
                        )}
                    </div>
                ))}
        </div>
    );
}
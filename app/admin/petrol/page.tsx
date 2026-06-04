"use client";

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { supabase } from "@/lib/supabase";
import {
    upsertRider,
    loadRiderData,
    searchRiderData,
    loadNewRiders
} from "@/lib/petrol/riderService";

import {
    markAsPaid,
    markSelectedAsPaid
} from "@/lib/petrol/paymentService";

import {
    loadWeeks,
    deleteWeek
} from "@/lib/petrol/uploadService";

import {
    loadDashboard
} from "@/lib/petrol/dashboardService";

export default function PetrolPage() {


    const [excelData, setExcelData] = useState<any[]>([]);
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [week, setWeek] = useState("");
    const [searchRider, setSearchRider] = useState("");
    const [riderData, setRiderData] = useState<any[]>([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [paidCount, setPaidCount] = useState(0);
    const [pendingAmount, setPendingAmount] = useState(0);
    const [weekSummary, setWeekSummary] = useState<any[]>([]);
    const [showPendingOnly, setShowPendingOnly] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [weekReport, setWeekReport] = useState<any[]>([]);
    const [pendingRiders, setPendingRiders] = useState<any[]>([]);
    const [dashboardFilter, setDashboardFilter] = useState<
        "ALL" | "PENDING" | "PAID"
    >("ALL");
    const [uploadedWeeks, setUploadedWeeks] = useState<any[]>([]);
    const [paymentRef, setPaymentRef] =
        useState("");

    const [paidBy, setPaidBy] =
        useState("");
    const pendingPayments = riderData.filter(
        (row) => row.payment_status === "Pending"
    );
    const checkPassword = () => {
        if (password === "Vinisam@123") {
            setAuthenticated(true);

            loadRiderData();
            loadDashboard();
            loadNewRiders();
        } else {
            alert("Wrong Password");
        }
    };
    const handleFileUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target?.result;

            const workbook = XLSX.read(data, {
                type: "array",
            });

            const sheetName = workbook.SheetNames[0];

            const worksheet =
                workbook.Sheets[sheetName];

            const jsonData =
                XLSX.utils.sheet_to_json(worksheet);

            console.log(jsonData);

            setExcelData(jsonData);

        };

        reader.readAsArrayBuffer(file);
    };
    const loadRiderData = async () => {
        const { data, error } = await supabase
            .from("rider_payments")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error(error);
            return;
        }

        setRiderData(data || []);
    };
    const loadNewRiders = async () => {
        const { data, error } = await supabase
            .from("riders")
            .select("*")
            .gte(
                "created_at",
                new Date(
                    Date.now() - 7 * 24 * 60 * 60 * 1000
                ).toISOString()
            );

        if (error) {
            console.error(error);
            return;
        }

        console.log("NEW RIDERS:", data);
    };
    const saveToSupabase = async () => {
        if (!week) {
            alert("Enter Week");
            return;
        }

        if (excelData.length === 0) {
            alert("Upload Excel File First");

            return;
        }
        await Promise.all(
            excelData.map((row: any) =>
                upsertRider(
                    String(row["Rider ID"]),
                    row["Rider Name"],
                    row["Hub Location"]
                )
            )
        );
        const { data: existingWeek } = await supabase
            .from("rider_payments")
            .select("id")
            .eq("week", week)
            .limit(1);
        if (existingWeek && existingWeek.length > 0) {
            alert(
                `${week} already uploaded ⚠️`
            );
            return;
        }
        try {
            const formattedData = excelData.map((row: any) => ({
                week: week,
                invoice_number: row["Invoice Number"] || "",
                rider_id: String(row["Rider ID"] || ""),
                rider_name: row["Rider Name"] || "",
                hub_location: row["Hub Location"] || "",
                total_incentive: Number(row["Total Incentive"] || 0),
            }));

            console.log("FORMATTED DATA:", formattedData);

            const { error } = await supabase
                .from("rider_payments")
                .insert(formattedData);

            if (error) {

                if (error.message.includes("unique")) {
                    alert("This Week Data Already Uploaded ⚠️");
                    return;
                }

                console.error(error);
                alert("Save Failed ❌");
                return;
            }

            alert("Saved Successfully ✅");

            await supabase.from("upload_history").insert({
                week,
                file_name: "excel-upload.xlsx",
                uploaded_by: "admin"
            });

            await loadRiderData();
            await loadDashboard();
        } catch (err: any) {
            console.error("FULL ERROR:", err);
            alert(JSON.stringify(err));

        }
    };

    const searchRiderData = async () => {
        if (!searchRider) {
            alert("Enter Rider ID or Name");
            return;
        }
        const { data, error } = await supabase
            .from("rider_payments")
            .select("*")
            .or(
                `rider_id.eq.${searchRider},rider_name.ilike.%${searchRider}%`
            );

        if (error) {
            console.error(error);
            return;
        }

        setRiderData(data || []);
    };
    const markAsPaid = async (id: number) => {
        if (!paymentRef) {
            alert("Enter Payment Reference Number");
            return;
        }

        if (!paidBy) {
            alert("Enter Paid By");
            return;
        }

        const { error } = await supabase
            .from("rider_payments")
            .update({
                payment_status: "Paid",
                paid_date: new Date().toISOString(),
                payment_ref: paymentRef,
                paid_by: paidBy,
                payment_proof: paymentRef
            })
            .eq("id", id);

        if (error) {
            console.error(error);
            alert("Update Failed");
            return;
        }

        alert("Marked As Paid ✅");

        searchRiderData();
        loadDashboard();
    };
    const toggleSelectRow = (id: number) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(
                selectedRows.filter((rowId) => rowId !== id)
            );
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };
    const markSelectedAsPaid = async () => {
        if (!paymentRef) {
            alert("Enter Payment Reference Number");
            return;
        }

        if (!paidBy) {
            alert("Enter Paid By");
            return;
        }

        if (selectedRows.length === 0) {
            alert("Select Riders First");
            return;
        }

        const { error } = await supabase
            .from("rider_payments")
            .update({
                payment_status: "Paid",
                paid_date: new Date().toISOString(),
                payment_ref: paymentRef,
                paid_by: paidBy,
            })
            .in("id", selectedRows);

        if (error) {
            console.error(error);
            alert("Bulk Update Failed");
            return;
        }

        alert(
            `${selectedRows.length} Riders Marked Paid ✅`
        );

        setSelectedRows([]);

        searchRiderData();
        loadDashboard();
    };
    const deleteWeek = async (weekName: string) => {

        const confirmDelete = confirm(
            `Delete ${weekName}?`
        );

        if (!confirmDelete) return;

        const { error } = await supabase
            .from("rider_payments")
            .delete()
            .eq("week", weekName);

        if (error) {
            console.error(error);
            alert("Delete Failed");
            return;
        }

        alert(`${weekName} Deleted ✅`);

        loadDashboard();
        loadWeeks();
    };
    const downloadPendingReport = () => {

        const pendingRows = riderData.filter(
            (row) => row.payment_status === "Pending"
        );
        setPendingRiders(pendingRows);

        if (pendingRows.length === 0) {
            alert("No Pending Riders");
            return;
        }

        const worksheet =
            XLSX.utils.json_to_sheet(pendingRows);

        const workbook =
            XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Pending Riders"
        );

        XLSX.writeFile(
            workbook,
            "pending-riders.xlsx"
        );
    };
    const exportPaidReport = () => {
        const paidRows = riderData.filter(
            (row) => row.payment_status === "Paid"
        );

        if (paidRows.length === 0) {
            alert("No Paid Records");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(paidRows);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Paid Report"
        );

        XLSX.writeFile(workbook, "paid-report.xlsx");
    };
    const loadWeeks = async () => {

        const { data, error } = await supabase
            .from("rider_payments")
            .select("week");

        if (error) {
            console.error(error);
            return;
        }

        const uniqueWeeks = [
            ...new Set(data.map((row) => row.week))
        ];

        setUploadedWeeks(uniqueWeeks);
    };
    const loadDashboard = async () => {
        const { data, error } = await supabase
            .from("rider_payments")
            .select("*");

        if (error) {
            console.error(error);
            return;
        }

        setTotalRecords(data.length);

        setPendingCount(
            data.filter(
                (row) => row.payment_status === "Pending"
            ).length
        );

        setPaidCount(
            data.filter(
                (row) => row.payment_status === "Paid"
            ).length

        );

        const pendingRows = data.filter(
            (row) => row.payment_status === "Pending"
        );

        const totalPendingAmount = pendingRows.reduce(
            (sum, row) => sum + Number(row.total_incentive || 0),
            0
        );

        setPendingAmount(totalPendingAmount);
        const summary: any = {};

        data.forEach((row) => {
            if (!summary[row.week]) {
                summary[row.week] = 0;
            }

            if (row.payment_status === "Pending") {
                summary[row.week] += Number(
                    row.total_incentive || 0
                );
            }
        });

        const summaryArray = Object.keys(summary).map(
            (week) => ({
                week,
                amount: summary[week],
            })
        );

        setWeekSummary(summaryArray);
        const weekData: any = {};

        data.forEach((row) => {

            if (!weekData[row.week]) {
                weekData[row.week] = {
                    pending: 0,
                    paid: 0,
                };
            }

            if (row.payment_status === "Pending") {
                weekData[row.week].pending += Number(
                    row.total_incentive || 0
                );
            }

            if (row.payment_status === "Paid") {
                weekData[row.week].paid += Number(
                    row.total_incentive || 0
                );
            }

        });
        const reportArray = Object.keys(weekData).map(
            (week) => ({
                week,
                pending: weekData[week].pending,
                paid: weekData[week].paid,
            })
        );

        setWeekReport(reportArray);
    };
    useEffect(() => {
        if (authenticated) {
            loadRiderData();
            loadDashboard();
        }
    }, [authenticated]);
    useEffect(() => {
        if (authenticated) {
            loadDashboard();
            loadWeeks();
        }
    }, [authenticated]);

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">
                        Petrol Tracker Login
                    </h1>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            checkPassword();
                        }}
                    >
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 mb-4"
                        />

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }
    return (
        <div className="p-10">
            <div className="flex justify-between items-center mb-5">

                <h1 className="text-3xl font-bold">
                    Petrol Tracker
                </h1>

                <button
                    onClick={() => setAuthenticated(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>
            <div className="grid grid-cols-3 gap-4 mt-6 mb-6">

                <div
                    onClick={() => setDashboardFilter("ALL")}
                    className="bg-blue-100 p-4 rounded cursor-pointer hover:shadow-lg"
                >
                    <h3 className="font-bold">Total</h3>
                    <p className="text-2xl">{totalRecords}</p>
                </div>

                <div
                    onClick={() => setDashboardFilter("PENDING")}
                    className="bg-orange-100 p-4 rounded cursor-pointer hover:shadow-lg"
                >
                    <h3 className="font-bold">Pending</h3>
                    <p className="text-2xl">{pendingCount}</p>
                </div>

                <div
                    onClick={() => setDashboardFilter("PAID")}
                    className="bg-green-100 p-4 rounded cursor-pointer hover:shadow-lg"
                >
                    <h3 className="font-bold">Paid</h3>
                    <p className="text-2xl">{paidCount}</p>
                </div>
                <div className="bg-red-100 p-4 rounded">
                    <h3 className="font-bold">
                        Pending Amount
                    </h3>

                    <p className="text-2xl">
                        ₹{pendingAmount.toFixed(2)}
                    </p>
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Week Summary
                        </h2>

                        <div className="grid md:grid-cols-4 gap-4">

                            {weekSummary.map((item) => (
                                <div
                                    key={item.week}
                                    className="bg-white border p-4 rounded shadow"
                                >
                                    <h3 className="font-bold">
                                        {item.week}
                                    </h3>

                                    <p className="text-red-600 text-xl">
                                        ₹{item.amount.toFixed(2)}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Pending Amount
                                    </p>

                                </div>
                            ))}

                        </div>
                    </div>
                    {pendingRiders.length > 0 && (
                        <div className="bg-red-50 border border-red-500 p-5 rounded mb-8">
                            <h2 className="text-xl font-bold text-red-700 mb-3">
                                ⚠ Pending Riders Alert
                            </h2>

                            <p className="mb-3">
                                Total Pending Riders: {pendingRiders.length}
                            </p>

                            <div className="max-h-60 overflow-auto">
                                {pendingRiders.slice(0, 10).map((row) => (
                                    <div
                                        key={row.id}
                                        className="border-b py-2"
                                    >
                                        <b>{row.rider_name}</b>

                                        <span className="ml-3 text-red-600">
                                            ₹{Number(
                                                row.total_incentive
                                            ).toFixed(2)}
                                        </span>

                                        <span className="ml-3 text-gray-500">
                                            {row.week}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <input
                type="text"
                placeholder="Week 25"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                className="border p-3 rounded w-full max-w-sm mb-4"
            />

            <label className="bg-gray-800 text-white px-5 py-2 rounded w-48 inline-block text-center cursor-pointer mt-4">
                Choose File
                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </label>

            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">
                    Excel Preview
                </h2>

                <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                    {JSON.stringify(excelData, null, 2)}
                </pre>
            </div>
            <button
                onClick={saveToSupabase}
                className="bg-green-600 text-white px-5 py-3 rounded mt-5"
            >
                Save To Supabase
            </button>

            <div className="mt-10 border-t pt-10">
                <div className="mt-8 mb-8">

                    <h2 className="text-2xl font-bold mb-4">
                        Uploaded Weeks
                    </h2>

                    {uploadedWeeks.map((week) => (

                        <div
                            key={week}
                            className="flex justify-between items-center border p-3 rounded mb-2"
                        >
                            <span>{week}</span>

                            <button
                                onClick={() => deleteWeek(week)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>

                    ))}

                </div>
                <h2 className="text-2xl font-bold mb-4">
                    Search Rider
                </h2>

                {pendingPayments.length > 0 && (
                    <div className="bg-red-100 border border-red-500 p-4 rounded mb-5">
                        <h3 className="font-bold text-red-700">
                            ⚠️ Pending Payments Found
                        </h3>

                        <p>
                            Total Pending Records:
                            {pendingPayments.length}
                        </p>
                    </div>
                )}
                <input
                    type="text"
                    placeholder="Rider ID or Rider Name"
                    value={searchRider}
                    onChange={(e) => setSearchRider(e.target.value)}
                    className="border p-3 rounded w-full max-w-md"
                />
                <button
                    onClick={searchRiderData}
                    className="bg-blue-600 text-white px-5 py-2 rounded w-48"
                >
                    Search
                </button>

                <div className="grid md:grid-cols-4 gap-4 mt-6">
                    {weekReport.map((item) => (
                        <div key={item.week} className="border p-4 rounded shadow">
                            <h3 className="font-bold">{item.week}</h3>

                            <p className="text-red-500">
                                Pending: ₹{item.pending.toFixed(2)}
                            </p>

                            <p className="text-green-600">
                                Paid: ₹{item.paid.toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>

                <button
                    onClick={downloadPendingReport}
                    className="bg-red-600 text-white px-5 py-2 rounded w-48"
                >
                    Download Pending
                </button>

                <button
                    onClick={exportPaidReport}
                    className="bg-green-700 text-white px-5 py-2 rounded w-48"
                >
                    Export Paid
                </button>

                <button
                    onClick={() => setShowPendingOnly(!showPendingOnly)}
                    className="bg-orange-500 text-white px-5 py-2 rounded w-48"
                >
                    {showPendingOnly ? "Show All" : "Pending Only"}
                </button>

                <input
                    type="text"
                    placeholder="Payment Ref No"
                    value={paymentRef}
                    onChange={(e) =>
                        setPaymentRef(e.target.value)
                    }
                    className="border p-2 rounded w-full mt-2"
                />

                <input
                    type="text"
                    placeholder="Paid By"
                    value={paidBy}
                    onChange={(e) =>
                        setPaidBy(e.target.value)
                    }
                    className="border p-2 rounded w-full mt-2"
                />

                <button
                    onClick={markSelectedAsPaid}
                    className="bg-green-600 text-white px-5 py-2 rounded w-48"
                >
                    Mark Selected Paid
                </button>

            </div>

            <div className="mt-10">

                {riderData
                    .filter((row) => {

                        if (dashboardFilter === "PENDING") {
                            return row.payment_status === "Pending";
                        }

                        if (dashboardFilter === "PAID") {
                            return row.payment_status === "Paid";
                        }

                        if (showPendingOnly) {
                            return row.payment_status === "Pending";
                        }

                        return true;
                    })
                    .map((row) => (
                        <div
                            key={row.id}
                            className="border p-4 rounded mb-3"
                        >

                            <input
                                type="checkbox"
                                checked={selectedRows.includes(row.id)}
                                onChange={() => toggleSelectRow(row.id)}
                                className="mr-3"
                            />
                            <p><b>Week:</b> {row.week}</p>
                            <p><b>Invoice:</b> {row.invoice_number}</p>
                            <p><b>Hub:</b> {row.hub_location}</p>
                            <p><b>Rider:</b> {row.rider_name}</p>
                            <p><b>Amount:</b> ₹{row.total_incentive}</p>
                            <p>
                                <b>Status:</b>{" "}
                                <span
                                    className={
                                        row.payment_status === "Paid"
                                            ? "text-green-600 font-bold"
                                            : "text-orange-600 font-bold"
                                    }
                                >
                                    {row.payment_status}
                                </span>
                            </p>

                            {row.payment_status !== "Paid" ? (
                                <button
                                    onClick={() => markAsPaid(row.id)}
                                    className="bg-green-600 text-white px-4 py-2 rounded mt-3"
                                >
                                    Mark As Paid
                                </button>
                            ) : (
                                <div>
                                    <div className="mt-3 text-green-600 font-semibold">
                                        ✅ Already Paid
                                    </div>

                                    <p>
                                        <b>Ref No:</b> {row.payment_ref}
                                    </p>

                                    <p>
                                        <b>Paid By:</b> {row.paid_by}
                                    </p>

                                    <p>
                                        <b>Date:</b>{" "}
                                        {row.paid_date
                                            ? new Date(row.paid_date).toLocaleDateString()
                                            : "-"}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}

            </div>
        </div >

    );
}
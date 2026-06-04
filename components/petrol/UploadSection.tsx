interface Props {
    week: string;
    setWeek: (value: string) => void;
    excelData: any[];
    handleFileUpload: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    saveToSupabase: () => void;
}

export default function UploadSection({
    week,
    setWeek,
    excelData,
    handleFileUpload,
    saveToSupabase,
}: Props) {
    return (
        <div>
            <input
                type="text"
                placeholder="Week 25"
                value={week}
                onChange={(e) =>
                    setWeek(e.target.value)
                }
                className="border p-3 rounded w-full max-w-sm mb-4"
            />

            <label className="bg-gray-800 text-white px-5 py-2 rounded inline-block cursor-pointer">
                Choose File

                <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </label>

            <div className="mt-5">
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
        </div>
    );
}
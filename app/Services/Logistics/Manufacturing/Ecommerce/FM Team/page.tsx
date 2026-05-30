export default function FMTeamsPage() {
    return (
        <div className="min-h-screen bg-[#06152B] text-white p-10">

            <h1 className="text-5xl font-bold text-[#5AD5D7] mb-8">
                FM Teams
            </h1>

            <div className="bg-[#123A8D]/20 p-8 rounded-3xl border border-[#5AD5D7]/20">

                <h2 className="text-3xl font-semibold mb-4">Available Roles</h2>

                <ul className="space-y-3 text-lg">
                    <li>Housekeeping</li>
                    <li>Security</li>
                </ul>

                <h2 className="text-3xl font-semibold mt-10 mb-4">Companies</h2>

                <ul className="space-y-3 text-lg">
                    <li>Emerald Groups</li>
                    <li>Royal Enfield</li>
                </ul>

                <h2 className="text-3xl font-semibold mt-10 mb-4">Location</h2>

                <p className="text-lg">
                    Coimbatore
                </p>

            </div>

        </div>
    );
}
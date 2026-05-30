export default function FMTeamsPage() {
    return (
        <div className="min-h-screen p-10">
            <h1 className="text-5xl font-bold">FM Teams Jobs</h1>

            <h2 className="mt-8 text-2xl font-bold">Available Roles</h2>
            <ul className="mt-4 space-y-2">
                <li>Housekeeping</li>
                <li>Security</li>
            </ul>

            <h2 className="mt-8 text-2xl font-bold">Companies</h2>
            <ul className="mt-4 space-y-2">
                <li>Emerald Groups</li>
                <li>Royal Enfield</li>
            </ul>

            <p className="mt-8 font-semibold">
                Location: Coimbatore
            </p>
        </div>
    );
}
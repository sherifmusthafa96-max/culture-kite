export default function ManufacturingPage() {
    return (
        <div className="min-h-screen p-10">
            <h1 className="text-5xl font-bold">Manufacturing Jobs</h1>

            <h2 className="mt-8 text-2xl font-bold">Available Roles</h2>
            <ul className="mt-4 space-y-2">
                <li>CNC Operator</li>
                <li>VMC Operator</li>
                <li>HMC Operator</li>
                <li>Shell Moulding</li>
                <li>Core Shooter</li>
                <li>Core Cleaning</li>
                <li>Deburring</li>
                <li>Fettling</li>
                <li>Counting</li>
            </ul>

            <h2 className="mt-8 text-2xl font-bold">Companies</h2>
            <ul className="mt-4 space-y-2">
                <li>Unique Shell</li>
                <li>Indo Shell Cast</li>
            </ul>

            <p className="mt-8 font-semibold">
                Location: Coimbatore
            </p>
        </div>
    );
}
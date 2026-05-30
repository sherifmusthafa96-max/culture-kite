export default function LogisticsPage() {
    return (
        <div className="min-h-screen p-10">
            <h1 className="text-5xl font-bold">Logistics Jobs</h1>

            <h2 className="mt-8 text-2xl font-bold">Available Roles</h2>
            <ul className="mt-4 space-y-2">
                <li>Picking</li>
                <li>Packing</li>
                <li>Quality Checking</li>
                <li>Loading & Unloading</li>
                <li>Helper</li>
                <li>B2B Operations</li>
            </ul>

            <h2 className="mt-8 text-2xl font-bold">Companies</h2>
            <ul className="mt-4 space-y-2">
                <li>FirstCry</li>
                <li>Purple</li>
                <li>Meesho</li>
                <li>ABT Parcel</li>
                <li>Flipkart</li>
            </ul>

            <p className="mt-8 font-semibold">
                Locations: Chennai & Coimbatore
            </p>
        </div>
    );
}
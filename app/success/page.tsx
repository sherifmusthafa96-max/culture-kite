export default function SuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center text-center p-10">
            <div>
                <h1 className="text-4xl font-bold text-green-600">
                    🎉 Thank You for Applying!
                </h1>

                <p className="mt-4 text-gray-600">
                    Your application has been submitted successfully.
                </p>

                <p className="mt-2 text-gray-600">
                    Our team will reach out to you shortly.
                </p>

                <p className="mt-6 font-semibold">
                    Regards, <br />
                    Culture Kite Team
                </p>
            </div>
        </div>
    );
}
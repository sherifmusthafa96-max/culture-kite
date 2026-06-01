"use client";

import { Suspense } from "react";
import ApplyPage from "./applypage";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApplyPage />
        </Suspense>
    );
}
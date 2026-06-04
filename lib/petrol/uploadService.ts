import { supabase } from "@/lib/supabase";

export const loadWeeks = async () => {
    const { data, error } = await supabase
        .from("rider_payments")
        .select("week");

    if (error) throw error;

    return [...new Set(data.map((x) => x.week))];
};

export const deleteWeek = async (
    weekName: string
) => {
    return await supabase
        .from("rider_payments")
        .delete()
        .eq("week", weekName);
};
import { supabase } from "@/lib/supabase";

export const upsertRider = async (
    riderId: string,
    riderName: string,
    hubLocation: string
) => {
    return await supabase
        .from("riders")
        .upsert({
            rider_id: riderId,
            rider_name: riderName,
            hub_location: hubLocation,
        });
};

export const loadRiderData = async () => {
    const { data, error } = await supabase
        .from("rider_payments")
        .select("*")
        .order("id", { ascending: false });

    if (error) throw error;

    return data || [];
};

export const searchRiderData = async (search: string) => {
    const { data, error } = await supabase
        .from("rider_payments")
        .select("*")
        .or(
            `rider_id.eq.${search},rider_name.ilike.%${search}%`
        );

    if (error) throw error;

    return data || [];
};

export const loadNewRiders = async () => {
    const { data, error } = await supabase
        .from("riders")
        .select("*")
        .gte(
            "created_at",
            new Date(
                Date.now() - 7 * 24 * 60 * 60 * 1000
            ).toISOString()
        );

    if (error) throw error;

    return data || [];
};
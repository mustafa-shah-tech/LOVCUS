const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = "https://gbxvnnkkymtlskpgfpei.supabase.co";
const SUPABASE_KEY = "sb_publishable_5gFdDNycdvnVZwIl-ZM9fQ_CCsKkGDM";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testToggleReview() {
    console.log("Fetching first review...");
    const {data: revs} = await supabase.from('reviews').select('*').limit(1);
    if (!revs || revs.length === 0) {
        console.log("No reviews found.");
        return;
    }
    const targetRev = revs[0];
    console.log(`Current state for ID ${targetRev.id}: approved=${targetRev.approved}`);

    console.log("Triggering SDK update...");
    const { data: updated, error } = await supabase
        .from('reviews')
        .update({ approved: !targetRev.approved })
        .eq('id', targetRev.id)
        .select();

    if (error) {
        console.error("SDK Error:", error);
    } else {
        console.log("SDK Success! Return payload:", updated);
    }
}
testToggleReview();

// @ts-nocheck
/** @type {import('./$types').Actions} */
import { fail } from '@sveltejs/kit';
import { supabase } from "$lib/supabaseClient";

export const actions = {
    find: async({request}) => {
        const formData = await request.formData();
        const guest = formData.get('guestName');
        console.log(`searching for ${guest}`);
        try {
            const { data: groups, error: groupSearchError } = await supabase.from('guests').select('group_id').ilike('guest_name', `%${guest}%`);
            if (groupSearchError) {
                throw new Error(groupSearchError.message);
            }
            if (!groups.length) {
                throw new Error('No matches found! Please try again.');
            }
            if (groups.length > 1) {
                throw new Error('Multiple matches found. Please enter your full name.');
            }

            const groupId = groups[0].group_id;

            const { data: guestsAndKids, error: guestLookupError} = await supabase.from('guests').select(`
                guest_name, 
                attending,
                id,
                groups (
                    id,
                    max_kids,
                    attending_kids
                )
            `).eq('group_id', groupId);

            if (guestLookupError) {
                throw new Error(guestLookupError.message);
            }

            const guests = guestsAndKids.map(({guest_name, attending, id}) => { 
                return {
                    name: guest_name.split(' ')[0], // first name only 
                    attending,
                    id,
                }
            });

            return {
                type: 'search',
                success: true,
                guests: guests ?? [],
                group: guestsAndKids[0].groups ?? {},
            }; 
        } catch (error) {
            console.log(error.message);
            return fail(422, {
                error: error.message,
                name: guest,
            });
        }
    },
    rsvp: async({request}) => {
        const formData = await request.formData();
        const groupId = formData.get('group');

        const now = new Date();

        try {
            // set named guests as rsvp'd
            const { data: guests, error: rsvpError } = await supabase.from('guests').update({rsvp: true, updated_at: now}).eq('group_id', groupId).select();

            if (rsvpError) {
                throw new Error(rsvpError.message);
            }

            // set their attending status
            for (const guest of guests) {
                const formGuest = formData.get(`${guest.id}`);
                const attending = formGuest ? true : false;
                const { error: attendingError } = await supabase.from('guests').update({attending, updated_at: now}).eq('id', guest.id);

                if (attendingError) {
                    throw new Error(attendingError.message);
                }
            }

            const kids = formData.get('attending_kids');

            if (kids !== null) {
                // we want to update even if it gets changed to 0
                const { error: attendingKidsError } = await supabase.from('groups').update({attending_kids: kids, updated_at: now}).eq('id', groupId);

                if (attendingKidsError) {
                    throw new Error(attendingKidsError.message);
                }
            }

            return {
                success: true,
                type: 'rsvp'
            }

        } catch (error) {
            return fail(422, {
                error: error.message,
            });
        }
    }
}

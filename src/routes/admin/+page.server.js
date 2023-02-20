/* eslint-disable no-inner-declarations */
// @ts-nocheck
import { supabase } from "$lib/supabaseClient";

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    try {
        const { data: everybody, error: queryError } = await supabase.from('guests').select(`
            guest_name,
            rsvp,
            attending,
            group_id,
            id,
            groups (
                attending_kids
            ) 
        `);

        if (queryError) {
            throw new Error(queryError.message);
        }

        let attending = everybody.filter((guest) => guest.attending === true);
        let notAttending = everybody.filter((guest) => guest.rsvp === true && guest.attending === false);
        const notResponded = everybody.filter((guest) => guest.rsvp === false);

        function sortbyGroup(a,b) {
            if (a.group_id === b.group_id) {
                return a.id - b.id;
            }
            return a.group_id - b.group_id;
        }

        function groupUp(newArray, {guest_name, group_id, groups}) {
            const groupIndex = newArray.findIndex((member) => member.group_id === group_id);
            if (groupIndex === -1) {
                const newGroup = {
                    group_id,
                    names: guest_name,
                    total: groups.attending_kids + 1,
                }
                newArray.push(newGroup);
            } else {
                newArray[groupIndex].names = newArray[groupIndex].names.concat(`, ${guest_name}`);
                newArray[groupIndex].total += 1;
            }

            return newArray;
        }
        attending = attending.reduce(groupUp, []);
        notAttending = notAttending.reduce(groupUp, []);

        attending.sort(sortbyGroup);
        notAttending.sort(sortbyGroup);

        notResponded.sort(sortbyGroup);

        console.log(attending);

        return {
            attending,
            notAttending,
            notResponded
        }

    } catch(error) {
        console.log(error.message);
        return {
            error: error.message
        }
    }
  }

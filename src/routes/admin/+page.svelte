<script>
// @ts-nocheck

    export let data;
</script>


<div class="admin">
    <h1>Secret guest list!</h1>
    <div class="flexy">
        {#if data.attending.length}
        <div>
            <span class="title">Attending</span>
            <table>
                <thead>
                    <tr class="row">
                        <td>Names</td>
                        <td>Count</td>
                    </tr>
                </thead>
                <tbody>
                    {#each data.attending as group}
                        <tr class="row">
                            <td>{group.names}</td>
                            <td class="number">{group.total}</td>
                        </tr>
                    {/each}
                    <tr class="row">
                        <td>TOTAL</td>
                        <td class="number">{data.attending.reduce((acc, el) => acc + el.total, 0)}</td>
                    </tr>    
                </tbody>
            </table>
        </div>
        {/if}
        {#if data.notAttending.length}
        <div>
            <span class="title">Not Attending</span>
            <table>
                <thead>
                    <tr class="row">
                        <td>Names</td>
                        <td>Count</td>
                    </tr>
                </thead>
                <tbody>
                    {#each data.notAttending as group}
                        <tr class="row">
                            <td>{group.names}</td>
                            <td class="number">{group.total}</td>
                        </tr>
                    {/each}
                    <tr class="row">
                        <td>TOTAL*</td>
                        <td class="number">{data.notAttending.reduce((acc, el) => acc + el.total, 0)}</td>
                    </tr>  
                </tbody>
            </table>
            <span class="little">*may or may not include kids in total</span>
        </div>
        {/if}
    </div>
    <p>{data.notResponded.length} guests (not including the kids) haven't replied yet!</p>
</div>

<style>
    .admin {
        background-color: var(--cream);
    }

    .flexy {
        padding: 20px;
        gap: 24px;
        display: flex;
        justify-content: space-evenly;
    }

    .title {
        font-size: 30px;
    }
    .row {
        border-bottom: 1px solid gray;
    }

    .row:nth-child(even) {
        background-color: var(--red);
        color: var(--cream);
    }

    .number {
        float: right;
    }

    .little {
        padding: 8px;
        font-size: 12px;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    td {
        padding: 8px;
    }

    h1 {
        text-align: center;
        padding: 24px;
    }

    p {
        text-align: center;
        padding: 36px;
        background-color: var(--red);
        color: var(--cream);
    }
</style>


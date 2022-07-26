import { defineStore } from 'pinia'

export const usePollStore = defineStore( 'PollStore', 
{
    state()
    {
        return { data: [] }
    }, 

    actions: 
    {
        async addVote( name: string, vote: string )
        {
            const person = this.data.find( person => person.name === name )

            if ( !person )
                return

            if ( vote === 'up' )
                person.votes.positive += 1

            if ( vote === 'down' )
                person.votes.negative += 1

            person.lastUpdated = ( new Date() ).toISOString()

            await useFetch( '/api/state',
            {
                body:         { data: this.data },
                method:       'POST',
                initialCache: false,
            })
        },

        async populateState()
        {
            const { data } = await useFetch( '/api/state' )

            this.data = data.value.data
        },
    },
})

import { defineStore } from 'pinia'

const API_ENDPOINT = '/api/state'

export const usePollStore = defineStore( 'PollStore', 
{
    state()
    {
        return { data: [] }     // We start with an empty state but we populate it later from the endpoint
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

            await useFetch( API_ENDPOINT,
            {
                body:         { data: this.data },
                method:       'POST',
                initialCache: false,    // This allows to make a request everytime there is a new vote
            })
        },

        async populateState()
        {
            const { data } = await useFetch( API_ENDPOINT )

            this.data = data.value.data
        },
    },
})

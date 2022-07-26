import { readFile } from 'node:fs/promises'

export default defineEventHandler( async (event) => {
    const content = await readFile( './public/data.json', { encoding: 'utf8' } )

    return JSON.parse( content )
})

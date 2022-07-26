import { writeFile } from 'node:fs/promises'

export default defineEventHandler( async ( event ) => {
    const body = await useBody( event )

    await writeFile( './data.json', JSON.stringify( body ))

    return 'OK'
})

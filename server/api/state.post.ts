import { writeFile } from 'node:fs/promises'

export default defineEventHandler( async ( event ) => {
    const body = await useBody( event )

    await writeFile( './public/data.json', JSON.stringify( body ))

    return 'OK'
})

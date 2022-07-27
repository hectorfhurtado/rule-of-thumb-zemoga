import { describe, test, expect } from 'vitest'
import { setup, $fetch, createPage } from '@nuxt/test-utils-edge'

describe( 'Homepage tests', async () =>
{
    await setup(
    {
        server:         true,
        setupTimeout:   20000,
        browser:        true,
        browserOptions: {
            type: "chromium"
        },
    })

    test( 'shows the "Previous Rulings" section', async () =>
    {
        const html = await $fetch( '/' )

        expect( html ).toContain( 'Previous Rulings' )
    })

    
    test( 'finds the layout selector element', async () =>
    {
        const html = await createPage( '/' )

        expect( await html.locator( 'data-testid=layoutSelector' )).to.exist
    })

    describe( 'card assertions', async () => {
        test( 'finds at least one card', async () => {
            const html = await createPage( '/' )
            
            expect( await html.locator( 'data-testid=card' )).to.exist
        })

        test( 'finds a name inside a card', async () => {
            const html  = await createPage( '/' )
            const $card = await html.locator( 'data-testid=card' )
            const $name = await $card.nth( 0 ).locator( 'data-testid=cardname' )

            expect( await $name.textContent() ).to.not.be.empty
        })

        test( 'finds a description inside a card', async () => {
            const html         = await createPage( '/' )
            const $card        = await html.locator( 'data-testid=card' )
            const $description = await $card.nth( 0 ).locator( 'data-testid=carddescription' )

            expect( await $description.textContent() ).to.not.be.empty
        })

        test( 'finds a gauge with percentage numbers inside a card', async () => {
            const html   = await createPage( '/' )
            const $card  = await html.locator( 'data-testid=card' )
            const $gauge = await $card.nth( 0 ).locator( 'data-testid=cardgauge' )

            expect( await $gauge ).to.exist

            const $paragraph = await $gauge.locator( 'p' )
            expect( await $paragraph.count() ).to.equal( 2 )

            expect( await $paragraph.nth( 0 ).textContent() ).to.have.string( '%' )
            expect( await $paragraph.nth( 1 ).textContent() ).to.have.string( '%' )
        })

        test( 'finds a thumb icon above the image inside a card', async () => {
            const html       = await createPage( '/' )
            const $card      = await html.locator( 'data-testid=card' )
            const $thumbicon = await $card.nth( 0 ).locator( 'data-testid=cardimagethumbicon' )

            expect( await $thumbicon.count() ).to.be.above( 0 )
        })

        test( 'finds a person image inside a card', async () => {
            const html         = await createPage( '/' )
            const $card        = await html.locator( 'data-testid=card' )
            const $personImage = await $card.nth( 0 ).locator( 'data-testid=cardpersonimage' )

            expect( await $personImage.getAttribute( 'src' )).to.have.string( '.png' )
        })

        test( 'finds a thumb up and down button inside a card', async () => {
            const html  = await createPage( '/' )
            const $card = await html.locator( 'data-testid=card' )

            expect( await await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )).to.exist
            expect( await await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )).to.exist
        })

        test( 'finds an eyebrow text with the category in it inside a card', async () => {
            const html     = await createPage( '/' )
            const $card    = await html.locator( 'data-testid=card' )
            const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

            expect( $eyebrow ).to.exist
            expect( await $eyebrow.textContent() ).to.not.be.empty
            expect( await $eyebrow.textContent() ).to.have.string( ' in ' )
        })
        
        test( 'finds a disabled Vote Now button inside a card', async () => {
            const html     = await createPage( '/' )
            const $card    = await html.locator( 'data-testid=card' )
            const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

            expect( $votenow ).to.exist
            expect( await $votenow.isDisabled() ).to.equal( true )
            expect( await $votenow.textContent() ).to.have.string( 'Vote Now' )
        })
    })
})

// THESE ARE COMPONENT TESTS, BUT I JUST WROTE THEM TO NOT FORGET WHEN I START CREATING THOSE TESTS
describe( 'when clicking the thumb up button', () => {
    test.todo( 'outlines the clicked button with a white border', async () => {})
    test.todo( 'enables the Vote Now button', async () => {})
})

describe( 'When clicking the Vote Now button', () => {
    test.todo( 'hides thumb up and down buttons', async () => {})
    test.todo( 'changes the eyebrow text for Thank you', async () => {})
    test.todo( 'changes the text from Vote Now to Vote again', async () => {})
    test.todo( 'changes the gauge text', async () => {})
})

describe( 'when clicking the Vote Again button', () => {
    test.todo( 'shows thumb up and down buttons again', async () => {})
    test.todo( 'updates the eyebrow text', async () => {})
    test.todo( 'disables the Vote Now button', async () => {})
    test.todo( 'updates the Vote Now button text to Vote Now', async () => {})
})

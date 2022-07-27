import { describe, test, expect, beforeEach } from 'vitest'
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

        describe( 'when clicking the thumb up button', () => {
            let $card = null

            beforeEach( async () =>
            {
                const html = await createPage( '/' )
                $card      = await html.locator( 'data-testid=card' )
            })


            test( 'outlines the clicked button with a white border', async () => {
                const $voteup = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )

                expect( await $voteup.evaluate( node => node.classList.contains( 'border-2' )) ).to.be.false

                await $voteup.click()

                expect( await $voteup.evaluate( node => node.classList.contains( 'border-2' )) ).to.be.true
            })

            test( 'enables the Vote Now button', async () => {
                const $voteup = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )

                await $voteup.click()

                const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                expect( await $votenow.isDisabled() ).to.be.false
            })

            describe( 'When clicking the Vote Now button', () => {
                let gaugeText1 = null
                let gaugeText2 = null

                beforeEach( async () =>
                {
                    gaugeText1 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).first().textContent()
                    gaugeText2 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).last().textContent()

                    const $voteup = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                    await $voteup.click()
                    
                    const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )
                    await $votenow.click()
                })

                test( 'hides thumb up and down buttons', async () => {
                    const $voteup   = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                    const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                    expect( await $voteup.isHidden() ).to.be.true
                    expect( await $votedown.isHidden() ).to.be.true
                })

                test( 'changes the eyebrow text for Thank you', async () => {
                    const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

                    expect( await $eyebrow.textContent() ).to.have.string( 'Thank you for voting!' )
                })

                test( 'changes the text from Vote Now to Vote again', async () => {
                    const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                    expect( await $votenow.textContent() ).to.have.string( 'Vote Again' )
                })

                test( 'changes the gauge text', async () => {
                    const $gaugeText1 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).first()
                    const $gaugeText2 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).last()

                    expect( await $gaugeText1.textContent() ).to.not.equal( gaugeText1 )
                    expect( await $gaugeText2.textContent() ).to.not.equal( gaugeText2 )
                })

                describe( 'when clicking the Vote Again button', () => {
                    beforeEach( async () =>
                    {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )
                        await $votenow.click()
                    })

                    test( 'shows thumb up and down buttons again', async () => {
                        const $voteup   = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                        const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                        expect( await $voteup.isVisible() ).to.be.true
                        expect( await $votedown.isVisible() ).to.be.true
                    })

                    test( 'updates the eyebrow text', async () => {
                        const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

                        expect( await $eyebrow.textContent() ).to.have.string( 'just now in' )
                    })

                    test( 'disables the Vote Now button', async () => {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                        expect( await $votenow.isDisabled() ).to.be.true
                    })

                    test( 'updates the Vote Now button text to Vote Now', async () => {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                        expect( await $votenow.textContent() ).to.have.string( 'Vote Now' )
                    })
                })
            })
        })

        describe( 'when clicking the thumb down button', () => {
            let $card = null

            beforeEach( async () =>
            {
                const html = await createPage( '/' )
                $card      = await html.locator( 'data-testid=card' )
            })


            test( 'outlines the clicked button with a white border', async () => {
                const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                expect( await $votedown.evaluate( node => node.classList.contains( 'border-2' )) ).to.be.false

                await $votedown.click()

                expect( await $votedown.evaluate( node => node.classList.contains( 'border-2' )) ).to.be.true
            })

            test( 'enables the Vote Now button', async () => {
                const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                await $votedown.click()

                const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                expect( await $votenow.isDisabled() ).to.be.false
            })

            describe( 'When clicking the Vote Now button', () => {
                let gaugeText1 = null
                let gaugeText2 = null

                beforeEach( async () =>
                {
                    gaugeText1 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).first().textContent()
                    gaugeText2 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).last().textContent()

                    const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                    await $votedown.click()
                    
                    const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )
                    await $votenow.click()
                })

                test( 'hides thumb up and down buttons', async () => {
                    const $voteup   = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                    const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                    expect( await $voteup.isHidden() ).to.be.true
                    expect( await $votedown.isHidden() ).to.be.true
                })

                test( 'changes the eyebrow text for Thank you', async () => {
                    const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

                    expect( await $eyebrow.textContent() ).to.have.string( 'Thank you for voting!' )
                })

                test( 'changes the text from Vote Now to Vote again', async () => {
                    const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                    expect( await $votenow.textContent() ).to.have.string( 'Vote Again' )
                })

                test( 'changes the gauge text', async () => {
                    const $gaugeText1 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).first()
                    const $gaugeText2 = await $card.nth( 0 ).locator( 'data-testid=cardgauge' ).locator( 'p' ).last()

                    expect( await $gaugeText1.textContent() ).to.not.equal( gaugeText1 )
                    expect( await $gaugeText2.textContent() ).to.not.equal( gaugeText2 )
                })

                describe( 'when clicking the Vote Again button', () => {
                    beforeEach( async () =>
                    {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )
                        await $votenow.click()
                    })

                    test( 'shows thumb up and down buttons again', async () => {
                        const $voteup   = await $card.nth( 0 ).locator( 'data-testid=cardvoteup' )
                        const $votedown = await $card.nth( 0 ).locator( 'data-testid=cardvotedown' )

                        expect( await $voteup.isVisible() ).to.be.true
                        expect( await $votedown.isVisible() ).to.be.true
                    })

                    test( 'updates the eyebrow text', async () => {
                        const $eyebrow = await $card.nth( 0 ).locator( 'data-testid=cardeyebrow' )

                        expect( await $eyebrow.textContent() ).to.have.string( 'just now in' )
                    })

                    test( 'disables the Vote Now button', async () => {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                        expect( await $votenow.isDisabled() ).to.be.true
                    })

                    test( 'updates the Vote Now button text to Vote Now', async () => {
                        const $votenow = await $card.nth( 0 ).locator( 'data-testid=cardvotenow' )

                        expect( await $votenow.textContent() ).to.have.string( 'Vote Now' )
                    })
                })
            })
        })
    })
})
